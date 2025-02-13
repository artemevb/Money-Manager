"use client";

import React, { useState } from "react";
import Image from "next/image";
import pen from "@/public/svg/pen.svg";
import arrowBack from "@/public/svg/clients/arrow_back.svg";

interface AddUsersModalProps {
    onClose: () => void;
}

export const AddUsersModal: React.FC<AddUsersModalProps> = ({ onClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [role, setRole] = useState("Пользователь");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSave = () => {
        console.log("Создание пользователя...", {
            firstName,
            lastName,
            middleName,
            role,
            oldPassword,
            newPassword,
            confirmNewPassword,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full h-full bg-white p-4 relative">
                <button onClick={onClose} className="flex items-center text-[12px] text-[#303030] mb-4">
                    <Image src={arrowBack} width={16} height={16} alt="Назад" className="mr-1" />
                    Назад
                </button>

                <h2 className="mb-4 text-lg font-semibold text-gray-800">Добавить пользователя</h2>

                <div className="grid grid-cols-2 gap-2">
                    {/* Имя */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Имя</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                            placeholder="Введите имя"
                        />
                        <Image src={pen} width={16} height={16} alt="Редактировать" className="absolute right-3 top-[40px] cursor-pointer" />
                    </div>

                    {/* Фамилия */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Фамилия</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                            placeholder="Введите фамилию"
                        />
                        <Image src={pen} width={16} height={16} alt="Редактировать" className="absolute right-3 top-[40px] cursor-pointer" />
                    </div>

                    {/* Отчество */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Отчество</label>
                        <input
                            type="text"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                            placeholder="Введите отчество"
                        />
                        <Image src={pen} width={16} height={16} alt="Редактировать" className="absolute right-3 top-[40px] cursor-pointer" />
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

                {/* Старый пароль */}
                <div className="relative mt-5">
                    <label className="text-sm text-gray-600">Старый пароль</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        placeholder="Введите старый пароль"
                    />
                </div>

                {/* Новый пароль */}
                <div className="relative mt-2">
                    <label className="text-sm text-gray-600">Новый пароль</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        placeholder="Введите новый пароль"
                    />
                    <Image src={pen} width={16} height={16} alt="Редактировать" className="absolute right-3 top-[40px] cursor-pointer" />
                </div>

                {/* Подтверждение нового пароля */}
                <div className="relative mt-2">
                    <label className="text-sm text-gray-600">Введите новый пароль еще раз</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        placeholder="Повторите новый пароль"
                    />
                    <Image src={pen} width={16} height={16} alt="Редактировать" className="absolute right-3 top-[40px] cursor-pointer" />
                </div>

                <div className="mt-4 flex justify-end">
                    <button onClick={handleSave} className="rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#9e78fd]">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};
