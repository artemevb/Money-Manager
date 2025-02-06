"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import arrow from "@/public/svg/list_users/arrow_right.svg";
import plus from "@/public/svg/plus_bold.svg";
import trash from "@/public/svg/main/trash.svg";
import pen from "@/public/svg/pen.svg";
import Link from "next/link";
import { EditUsersModal } from "../Security/EditUsers";

interface User {
    id: number;
    fullName: string; // Объединённое ФИО
    password: string;
    role: string;
}

// Пример мок-данных
const usersData: User[] = [
    {
        id: 1,
        fullName: "Хасанов Азиз Олимович",
        password: "password123",
        role: "Админ",
    },
    {
        id: 2,
        fullName: "Иванов Иван Иванович",
        password: "securePass456",
        role: "Пользователь",
    },
];

const Home: NextPage = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Поиск"
                            className="w-full rounded-md border bg-gray-200/10 py-2 pl-8 pr-10 text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                        {/* Иконка лупы */}
                        <svg
                            className="absolute left-2 top-2 h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">Список пользователей</h1>
                <button className="flex items-center gap-2 rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#8455fc]">
                    Добавить
                    <Image src={plus} width={24} height={24} alt="Plus icon" className="h-5 w-auto" />
                </button>
            </div>

            {/* Список пользователей */}
            <div className="space-y-4">
                {usersData.map((user) => (
                    <div key={user.id} className="flex items-center justify-between rounded-lg bg-white p-5 shadow">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">{user.fullName}</h2>
                            <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="rounded-md bg-gray-100 p-2 hover:bg-gray-200" onClick={() => handleEditClick(user)}>
                                <Image src={pen} width={16} height={16} alt="Редактировать" className="h-4 w-auto" />
                            </button>
                            <button className="rounded-md bg-red-50 p-2 text-red-500 hover:bg-red-100">
                                <Image src={trash} width={16} height={16} alt="Удалить" className="h-4 w-auto" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Link href={`/role_management`} className="mt-10 flex justify-end">
                <button className="w-full flex justify-between rounded-[6px] bg-[#F5F2FF] px-[10px] py-4 text-sm font-medium text-[#000000] hover:bg-[#9e78fd]">
                    Управление ролями
                    <Image src={arrow} width={16} height={16} alt="Plus icon" className="h-4 w-auto" />
                </button>
            </Link>
            {isEditModalOpen && selectedUser && (
                <EditUsersModal user={selectedUser} onClose={handleCloseEditModal} />
            )}
        </div>
    );
};

export default Home;

