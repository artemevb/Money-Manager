// components/DeleteConfirmation.tsx
"use client";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({ 
  isOpen, 
  onClose, 
  onConfirm 
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-[20px] max-w-[329px]">
        <h3 className="text-xl font-bold mb-4">Подтверждение удаления</h3>
        <p className="mb-6 text-gray-700 text-[12px]">Вы уверены, что хотите удалить привязанную карту?</p>
        
        <div className="flex justify-end gap-[40px] text-[14px]">
          <button
            onClick={onClose}
            className=" text-[#000000] font-semibold"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className=" text-red-500 font-semibold"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}