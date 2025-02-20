// AddClientModal.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import pen from "@/public/svg/pen.svg";
import arrowBack from "@/public/svg/clients/arrow_back.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientUtils } from "@/src/app/utils/client.utils";
import toast from "react-hot-toast";
import { serviceUtils } from "@/src/app/utils/service.utils";
import { serviseType } from "../Main/types";

interface AddClientModalProps {
    onClose: () => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({ onClose }) => {
    // Инициализируем поля пустыми строками или дефолтными значениями
    const [firsName, setFirsName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<"ACTUAL" | "NOT_ACTUAL">("ACTUAL");
    const queryClient = useQueryClient()   
    const {data:getService} = useQuery({
        queryKey: ['services'],
        queryFn: serviceUtils.getService
    })
    const [jobTitle, setJobTitle] = useState<number>(getService?.data[0].id);

    const addClient = useMutation({
        mutationFn: clientUtils.postClient,
        onSuccess: () => {
            toast.success("Add new client")
            queryClient.invalidateQueries({queryKey: ['client']})
            onClose()
        },
        onError: (err) => {
            console.log(err);
            toast.error("Something went wrong 😔")
        }
    })
    const handleSave = () => {
        addClient.mutate({
            firstName: firsName,
            lastName:lastName,
            fatherName: fatherName,
            phone:phone,
            serviceTypeId: jobTitle,
            status: status
        })
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
                    Добавить нового клиента
                </h2>

                <div className="grid grid-cols-2 gap-2">
                    {/* Поле для ФИО с иконкой pen */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Firs name</label>
                        <input
                            type="text"
                            value={firsName}
                            onChange={(e) => setFirsName(e.target.value)}
                            placeholder="Firsname"
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
                        <label className="text-sm text-gray-600">Last name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Lastname" // Добавлен placeholder
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

                <div className="grid grid-cols-2 gap-2">
                    {/* Поле для ФИО с иконкой pen */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Father name</label>
                        <input
                            type="text"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            placeholder="Fathername"
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
                            placeholder="Номер" // Добавлен placeholder
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
                        defaultValue=""
                        onChange={(e) => setJobTitle(Number(e.target.value))}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{
                            backgroundImage: "url('/svg/arrow_down.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="">Service</option> 
                        {
                            getService?.data?.length && getService?.data.map((service:serviseType) => (
                                <option value={service.id} key={service.id}>{service.name}</option>                                
                            ))
                        }
                    </select>
                </div>

                <div className="relative mt-2">
                    <label className="text-sm text-gray-600">Статус</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "ACTUAL" | "NOT_ACTUAL")}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{
                            backgroundImage: "url('/svg/arrow_down.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="ACTUAL">ACTUAL</option>
                        <option value="NOT_ACTUAL">NOT ACTUAL</option>
                    </select>
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
        </div>
    );
};
