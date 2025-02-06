import React, { useState } from "react";
import { ROLE_PRIVILEGES_MAP } from "./roles";
import close from "@/public/svg/close.svg";
import Image from "next/image";

interface PrivilegesModalProps {
  role: string;                // Для какой роли открыто окно
  isOpen: boolean;
  initialPrivileges: string[]; // Какие привилегии были уже выбраны
  onClose: () => void;
  onApply: (role: string, privileges: string[]) => void;
}

const PrivilegesModal: React.FC<PrivilegesModalProps> = ({
  role,
  isOpen,
  initialPrivileges,
  onClose,
  onApply,
}) => {
  // Под-привилегии, которые доступны этой роли (из ROLE_PRIVILEGES_MAP)
  const privilegesForRole = ROLE_PRIVILEGES_MAP[role] || [];

  // Локальный стейт для выбранных действий
  const [selected, setSelected] = useState<string[]>(initialPrivileges);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const togglePrivilege = (priv: string) => {
    setSelected((prev) =>
      prev.includes(priv) ? prev.filter((p) => p !== priv) : [...prev, priv]
    );
  };

  const handleApply = () => {
    onApply(role, selected);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="relative w-[90%] max-w-sm rounded-lg bg-white p-6">
        <button
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <Image src={close} width={24} height={24} alt="close" />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {role}
        </h2>

        <div className="space-y-2">
          {privilegesForRole.map((priv) => (
            <label key={priv} className="flex items-center gap-2 cursor-pointer">
              {/* Спрятанный настоящие checkbox */}
              <input
                type="checkbox"
                checked={selected.includes(priv)}
                onChange={() => togglePrivilege(priv)}
                className="hidden"
              />

              {/* Кастомный квадрат */}
              <div
                className={`
        w-6 h-6 rounded-md flex items-center justify-center border-2
        ${selected.includes(priv) ? 'bg-[#7E49FF] border-[#7E49FF]' : 'border-gray-400'}
      `}
              >
                {selected.includes(priv) && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Текст рядом с квадратом */}
              <span>{priv}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleApply}
          className="bg-[#7E49FF] text-white py-3 rounded-md w-full mt-6 font-bold text-[16px]"
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default PrivilegesModal;