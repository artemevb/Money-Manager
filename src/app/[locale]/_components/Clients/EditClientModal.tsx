"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import pen from '@/public/svg/pen.svg';
import arrowBack from '@/public/svg/clients/arrow_back.svg';
import trash from '@/public/svg/main/trash_white.svg';

interface Client {
    id: number;
    fullName: string;
    jobTitle: string;
    phone: string;
    status: string;
}

interface EditClientModalProps {
    client: Client;
    onClose: () => void;
}

export const EditClientModal: React.FC<EditClientModalProps> = ({
    client,
    onClose,
}) => {
    const [fullName, setFullName] = useState(client.fullName);
    const [jobTitle, setJobTitle] = useState(client.jobTitle);
    const [phone, setPhone] = useState(client.phone);
    const [status, setStatus] = useState(client.status);

    const handleSave = () => {
        console.log('Сохраняем...', { fullName, jobTitle, phone, status });
        onClose();
    };

    const handleDelete = () => {
        console.log(`Удаляем клиента #${client.id}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full h-full bg-white p-4 relative">
                {/* Кнопка "Назад" */}
                <button
                    onClick={onClose}
                    className="flex items-center text-[12px] text-[#303030] mb-4"
                >
                    <Image
                        src={arrowBack}
                        width={16}
                        height={16}
                        alt="Назад"
                        className="mr-1"
                    />
                    Назад
                </button>

                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    Редактировать клиента
                </h2>

                <div className="grid grid-cols-2 gap-2">
                    {/* Поле для ФИО с иконкой pen */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">ФИО</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        />
                        <Image
                            src={pen}
                            width={16}
                            height={16}
                            alt="Редактировать"
                            className="absolute right-3 top-[40px] cursor-pointer"
                        />
                    </div>

                    {/* Поле для телефона с иконкой pen */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Телефон</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        />
                        <Image
                            src={pen}
                            width={16}
                            height={16}
                            alt="Редактировать"
                            className="absolute right-3 top-[40px] cursor-pointer"
                        />
                    </div>
                </div>

                <div className="relative mt-2">
                    <label className="text-sm text-gray-600">Услуга</label>
                    <select
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{ backgroundImage: `url('/svg/arrow_down.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                        <option value="сайт">Сайт</option>
                        <option value="реклама">Реклама</option>
                        <option value="маркетинг">Маркетинг</option>
                    </select>

                </div>

                <div className="relative mt-2">
                    <label className="text-sm text-gray-600">Статус</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{ backgroundImage: `url('/svg/arrow_down.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                        <option value="Актуально">Актуально</option>
                        <option value="На паузе">На паузе</option>
                        <option value="Завершено">Завершено</option>
                    </select>
                </div>

                <div className="mt-4 flex items-center justify-end space-x-2">
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 rounded-md bg-[#7E49FF] px-3 py-[6px]"
                    >
                        <Image
                            src={trash}
                            width={24}
                            height={24}
                            alt="Удалить"
                            className="h-6 w-auto"
                        />
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#9e78fd]"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};
