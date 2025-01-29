'use client';

import { ArrowRight, Calendar, Plus, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { DialogPortal } from '@/components/DialogPortal';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCustomSWRMutation } from '@/utils/useCustomSWRMutation';
import { useCustomFetch } from '@/utils/customFetch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

export const CreateChallenge = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowCreateModal(true)}
        className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between border border-orange-100"
      >
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
      {showCreateModal && (
        <CreateChallengeModal onClickClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};

type ChallengeForm = {
  title: string;
  targetDate: Date | null;
  description: string | null;
};
// const resolver = (values: ChallengeForm) => {
//   if (!values.title) {
//     return {
//       errors: {
//         title: 'タイトルを入力してください',
//       },
//       values,
//     };
//   }
//   if (values.title.length > 50) {
//     return {
//       errors: {
//         title: 'タイトルは50文字以内で入力してください',
//       },
//       values,
//     };
//   }
//   if (!values.targetDate) {
//     return {
//       errors: {
//         targetDate: '目標日を入力してください',
//       },
//       values,
//     };
//   }
//   if (values.targetDate < new Date()) {
//     return {
//       errors: {
//         targetDate: '未来の日付を入力してください',
//       },
//       values,
//     };
//   }
//   return {
//     errors: {},
//     values,
//   };
// };

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
type Props = {
  onClickClose: () => void;
};
const CreateChallengeModal = ({ onClickClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChallengeForm>({
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
        targetDate: data.targetDate?.toDateString() ?? '',
        description: data.description,
        status: 'active',
      });
      if (result.success) {
        onClickClose();
        return;
      }
      // toast.show('alert', 'エラーが発生しました');
      alert('エラーが発生しました');
    },
    [customFetch, onClickClose],
  );

  return (
    <DialogPortal portalKey="create-challenge-modal" onClick={onClickClose}>
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl z-10">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">新しいチャレンジ</h2>
          <button
            onClick={onClickClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  タイトル
                </label>
                <input
                  id="title"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={`東京マラソン${dayjs().year()}`}
                  className="w-full p-2 border rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="targetDate"
            render={({ field }) => (
              <div>
                <label
                  htmlFor="targetDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  目標日
                </label>
                {/*https://reactdatepicker.com/*/}
                <DatePicker
                  id="targetDate"
                  locale="ja"
                  dateFormat="yyyy/MM/dd"
                  dropdownMode="select"
                  showDateSelect
                  minDate={new Date()}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText={dayjs().add(3, 'month').format('YYYY/MM/DD')}
                  isClearable
                  className="p-2 border rounded"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  説明
                </label>
                <textarea
                  id="description"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="チャレンジの説明や目標を入力"
                  className="w-full p-2 border rounded h-24 resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            )}
          />
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg transition-colors text-white ${
                isValid ? enabledButtonStyle : disabledButtonStyle
              }`}
              disabled={!isValid}
            >
              作成する
            </button>
          </div>
        </form>
      </div>
    </DialogPortal>
  );
};
