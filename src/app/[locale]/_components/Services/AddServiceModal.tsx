"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowBack from "@/public/svg/clients/arrow_back.svg";

interface AddServiceModalProps {
    onClose: () => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({ onClose }) => {
    // Инициализируем поля пустыми строками или дефолтными значениями
    const [fullName, setFullName] = useState("");
    const [transactions, setTransactions] = useState("сайт");

    const handleSave = () => {
        // Здесь можно реализовать вызов API или обновление состояния в родительском компоненте
        console.log("Создаем нового клиента:", {
            fullName,
            transactions,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full h-full bg-white p-4 relative">
                {/* Кнопка "Назад" */}
                <div className="flex flex-row justify-between items-center">
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
                    <div className="flex gap-[4px] text-[12px] font-medium">
                        <button className="border py-2 px-3 rounded-[8px]">
                            Рус
                        </button>
                        <button className="border py-2 px-3 rounded-[8px]">
                            Узб
                        </button>
                    </div>
                </div>


                <h1 className="mb-4 text-lg font-semibold text-gray-800 mt-[20px]">
                    Добавить услугу
                </h1>

                <div className="flex flex-col gap-2 mt-[20px]">
                    {/* Поле для ФИО с иконкой pen */}
                    <div className="relative">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Название услуги"
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                            style={{
                                backgroundImage: "url('/svg/pen.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                            }}
                        />

                    </div>
                </div>

                <div className="relative mt-2">
                    <input
                        type="text"
                        value={transactions}
                        onChange={(e) => setTransactions(e.target.value)}
                        placeholder="Количество транзакций"
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{
                            backgroundImage: "url('/svg/pen.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                    </input>
                </div>

                <div className="mt-4 flex items-center justify-end space-x-2">
                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#9e78fd]"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div >
    );
};
