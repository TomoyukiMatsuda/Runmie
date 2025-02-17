'use client';

import { ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCustomFetch } from '@/utils/customFetch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

type ChallengeForm = {
  title: string;
  targetDate: Date | null;
  description: string | null;
};
const validate = zodResolver(
  z
    .object({
      title: z.string().nonempty().max(50),
      targetDate: z.date().min(new Date()),
      description: z.string().nullable(),
    })
    .transform((data) => ({
      ...data,
      targetDate: new Date(data.targetDate),
    })),
);
const disabledButtonStyle = 'bg-gray-200 text-gray-500 cursor-not-allowed';
const enabledButtonStyle = 'bg-orange-500 hover:bg-orange-600 cursor-pointer';

export const CreateChallenge = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<ChallengeForm>({
    defaultValues: {
      title: '',
      targetDate: null,
      description: null,
    },
    resolver: validate,
  });
  const customFetch = useCustomFetch();
  const onSubmit = useCallback(
    async (data: ChallengeForm) => {
      const result = await customFetch('POST', '/challenges', {
        title: data.title,
        targetDate: data.targetDate?.toISOString() ?? '',
        description: data.description,
        status: 'active',
      });
      if (result.success) {
        setOpen(false);
        return;
      }
      // toast.show('alert', 'エラーが発生しました');
      alert('エラーが発生しました');
    },
    [customFetch],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full">
              <Plus size={24} className="text-orange-500" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">チャレンジを作成</div>
              <div className="text-sm text-gray-500">新しい目標を設定する</div>
            </div>
          </div>
          <ArrowRight size={20} className="text-gray-400" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新しいチャレンジを作成</DialogTitle>
          <DialogDescription>
            新しい目標を設定して、チャレンジを作成しましょう！
          </DialogDescription>
        </DialogHeader>
        <Form<ChallengeForm> {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div>
                  <FormLabel
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    タイトル
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={`東京マラソン${dayjs().add(6, 'month').year()}`}
                      className="w-full p-2 border rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </FormControl>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <div>
                  <FormLabel
                    htmlFor="targetDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    目標日
                  </FormLabel>
                  <FormControl>
                    {/*https://reactdatepicker.com/*/}
                    <DatePicker
                      id="targetDate"
                      locale="ja"
                      dateFormat="yyyy/MM/dd"
                      dropdownMode="select"
                      showDateSelect
                      minDate={new Date()}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholderText={dayjs()
                        .add(3, 'month')
                        .format('YYYY/MM/01')}
                      isClearable
                      className="p-2 border rounded"
                    />
                  </FormControl>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div>
                  <FormLabel
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    説明
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="チャレンジの説明や目標を入力"
                      className="w-full p-2 border rounded h-24 resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </FormControl>
                </div>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                type="submit"
                className={`w-full py-3 rounded-lg transition-colors text-white ${
                  form.formState.isValid
                    ? enabledButtonStyle
                    : disabledButtonStyle
                }`}
                disabled={!form.formState.isValid}
              >
                作成する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
