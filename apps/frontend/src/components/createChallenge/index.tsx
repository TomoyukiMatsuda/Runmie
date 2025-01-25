'use client';

import { ArrowRight, Calendar, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { DialogPortal } from '@/components/DialogPortal';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

const validate = zodResolver<ChallengeForm>(
  z.object({
    title: z.string().nonempty().max(50),
    targetDate: z.date(),
    description: z.string(),
  }),
);
type ChallengeForm = {
  title: string;
  targetDate: Date | null;
  description: string | null;
};
type Props = {
  onClickClose: () => void;
};
const CreateChallengeModal = ({ onClickClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChallengeForm>({
    mode: 'all',
    defaultValues: {
      title: '',
      targetDate: null,
      description: null,
    },
    resolver: validate,
  });

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
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="p-4 space-y-4"
        >
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
                  placeholder="例：東京マラソン2025"
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
                <div className="relative">
                  <input
                    id="targetDate"
                    type="date"
                    value={field.value?.toISOString().split('T')[0]}
                    onChange={field.onChange}
                    className="w-full p-2 border rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <Calendar
                    size={20}
                    className="absolute right-2 top-2.5 text-gray-400"
                  />
                </div>
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
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
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
