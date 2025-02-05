"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";

import plus from "@/public/svg/plus_bold.svg";
import trash from "@/public/svg/main/trash.svg";
import pen from "@/public/svg/pen.svg";
import { EditServiceModal } from "./EditServiceModal";
import { AddServiceModal } from "./AddServiceModal"; // новый модальный компонент

interface Service {
    id: number;
    fullName: string;
    transactions: string;
}

// Пример с мок-данными
const servicesData: Service[] = [
    {
        id: 1,
        fullName: "Разработка сайта",
        transactions: "12",
    },
    {
        id: 2,
        fullName: "Иванов Иван Иванович",
        transactions: "12",
    },
    // ...
];

const Home: NextPage = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleEditClick = (service: Service) => {
        setSelectedService(service); 
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedService(null);
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
                <h1 className="text-lg font-semibold text-gray-800">Список услуг</h1>
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
                {servicesData.map((service) => (
                    <div
                        key={service.id}
                        className="flex flex-row gap-2 items-start justify-between rounded-lg bg-white p-5 shadow"
                    >
                        <div className="w-full">
                            <h2 className="text-sm font-semibold text-gray-800">
                                {service.fullName}
                            </h2>
                            <p className="text-xs text-gray-500">{service.transactions}</p>
                        </div>
                        <div className="flex w-full items-center justify-end text-xs text-gray-600">
                            <div className="flex gap-2">
                                <button
                                    className="flex items-center justify-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                                    onClick={() => handleEditClick(service)}
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
            {isEditModalOpen && selectedService && (
                <EditServiceModal service={selectedService} onClose={handleCloseEditModal} />
            )}

            {/* Модальное окно создания нового клиента */}
            {isAddModalOpen && <AddServiceModal onClose={handleCloseAddModal} />}
        </div>
    );
};

export default Home;
