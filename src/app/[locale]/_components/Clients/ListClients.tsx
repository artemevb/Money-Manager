// pages/index.tsx
"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";

import plus from "@/public/svg/plus_bold.svg";
import trash from "@/public/svg/main/trash.svg";
import phone from "@/public/svg/main/phone.svg";
import pen from "@/public/svg/pen.svg";
import { EditClientModal } from "./EditClientModal";
import { AddClientModal } from "./AddClientModal"; // новый модальный компонент

interface Client {
  id: number;
  fullName: string;
  jobTitle: string;
  phone: string;
  status: string;
}

// Пример с мок-данными
const clientsData: Client[] = [
  {
    id: 1,
    fullName: "Хусенова Нафиса Шухратовна",
    jobTitle: "Разработка сайта",
    phone: "93 670 28 02",
    status: "Актуально",
  },
  {
    id: 2,
    fullName: "Иванов Иван Иванович",
    jobTitle: "Мобильное приложение",
    phone: "99 123 45 67",
    status: "На паузе",
  },
  // ...
];

const Home: NextPage = () => {
  // Состояние для редактирования клиента
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Состояние для создания нового клиента
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditClick = (client: Client) => {
    setSelectedClient(client); // устанавливаем клиента для редактирования
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Шапка */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Поиск"
              className="w-full rounded-md border bg-gray-200/10 py-2 pl-8 pr-10 text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            {/* Иконка лупы */}
            <svg
              className="absolute left-2 top-2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </header>

      {/* Заголовок + кнопка "Добавить" */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Список клиентов</h1>
        <button
          className="flex items-center gap-2 rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#8455fc]"
          onClick={handleOpenAddModal}
        >
          Добавить
          <Image
            src={plus}
            width={24}
            height={24}
            alt="Plus icon"
            className="h-5 w-auto"
          />
        </button>
      </div>

      {/* Список клиентов */}
      <div className="space-y-4">
        {clientsData.map((client) => (
          <div
            key={client.id}
            className="flex flex-col gap-2 items-start justify-between rounded-lg bg-white p-4 shadow"
          >
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {client.fullName}
              </h2>
              <p className="text-xs text-gray-500">{client.jobTitle}</p>
            </div>
            <div className="flex w-full items-center justify-between text-xs text-gray-600">
              <div className="flex items-center">
                <Image
                  src={phone}
                  width={12}
                  height={12}
                  alt="Phone icon"
                  className="mr-1 h-3 w-auto"
                />
                {client.phone}
              </div>
              <span className="rounded-md bg-green-100 px-2 py-1 text-[10px] font-medium text-green-600">
                {client.status}
              </span>
              <div className="flex gap-2">
                <button
                  className="flex items-center justify-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                  onClick={() => handleEditClick(client)}
                >
                  <Image
                    src={pen}
                    width={16}
                    height={16}
                    alt="Pen icon"
                    className="h-4 w-auto"
                  />
                </button>
                <button
                  className="flex items-center justify-center rounded-md bg-red-50 p-2 text-red-500 hover:bg-red-100"
                >
                  <Image
                    src={trash}
                    width={16}
                    height={16}
                    alt="Trash icon"
                    className="h-4 w-auto"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно редактирования */}
      {isEditModalOpen && selectedClient && (
        <EditClientModal client={selectedClient} onClose={handleCloseEditModal} />
      )}

      {/* Модальное окно создания нового клиента */}
      {isAddModalOpen && <AddClientModal onClose={handleCloseAddModal} />}
    </div>
  );
};

export default Home;
