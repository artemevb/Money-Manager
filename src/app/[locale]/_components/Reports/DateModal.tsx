// components/modals/DateModal.tsx
import React, { useState } from "react";
import close from "@/public/svg/close.svg";
import Image from "next/image";

interface DateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (range: { from: string; to: string }) => void;
}

const DateModal: React.FC<DateModalProps> = ({ isOpen, onClose, onApply }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    if (!isOpen) return null;

    const handleApply = () => {
        onApply({ from, to });
        onClose();
    };

    // Клик по фону закрывает модалку, а остановка всплытия клика внутри.
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Если клик по самому фону — закрываем
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full"
            onClick={handleBackdropClick}
        >
            <div className="bg-white px-5 pb-10 pt-5 rounded-t-2xl w-full relative max-h-[290px]">
                <div className="flex items-center justify-center">
                    <hr className="w-16 h-1 bg-gray-300 rounded" />
                </div>
                <button className="absolute right-5 top-5" onClick={onClose}>
                    <Image src={close} width={24} height={24} quality={100} alt="Close icon" />
                </button>
                <h2 className="text-xl font-semibold mb-4 mt-10 text-left">Дата</h2>
                <div className="flex gap-2 mb-4 w-full">
                    <div className="flex flex-col w-full">
                        <label className="text-[12px] text-[#A6A6A6]">От</label>
                        <input
                            type="date"
                            className=" p-2 rounded w-full bg-[#F5F2FF]"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-[12px] text-[#A6A6A6]">До</label>
                        <input
                            type="date"
                            className=" p-2 rounded w-full bg-[#F5F2FF]"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    onClick={handleApply}
                    className="bg-[#7E49FF] text-white py-3 rounded-md w-full mt-6 font-bold text-[16px]"
                >
                    Применить
                </button>
            </div>
        </div>
    );
};

export default DateModal;
