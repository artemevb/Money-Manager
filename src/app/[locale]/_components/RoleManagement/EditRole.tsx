import React, { useState } from "react";
import Image from "next/image";
import close from "@/public/svg/close.svg";
// Импортируем карту привилегий:
import { ROLE_PRIVILEGES_MAP } from "./roles";
import PrivilegesModal from "./PrivilegesModal"; // модальное окно с чекбоксами

interface EditRoleUsersModalProps {
    user: {
        id: number;
        fullName: string;
        role: string;
        // и т.д.
    };
    onClose: () => void;
}

// Тип для объекта, где ключ — название роли, значение — список выбранных под-привилегий.
interface UserPrivileges {
    [roleName: string]: string[];
}

export const EditRoleUsersModal: React.FC<EditRoleUsersModalProps> = ({
    user,
    onClose,
}) => {
    // Список ролей, которые мы хотим отобразить в чекбоксах
    const allRoles = Object.keys(ROLE_PRIVILEGES_MAP);
    // Храним в стейте, какие «главные» роли выбраны (можно и через объекты/Record, если нужно).
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    // Храним под-привилегии пользователя, где ключ — роль, а значение — массив действия
    const [userPrivileges, setUserPrivileges] = useState<UserPrivileges>({});

    // Для открытия второго модального окна:
    const [isPrivilegesModalOpen, setIsPrivilegesModalOpen] = useState(false);
    // Роль, для которой сейчас выбираем под-привилегии
    const [activeRole, setActiveRole] = useState<string | null>(null);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    // При нажатии/чекбоксе на «главную» роль
    const handleToggleRole = (role: string) => {
        // Если мы снимаем галочку с роли, убираем её и её привилегии
        if (selectedRoles.includes(role)) {
            setSelectedRoles((prev) => prev.filter((r) => r !== role));
            setUserPrivileges((prev) => {
                const copy = { ...prev };
                delete copy[role];
                return copy;
            });
        } else {
            // Если ставим галочку — добавляем роль в массив
            setSelectedRoles((prev) => [...prev, role]);
            // Сразу открываем модальное окно с под-привилегиями:
            setActiveRole(role);
            setIsPrivilegesModalOpen(true);
        }
    };

    // Когда пользователь кликает, чтобы отредактировать привилегии уже выбранной роли
    const handleEditRolePrivileges = (role: string) => {
        setActiveRole(role);
        setIsPrivilegesModalOpen(true);
    };

    // Функция, которая будет вызываться при нажатии «Применить» во втором модальном окне
    const handleApplyPrivileges = (role: string, privileges: string[]) => {
        setUserPrivileges((prev) => ({
            ...prev,
            [role]: privileges,
        }));
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full"
            onClick={handleBackdropClick}
        >
            <div className="bg-white px-5 pb-10 pt-5 rounded-t-2xl w-full relative ">
                <div className="flex items-center justify-center">
                    <hr className="w-16 h-1 bg-gray-300 rounded" />
                </div>
                <button className="absolute right-5 top-5" onClick={onClose}>
                    <Image src={close} width={24} height={24} quality={100} alt="Close icon" />
                </button>
                <h2 className="text-xl font-semibold mb-4 mt-[50px]">Редактирование ролей: {user.fullName}</h2>

                {/* Список всех ролей */}
                <div className="flex flex-col gap-[16px] mb-4">
                    {allRoles.map((role) => (
                        <label key={role} className="flex items-center gap-2 cursor-pointer">
                            {/* Скрытый стандартный чекбокс */}
                            <input
                                type="checkbox"
                                checked={selectedRoles.includes(role)}
                                onChange={() => handleToggleRole(role)}
                                className="hidden"
                            />

                            {/* Кастомный квадратный чекбокс */}
                            <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center border-2 
          ${selectedRoles.includes(role) ? 'bg-[#7E49FF] border-[#7E49FF]' : 'border-gray-400'}
        `}
                            >
                                {selectedRoles.includes(role) && (
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* Название роли */}
                            <span>{role}</span>

                            {/* Кнопка «Редактировать под-привилегии», если роль выбрана */}
                            {selectedRoles.includes(role) && (
                                <button
                                    onClick={() => handleEditRolePrivileges(role)}
                                    className="ml-auto text-blue-600 underline text-sm"
                                >
                                    Настроить доступ
                                </button>
                            )}
                        </label>
                    ))}
                </div>

                {/* Для примера отобразим, какие под-привилегии выбраны */}
                <div className="bg-gray-100 p-2 rounded-md text-sm space-y-2">
                    <h3 className="font-semibold">Выбранные под-привилегии:</h3>
                    {Object.entries(userPrivileges).map(([role, privileges]) => (
                        <div key={role}>
                            <strong>{role}:</strong> {privileges.join(", ")}
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="bg-[#7E49FF] text-white py-3 rounded-md w-full mt-6 font-bold text-[16px]"
                >
                    Применить
                </button>
            </div>

            {/* Второе модальное окно — под-привилегии для конкретной роли */}
            {isPrivilegesModalOpen && activeRole && (
                <PrivilegesModal
                    role={activeRole}
                    isOpen={isPrivilegesModalOpen}
                    onClose={() => {
                        setIsPrivilegesModalOpen(false);
                        setActiveRole(null);
                    }}
                    onApply={handleApplyPrivileges}
                    // Передаём уже выбранные привилегии (если они есть)
                    initialPrivileges={userPrivileges[activeRole] || []}
                />
            )}
        </div>
    );
};
