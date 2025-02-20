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
import { useQuery } from "@tanstack/react-query";
import { clientUtils } from "@/src/app/utils/client.utils";

interface Client {
  id: number;
  firstName: string;
  lastName: string
  fatherName: string;
  phone: string;
  status: "ACTUAL" | "NOT_ACTUAL";
  serviceTypeId: number
}


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

  const {data:client} = useQuery({
    queryKey:['client'],
    queryFn: clientUtils.getClientAll
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Шапка */}
      <div className="mb-6">
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
      </div>

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
        {client?.data?.length && client?.data?.map((client:Client) => (
          <div
            key={client.id}
            className="flex flex-col gap-2 items-start justify-between rounded-lg bg-white p-5 shadow"
          >
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {client.lastName}
              </h2>
              <p className="text-xs text-gray-500">{client.firstName} {client.fatherName}</p>
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
              <span className={`rounded-md  px-2 py-1 text-[10px] font-medium ${client.status==="ACTUAL"?"bg-green-100 text-green-600":"bg-red-500 text-white"}`}>
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
