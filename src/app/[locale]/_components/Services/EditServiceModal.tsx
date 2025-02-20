"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import pen from '@/public/svg/pen.svg';
import arrowBack from '@/public/svg/clients/arrow_back.svg';
import trash from '@/public/svg/main/trash_white.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceUtils } from '@/src/app/utils/service.utils';
import toast from 'react-hot-toast';

interface Service {
    id: number;
    name: string;
    countTransaction: number;
}

interface EditServiceModalProps {
    service: Service;
    onClose: () => void;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
    service,
    onClose,
}) => {
    const [fullName, setFullName] = useState(service.name);
    const queryClient = useQueryClient()
    const editService = useMutation({
        mutationFn: serviceUtils.editService,
        onSuccess: () => {
            toast.success("Edit service")
            queryClient.invalidateQueries({queryKey: ['services']})
            onClose()
        },
        onError: (err) => {
            toast.error("Something went wrong😔")
            console.log(err);            
        }
    })
    const deleteService = useMutation({
        mutationFn:serviceUtils.deleteServise,
        onSuccess: () =>{
            toast.success("Delete service 🗑️")
            queryClient.invalidateQueries({queryKey: ['services']})
            onClose()
        },
        onError: (err) => {
            console.log(err);
            toast.error("Something went wrong 😔")
        }
    })

    const handleSave = () => {
        editService.mutate({
            id: service.id,
            name:fullName
        })
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                    Редактировать услугу
                </h2>

                <div className="gap-2">
                    <div className="relative">
                        <label className="text-sm text-gray-600">Услуга</label>
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
                </div>
                
                <div className="mt-4 flex items-center justify-end space-x-2">
                    <button
                        onClick={() => deleteService.mutate({id:service.id})}
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
