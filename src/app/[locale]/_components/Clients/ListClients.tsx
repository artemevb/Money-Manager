// pages/index.tsx

import { NextPage } from 'next';
import React from 'react';
import plus from "@/public/svg/plus_bold.svg";
import trash from "@/public/svg/main/trash.svg";
import phone from "@/public/svg/main/phone.svg";
import pen from "@/public/svg/pen.svg";
import Image from "next/image";

interface Client {
    id: number;
    fullName: string;
    jobTitle: string;
    phone: string;
    status: string;
}

const clientsData: Client[] = [
    {
        id: 1,
        fullName: 'Хусенова Нафиса Шухратовна',
        jobTitle: 'Разработка сайта',
        phone: '93 670 28 02',
        status: 'Актуально',
    },
    {
        id: 2,
        fullName: 'Хусенова Нафиса Шухратовна',
        jobTitle: 'Разработка сайта',
        phone: '93 670 28 02',
        status: 'Актуально',
    },
    {
        id: 3,
        fullName: 'Хусенова Нафиса Шухратовна',
        jobTitle: 'Разработка сайта',
        phone: '93 670 28 02',
        status: 'Актуально',
    },
];

const Home: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Шапка / Верхняя панель */}
            <header className="mb-6">
                <div className="flex items-center justify-between">
                    {/* Поле поиска */}
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Поиск"
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                        {/* Иконка лупы (стилизованная или можно подключить героику) */}
                        <svg
                            className="absolute right-2 top-2 h-4 w-4 text-gray-400"
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

            {/* Заголовок + Кнопка "Добавить" */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Список клиентов</h1>
                <button className="flex items-center gap-2 rounded-[8px] bg-[#7E49FF] px-4 py-2 text-white hover:bg-[#8455fc] text-[14px] font-bold">
                    Добавить
                    <Image
                        src={plus}
                        width={24}
                        height={24}
                        quality={100}
                        alt="Rmc Logo"
                        className="h-[24px] w-auto"
                    />
                </button>
            </div>

            {/* Список клиентов */}
            <div className="space-y-4">
                {clientsData.map((client) => (
                    <div
                        key={client.id}
                        className="flex items-center justify-between rounded-[16px] bg-white p-4 shadow"
                    >
                        {/* Левая часть: данные клиента */}
                        <div>
                            <h2 className="text-[14px] font-semibold text-gray-800">{client.fullName}</h2>
                            <p className="text-[12px] text-gray-500">{client.jobTitle}</p>
                            <div className="mt-2 flex items-center text-[12px] text-gray-600">
                                <Image
                                    src={phone}
                                    width={12}
                                    height={12}
                                    quality={100}
                                    alt="Rmc Logo"
                                    className="h-[12px] w-auto mr-[4px]"
                                />
                                {client.phone}
                            </div>
                        </div>

                        {/* Правая часть: статус и кнопки действий */}
                        <div className="flex items-center gap-4">
                            {/* Статус */}
                            <span className="rounded-[10px] bg-green-100 px-2 py-1 text-xs font-medium text-[#34C759]">
                                {client.status}
                            </span>

                            {/* Кнопки редактирования и удаления */}
                            <button
                                className="flex items-center justify-center rounded-md p-2 bg-[#F1F5F9]"
                            >
                                <Image
                                    src={pen}
                                    width={16}
                                    height={16}
                                    quality={100}
                                    alt="Rmc Logo"
                                    className="h-[16px] w-auto"
                                />
                            </button>

                            <button
                                className="flex items-center justify-center rounded-md p-2 bg-[#FEF2F2] text-gray-500 
                hover:bg-[#f5c0c0] hover:text-gray-700"
                            >
                                <Image
                                    src={trash}
                                    width={16}
                                    height={16}
                                    quality={100}
                                    alt="Rmc Logo"
                                    className="h-[16px] w-auto"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Home;
