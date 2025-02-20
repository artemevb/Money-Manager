"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import pen from '@/public/svg/pen.svg';
import arrowBack from '@/public/svg/clients/arrow_back.svg';
import trash from '@/public/svg/main/trash_white.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serviceUtils } from '@/src/app/utils/service.utils';
import { serviseType } from '../Main/types';
import toast from 'react-hot-toast';
import { clientUtils } from '@/src/app/utils/client.utils';

interface Client {
    id: number;
    firstName: string;
    lastName: string;
    fatherName: string;
    phone: string;
    status: string;
    serviceTypeId:number
}

interface EditClientModalProps {
    client: Client;
    onClose: () => void;
}

export const EditClientModal: React.FC<EditClientModalProps> = ({
    client,
    onClose,
}) => {
    const [firstName, setFirstName] = useState(client.firstName);
    const [lastName, setLastName] = useState(client.lastName);
    const [fatherName, setFatherName] = useState(client.fatherName);
    const [jobTitle, setJobTitle] = useState(client.serviceTypeId);
    const [phone, setPhone] = useState(client.phone);
    const [status, setStatus] = useState<"ACTUAL" | "NOT_ACTUAL">(client.status as "ACTUAL" | "NOT_ACTUAL");
    const queryClient = useQueryClient()
    const editClient = useMutation({
        mutationFn: clientUtils.editClient,
        onSuccess: () => {
            toast.success('Success edit clinet')
            queryClient.invalidateQueries({queryKey:['client']})
            onClose();
        },
        onError: (err) => {
            console.log(err);
            toast.error("Something went wrong")
        }
    })

    const handleSave = () => {
        editClient.mutate({
            fatherName: fatherName,
            firstName:firstName,
            lastName:lastName,
            phone:phone,
            serviceTypeId:jobTitle,
            id:client.id,
            status: status,
        })
        onClose();
    };


    const handleDelete = () => {
        console.log(`Удаляем клиента #${client.id}`);
        onClose();
    };
    const {data: getService} = useQuery({
        queryKey: ['service'],
        queryFn: serviceUtils.getService
    })

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
                        <label className="text-sm text-gray-600">Firstname</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                        <label className="text-sm text-gray-600">Lastname</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                        <label className="text-sm text-gray-600">Fathername</label>
                        <input
                            type="text"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
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
                            type="tel"
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
                        onChange={(e) => setJobTitle(Number(e.target.value))}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{ backgroundImage: `url('/svg/arrow_down.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                        {getService?.data?.length && getService?.data.map((el: serviseType) => (
                            <option key={el.id} value={el.id}>{el.name}</option>
                        ))}
                    </select>

                </div>

                <div className="relative mt-2">
                    <label className="text-sm text-gray-600">Статус</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "ACTUAL" | "NOT_ACTUAL")}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{ backgroundImage: `url('/svg/arrow_down.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                        <option value="ACTUAL">ACTUAL</option>
                        <option value="NOT_ACTUAL">NOT ACTUAL</option>
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
