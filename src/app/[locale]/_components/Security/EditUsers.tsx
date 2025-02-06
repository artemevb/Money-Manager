"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowBack from "@/public/svg/clients/arrow_back.svg";
import pen from '@/public/svg/pen.svg';

interface User {
    id: number;
    fullName: string;
    password: string;
    role: string;
}

interface EditUsersModalProps {
    user: User;
    onClose: () => void;
}

export const EditUsersModal: React.FC<EditUsersModalProps> = ({ user, onClose }) => {
    const [fullName, setFullName] = useState(user.fullName);
    const [password, setPassword] = useState(user.password);
    const [role, setRole] = useState(user.role);

    const handleSave = () => {
        console.log("Сохранение данных...", { fullName, password, role });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full h-full bg-white p-4 relative">
                <button onClick={onClose} className="flex items-center text-[12px] text-[#303030] mb-4">
                    <Image src={arrowBack} width={16} height={16} alt="Назад" className="mr-1" />
                    Назад
                </button>

                <h2 className="mb-4 text-lg font-semibold text-gray-800">Редактировать пользователя</h2>

                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        {/* Полное имя */}
                        <div className="relative">
                            <label className="text-sm text-gray-600">ФИО</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                                placeholder="Введите ФИО"
                            />
                            <Image
                                src={pen}
                                width={16}
                                height={16}
                                alt="Редактировать"
                                className="absolute right-3 top-[40px] cursor-pointer"
                            />
                        </div>

                        {/* Пароль */}
                        <div className="relative">
                            <label className="text-sm text-gray-600">Пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                                placeholder="Введите пароль"
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
                    {/* Роль */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Роль</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                            style={{ backgroundImage: `url('/svg/arrow_down.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                        >
                            <option value="Админ">Админ</option>
                            <option value="Пользователь">Пользователь</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={handleSave} className="rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#9e78fd]">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};
