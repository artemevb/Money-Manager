"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import arrow_right from "@/public/svg/arrow-right-white.svg";
import { useQuery } from "@tanstack/react-query";
import { cardUtils } from "@/src/app/utils/card.utils";
import { cardType, trasactionDetales } from "./types";

interface NewsCompProps {
    locale: string;
}

interface Payment {
    id: number;
    comment:string,
    createdAt:string
    fromCard: cardType
    transactionStatus:"CONFIRMED"|"DENIED"
    transactionDate:string
    transactionDetails:trasactionDetales[]

}


const PaymentsListFull = ({ locale }: NewsCompProps) => {
    const router = useRouter();
    const {data: payments} = useQuery({
        queryKey: ['cards'],
        queryFn: cardUtils.homeCard
    })
    console.log(payments?.data?.lastTransactions);
    
    return (
        <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Последние платежи</h3>

            {/* Фильтры */}
            <div className="flex space-x-2 text-sm font-medium">
                <button className="bg-[#7E49FF] text-white rounded-full py-1.5 px-4">
                    Все
                </button>
                <button className=" text-gray-800 rounded-full py-1.5 px-4">
                    Входящие
                </button>
                <button className=" text-gray-800 rounded-full py-1.5 px-4">
                    Исходящие
                </button>
            </div>

            {/* Список платежей */}
            <div className="mt-4 space-y-6">
                {payments?.data?.lastTransactions?.length && payments?.data?.lastTransactions.map((payment:Payment, index:number) => {
                    const isFirstInGroup =
                        index === 0 || payments?.data?.lastTransactions[index - 1].date !== payment.transactionDate;

                    return (
                        <div key={payment.id}>
                            {isFirstInGroup && (
                                <div className="text-[#000] text-sm font-medium mb-2">
                                    {payment.transactionDate}
                                </div>
                            )}
                            <div className="bg-white shadow-lg rounded-xl p-[10px] flex justify-between items-center border-[#F5F2FF] border h-full">
                                <div className="h-full flex flex-col items-start justify-start">
                                    <div className="text-[#A6A6A6] text-sm">{payment.createdAt.split("T")[1].slice(0, 5)} Перевод</div>
                                    <div className="font-medium">{payment.fromCard.cardNumber}</div>
                                </div>
                                <div className="text-right flex flex-col justify-between gap-[30px]">
                                    <span className="text-[14px]">{payment.transactionDetails[0].amount} {payment.transactionDetails[0].moneyType}</span>
                                    <div
                                        className={`text-xs font-medium px-2 flex justify-center items-start py-1 rounded-full ${payment.transactionStatus === "CONFIRMED"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {payment.transactionStatus}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="mt-[40px] w-auto ml-auto bg-[#7E49FF] text-white font-bold py-[10px] px-[12px] text-[14px] rounded-lg flex items-center gap-[4px] right-0"
                onClick={() => router.push(`/${locale}/transactions`)}>
                История транзакций
                <Image src={arrow_right} width={24} height={24} quality={100} alt="стрелка бля" className="w-[24px] h-[24px]" />
            </button>
        </div>
    );
};

export default PaymentsListFull;
