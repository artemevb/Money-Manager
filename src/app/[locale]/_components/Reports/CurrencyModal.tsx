// components/modals/CurrencyModal.tsx
import React, { useState } from "react";
import close from "@/public/svg/close.svg";
import Image from "next/image";

interface CurrencyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (selectedCurrency: string) => void;
}

const currencies = ["Доллар", "Сум", "Евро"];

const CurrencyModal: React.FC<CurrencyModalProps> = ({
    isOpen,
    onClose,
    onApply
}) => {
    const [currency, setCurrency] = useState("Сум");

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleApply = () => {
        onApply(currency);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full"
            onClick={handleBackdropClick}
        >
            <div className="bg-white px-5 pb-10 pt-5 rounded-t-2xl w-full relative max-h-80">
                <div className="flex items-center justify-center">
                    <hr className="w-16 h-1 bg-gray-300 rounded" />
                </div>
                <button className="absolute right-5 top-5" onClick={onClose}>
                    <Image src={close} width={24} height={24} quality={100} alt="Close icon" />
                </button>
                <h2 className="text-xl font-semibold mb-4 mt-10 text-left">Валюта</h2>
                <div className="flex flex-col space-y-4 text-lg">
                    {currencies.map((c) => (
                        <label key={c} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="currency"
                                value={c}
                                checked={currency === c}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="hidden"
                            />
                            <div
                                className={`w-[24px] h-[24px] rounded-md flex items-center justify-center border-2 
                                    ${currency === c ? 'bg-[#7E49FF] border-[#7E49FF]' : 'border-gray-400'}
                                `}
                            >
                                {currency === c && (
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span>{c}</span>
                        </label>
                    ))}
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

export default CurrencyModal;
