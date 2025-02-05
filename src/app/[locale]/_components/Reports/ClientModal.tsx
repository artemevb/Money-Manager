// components/modals/ClientModal.tsx

import React, { useState } from "react";
import close from "@/public/svg/close.svg";
import Image from "next/image";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedClients: string[]) => void;
}

const clients = [
  "Баходир Жалолов",
  "Сардар Азимов",
  "Лола Низамова",
  "Дания Нораджиджи",
  "Сабрина Собирова",
  "Сарвар Азимов",
  "Азиз Фукратов",
  "Азиз Фукратов",

];

const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const toggleClient = (client: string) => {
    setSelectedClients((prev) =>
      prev.includes(client)
        ? prev.filter((c) => c !== client)
        : [...prev, client]
    );
  };

  const handleApply = () => {
    onApply(selectedClients);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full"
      onClick={handleBackdropClick}
    >
      <div className="bg-white px-5 pb-10 pt-5 rounded-t-2xl w-full relative ">
        <div className="flex items-center justify-center">
          <hr className="w-16 h-1 bg-gray-300 rounded" />
        </div>
        <button className="absolute right-5 top-5" onClick={onClose}>
          <Image src={close} width={24} height={24} quality={100} alt="Close icon" />
        </button>
        <h2 className="text-xl font-semibold mb-4 mt-10 text-left">Клиент</h2>
        <div className="flex flex-col space-y-[16px] mb-4 max-h-64 overflow-auto custom-scrollbar">
          {clients.map((client) => (
            <label key={client} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={client}
                checked={selectedClients.includes(client)}
                onChange={() => toggleClient(client)}
                className="hidden"
              />
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center border-2
                  ${selectedClients.includes(client) ? 'bg-[#7E49FF] border-[#7E49FF]' : 'border-gray-400'}
                `}
              >
                {selectedClients.includes(client) && (
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
              <span>{client}</span>
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

export default ClientModal;
