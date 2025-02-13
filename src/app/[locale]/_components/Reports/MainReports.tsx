"use client";
import React, { useState } from "react";
import DateModal from "./DateModal";
import CurrencyModal from "./CurrencyModal";
import ClientModal from "./ClientModal";
import ServiceModal from "./ServiceModal";
import download from "@/public/svg/reports/download.svg";
import Image from "next/image";

const Home: React.FC = () => {
    // Состояния для модалок
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

    // Данные фильтров
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [currency, setCurrency] = useState("");
    const [clients, setClients] = useState<string[]>([]);
    const [services, setServices] = useState<string[]>([]);

    return (
        <div className="min-h-screen mt-[48px] mb-[40px] px-[16px]">
            <div className="max-w-xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">Выберите тип отчета</h1>

                {/* Блоки выбора типа отчета (сетка 2 столбца) */}
                <div className="grid grid-cols-2 grid-rows-[226px] gap-2 text-[20px] font-medium">
                    {/* Доходы за месяц (верхний левый блок) */}
                    <div className="flex flex-col row-span-1 h-[100%] gap-2">
                        <div className="bg-[#EFF6FF] rounded-[16px] p-5 flex items-start justify-start row-span-1 h-[50%]">
                            Доходы за месяц.
                        </div>
                        <div className="bg-[#F5F2FF] rounded-[16px] p-5 flex items-start justify-start row-span-1 h-[50%]">
                            Сальдо
                        </div>
                    </div>
                    {/* Расходы за месяц (правый блок, растянут на 2 строки) */}
                    <div className="bg-[#ECFDF5] rounded-[16px] p-5 text-left flex justify-start row-span-2">
                        <p className="h-full">Расходы за месяц.</p>
                    </div>

                    {/* Сальдо (нижний левый блок) */}

                </div>



                {/* Фильтры */}
                <div>
                    <h2 className="text-xl font-semibold">Фильтры</h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => setIsDateModalOpen(true)}
                            className="border px-3 py-1 rounded-[6px] hover:bg-gray-100"
                        >
                            Дата
                        </button>
                        <button
                            onClick={() => setIsCurrencyModalOpen(true)}
                            className="border px-3 py-1 rounded-[6px] hover:bg-gray-100"
                        >
                            Валюта
                        </button>
                        <button
                            onClick={() => setIsClientModalOpen(true)}
                            className="border px-3 py-1 rounded-[6px] hover:bg-gray-100"
                        >
                            Клиент
                        </button>
                        <button
                            onClick={() => setIsServiceModalOpen(true)}
                            className="border px-3 py-1 rounded-[6px] hover:bg-gray-100"
                        >
                            Услуги
                        </button>
                        {/* Переключатели "Все", "Входящие", "Исходящие" */}
                        <div className="flex items-center gap-2 ml-2 mt-[20px]">
                            <span className="bg-violet-600 text-white px-3 py-1 rounded-[14px] cursor-pointer">
                                Все
                            </span>
                            <span className=" px-3 py-1 rounded-[14px] hover:bg-gray-100 cursor-pointer">
                                Входящие
                            </span>
                            <span className=" px-3 py-1 rounded-[14px] hover:bg-gray-100 cursor-pointer">
                                Исходящие
                            </span>
                        </div>
                    </div>
                </div>

                {/* Блок, где выводим текущие выбранные фильтры */}
                <div className="text-sm text-gray-700">
                    {/* Если обе даты выбраны, показываем период */}
                    {dateRange.from && dateRange.to && (
                        <p>
                            <strong>Выбранный период:</strong> {dateRange.from} – {dateRange.to}
                        </p>
                    )}
                    {/* Если есть выбранная валюта */}
                    {currency && (
                        <p>
                            <strong>Выбранная валюта:</strong> {currency}
                        </p>
                    )}
                    {/* Если есть выбранные клиенты */}
                    {clients.length > 0 && (
                        <p>
                            <strong>Выбранные клиенты:</strong> {clients.join(", ")}
                        </p>
                    )}
                    {/* Если есть выбранные услуги */}
                    {services.length > 0 && (
                        <p>
                            <strong>Выбранные услуги:</strong> {services.join(", ")}
                        </p>
                    )}
                </div>

                {/* Карточка отчета */}
                <div className="bg-white p-4 shadow rounded space-y-2">
                    <h3 className="font-semibold text-[22px]">Отчет</h3>
                    <p className="text-[16px] font-medium">Баланс: Доход</p>
                    <p className="text-[16px] font-medium">Доход: Карта суммы 1</p>
                    <p className="text-[16px] font-medium">Расход: 3.0 сум</p>
                    <p className="text-[16px] font-medium">Дата отчета: 2025-01-09</p>
                </div>

                {/* Кнопка "Скачать PDF" */}
                <div className="flex justify-end">
                    <button className="bg-violet-600 text-white px-4 py-[14.5px] rounded-[8px] flex items-center text-[16px] font-bold gap-2 hover:bg-violet-700">
                        Скачать PDF
                        <Image
                            src={download}
                            width={24}
                            height={24}
                            alt="Pen icon"
                            className="h-6 w-auto"
                        />
                    </button>
                </div>
            </div>

            {/* Модалки */}
            <DateModal
                isOpen={isDateModalOpen}
                onClose={() => setIsDateModalOpen(false)}
                onApply={(range) => setDateRange(range)}
            />
            <CurrencyModal
                isOpen={isCurrencyModalOpen}
                onClose={() => setIsCurrencyModalOpen(false)}
                onApply={(val) => setCurrency(val)}
            />
            <ClientModal
                isOpen={isClientModalOpen}
                onClose={() => setIsClientModalOpen(false)}
                onApply={(val) => setClients(val)}
            />
            <ServiceModal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                onApply={(val) => setServices(val)}
            />
        </div>
    );
};

export default Home;
