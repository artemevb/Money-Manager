"use client";

import React from "react";

interface DeleteUserModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  userName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-[90%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Подтверждение удаления
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Вы действительно хотите удалить пользователя <span className="font-bold">{userName}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
