# Technical Stack
- monorepo 開発
- docker

## Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui (UIコンポーネント)
- SWR (データフェッチング)
- Supabase Authentication

## Backend
- TypeScript
- Nest.js
- Supabase Authentication
- PostgreSQL
- Prisma
- REST API
- 軽量DDD設計

## Hosting（予定）
- Vercel (Frontend)
- Supabase (Backend / DB)

# Core Data Models

```typescript
// データベーステーブル定義

// ユーザーテーブルはSupabase Authが自動生成
// 以下は追加で必要なテーブル

// グループテーブル
create table public.groups (
  id uuid default extensions.uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

// グループメンバーテーブル
create table public.group_members (
  id uuid default extensions.uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  group_id uuid references public.groups not null,
  role text not null check (role in ('admin', 'member')),
  created_at timestamp with time zone default now(),
  unique (user_id, group_id)
);

// 目標テーブル
create table public.goals (
  id uuid default extensions.uuid_generate_v4() primary key,
  group_id uuid references public.groups not null,
  title text not null,
  description text,
  target_date timestamp with time zone not null,
  type text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

// アクティビティテーブル
create table public.activities (
  id uuid default extensions.uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  goal_id uuid references public.goals not null,
  distance numeric not null,
  duration integer not null,
  date timestamp with time zone not null,
  notes text,
  mood text,
  image_url text,
  created_at timestamp with time zone default now()
);

// いいねテーブル
create table public.likes (
  id uuid default extensions.uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  activity_id uuid references public.activities not null,
  created_at timestamp with time zone default now(),
  unique (user_id, activity_id)
);

// コメントテーブル
create table public.comments (
  id uuid default extensions.uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  activity_id uuid references public.activities not null,
  content text not null,
  created_at timestamp with time zone default now()
);
```

# Row Level Security (RLS) Policies

```sql
-- グループへのアクセス制御
alter table public.groups enable row level security;

create policy "グループメンバーのみ閲覧可能" on public.groups
  for select using (
    auth.uid() in (
      select user_id from public.group_members
      where group_id = id
    )
  );

create policy "誰でもグループを作成可能" on public.groups
  for insert with check (true);

create policy "adminのみグループを更新可能" on public.groups
  for update using (
    auth.uid() in (
      select user_id from public.group_members
      where group_id = id and role = 'admin'
    )
  );

-- アクティビティへのアクセス制御
alter table public.activities enable row level security;

create policy "同じグループメンバーのみアクティビティ閲覧可能" on public.activities
  for select using (
    auth.uid() in (
      select gm.user_id
      from public.group_members gm
      join public.goals g on gm.group_id = g.group_id
      where g.id = goal_id
    )
  );

create policy "自分のアクティビティのみ作成可能" on public.activities
  for insert with check (auth.uid() = user_id);
```

# Key Features Implementation

## 認証

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// src/components/auth/SignInForm.tsx
export function SignInForm() {
  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // エラーハンドリング
  };
  // ...
}
```

## UIコンポーネント

```typescript
// src/components/activities/ActivityCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

export function ActivityCard({ activity }) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="bg-blue-50">
        <CardTitle>{activity.date}のトレーニング</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-blue-600">
          {activity.distance}km / {activity.duration}分
        </div>
      </CardContent>
    </Card>
  )
}
```

# バックエンドAPI

Supabaseの自動生成されるAPIを主に使用し、必要に応じてEdge Functionsを追加：

```typescript
// src/lib/api.ts
export async function getGroupActivities(groupId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `
      *,
      user:user_id(name),
      likes(count),
      comments(count)
    `,
    )
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
```

# 画像アップロード

Supabase Storageを使用：

```typescript
async function uploadImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${auth.user().id}/${fileName}`;

  const { error } = await supabase.storage
    .from('activity-images')
    .upload(filePath, file);

  if (error) throw error;
  return filePath;
}
```
