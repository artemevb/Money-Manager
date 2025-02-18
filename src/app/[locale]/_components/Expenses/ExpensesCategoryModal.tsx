'use client'
import React, { useState } from "react";
import close from "@/public/svg/close.svg";
import Image from "next/image";
import pen from '@/public/svg/pen.svg';
import { useQuery } from "@tanstack/react-query";
import { categoryUtils } from "@/src/app/utils/category";

interface ExpensesCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (name: string, id: number) => void;
}
interface categoryType {
    name: string,
    id: number
}

const ExpensesCategoryModal: React.FC<ExpensesCategoryModalProps> = ({
    isOpen,
    onClose,
    onSelect,
}) => {
    const [otherCategory, setOtherCategory] = useState("");
    const { data: categories } = useQuery({
        queryKey: ['categorys'],
        queryFn: categoryUtils.getCategory
    })
console.log(categories);

    if (!isOpen) return null;
    const handleSave = () => {
        onClose();
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full">
            <div className="bg-white px-5 pb-10 pt-5 rounded-t-2xl w-full relative max-h-auto">
                <div className="flex items-center justify-center">
                    <hr className="w-16 h-1 bg-gray-300 rounded" />
                </div>
                <button className="absolute right-5 top-5" onClick={onClose}>
                    <Image src={close} width={24} height={24} quality={100} alt="Close icon" />
                </button>

                <h2 className="text-xl font-semibold mb-4 mt-10 text-left">Категория расходов </h2>
                {/* Список категорий */}
                <div className="grid grid-cols-2 gap-x-[8px] gap-y-[16px] mb-6">
                    {categories?.data?.length && categories?.data?.map((el: categoryType) => (
                        <button
                            key={el.id}
                            onClick={() => {
                                onSelect(el.name, el.id);
                                onClose();
                            }}
                            className=" text-sm py-3 px-5 rounded-2xl text-[#303030] font-medium shadow-transfer border border-[#F5F2FF]"
                        >
                            <div className="flex flex-col w-full items-start gap-[8px]">
                                <span className="text-[#7E49FF] font-medium text-[14px]">Куда</span>
                                <span className="text-[14px] font-medium text-[#000]">{el.name}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Поле "Другое" */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        placeholder="Другое"
                        className="w-full px-4 py-3 bg-[#F5F2FF] rounded-lg text-sm text-[#303030] border border-[#E5E5E5] focus:outline-none"
                    />
                    <Image src={pen} alt="Pen Icon" width={16} height={16} className="bottom-[32px] ml-auto right-[10px] relative" />
                </div>

                {/* Кнопка сохранения */}
                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-[#7E49FF] text-white rounded-lg text-sm font-bold hover:bg-purple-600 transition"
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default ExpensesCategoryModal;
