"use client"
import React, { useState } from "react";
import Image from "next/image";
import card from "@/public/svg/main/card.svg";

interface Payment {
    id: number;
    date: string;
    time: string;
    name: string;
    cardNumber: string;
    amount: number;
    type: "incoming" | "outgoing";
}

const payments: Payment[] = [
    {
        id: 1,
        date: "12.02.2025",
        time: "13:39",
        name: "Азиз Азимов",
        cardNumber: "9860••••••••1467",
        amount: 9860146,
        type: "incoming",
    },
    {
        id: 2,
        date: "12.02.2025",
        time: "13:39",
        name: "Азиз Азимов",
        cardNumber: "9860••••••••1467",
        amount: -2860146,
        type: "outgoing",
    },
    {
        id: 3,
        date: "26.02.2025",
        time: "13:39",
        name: "Азиз Азимов",
        cardNumber: "9860••••••••1467",
        amount: -2860146,
        type: "outgoing",
    },
    {
        id: 4,
        date: "26.02.2025",
        time: "13:39",
        name: "Азиз Азимов",
        cardNumber: "9860••••••••1467",
        amount: 9860146,
        type: "incoming",
    },
    {
        id: 5,
        date: "26.02.2025",
        time: "13:39",
        name: "Азиз Азимов",
        cardNumber: "9860••••••••1467",
        amount: 9860146,
        type: "incoming",
    },
];

const PaymentsListFull = () => {
    const [filter, setFilter] = useState<"all" | "incoming" | "outgoing">("all");

    const filteredPayments = payments.filter((payment) => {
        if (filter === "all") return true;
        return payment.type === filter;
    });

    return (
        <div className="my-10 px-4">
            <h3 className="text-xl font-semibold mb-4">История транзакций</h3>

            {/* Фильтры */}
            <div className="flex space-x-2 text-sm font-medium mb-4">
                <button
                    className={`py-1.5 px-4 rounded-full ${filter === "all" ? "bg-[#7E49FF] text-white" : "text-gray-800"}`}
                    onClick={() => setFilter("all")}
                >
                    Все
                </button>
                <button
                    className={`py-1.5 px-4 rounded-full ${filter === "incoming" ? "bg-[#7E49FF] text-white" : "text-gray-800"}`}
                    onClick={() => setFilter("incoming")}
                >
                    Входящие
                </button>
                <button
                    className={`py-1.5 px-4 rounded-full ${filter === "outgoing" ? "bg-[#7E49FF] text-white" : "text-gray-800"}`}
                    onClick={() => setFilter("outgoing")}
                >
                    Исходящие
                </button>
            </div>

            {/* Список транзакций */}
            <div className="space-y-6">
                {filteredPayments.map((payment, index) => {
                    const isFirstInGroup =
                        index === 0 || filteredPayments[index - 1].date !== payment.date;

                    return (
                        <div key={payment.id}>
                            {isFirstInGroup && (
                                <div className="text-[#000] text-sm font-medium mb-2">
                                    {payment.date}
                                </div>
                            )}
                            <div className="bg-white border-[#F5F2FF] border shadow-lg rounded-xl p-4 flex justify-between items-center ">

                                {/* Левая часть */}
                                <div className="flex items-center space-x-3">
                                    <div className="bg-[#F5F2FF] rounded-[30px] h-[60px] w-[60px] flex items-center justify-center">
                                        <Image src={card} alt="Card Icon" width={40} height={40} />
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="font-semibold text-[16px]">{payment.name}</div>
                                        <div className="text-[#303030] text-sm">{payment.cardNumber}</div>
                                    </div>
                                </div>

                                {/* Правая часть */}
                                <div className="text-right">
                                    <div className="text-gray-400 text-xs">{payment.time}</div>
                                    <div
                                        className={`text-sm font-semibold ${payment.amount > 0 ? "text-[#34C759]" : "text-[#EF4444]"}`}
                                    >
                                        {payment.amount > 0 ? `+${payment.amount.toLocaleString()} UZS` : `${payment.amount.toLocaleString()} UZS`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentsListFull;

