import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ES Modulesでのファイルパス解決のためのユーティリティ
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// スキーマファイルへの絶対パスを構築
const schemaFilePath = resolve(__dirname, '../types/apiSchema.ts');

async function removeNeverTypes() {
  try {
    // ファイルの読み込み
    const apiSchemaTypes = await readFile(schemaFilePath, 'utf-8');

    // neverタイプの削除
    // 改行文字を含むパターンに注意して正規表現を調整
    const cleanedTypes = apiSchemaTypes.replace(/.*:\s*never.*\n/g, '');

    // 結果の書き込み
    await writeFile(schemaFilePath, cleanedTypes);
    console.log('✅ Successfully removed never types from schema');
  } catch (error) {
    // エラーハンドリング
    console.error('❌ Error processing schema file:', error);
    process.exit(1);
  }
}

// メイン処理の実行
removeNeverTypes().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
