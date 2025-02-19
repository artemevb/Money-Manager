import React from "react";
import Card from "@/public/svg/main/card.svg";
import Image from "next/image";

type Card = {
    id: number;
    cardType: string;
    balance: string;
    cardNumber: string;
    moneyType: string


};

type ModalCardSelectionProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (cardNumber: string,cardId:number, cardType:string, monayType:string) => void;
    title: string;
    availableCards: Card[];
    selectedCardNumber: string; // передаём номер выбранной карты
};

const ModalCardSelection: React.FC<ModalCardSelectionProps> = ({
    isOpen,
    onClose,
    onSelect,
    title,
    availableCards,
    selectedCardNumber,
}) => {
    console.log(availableCards);
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-[16px] p-5 w-[90%] max-w-sm">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <ul className="space-y-3">
                    {availableCards?.map((card) => {
                        const isSelected = card.cardNumber === selectedCardNumber;
                        return (
                            <li
                                key={card.id}
                                onClick={() => onSelect(card.cardNumber, card.id, card.cardType, card.moneyType)}
                                className={`py-[14px] px-[10px] rounded-2xl flex justify-between items-center cursor-pointer ${isSelected
                                    ? "border border-[#7E49FF]"
                                    : "border border-[#F5F2FF]"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className="rounded-full bg-[#F5F2FF] h-[50px] w-[50px] flex items-center justify-center">
                                        <Image src={Card} alt="Карта" width={32} height={32} />
                                    </div>
                                    <div>
                                        <div className="text-[12px] text-[#303030]">{card.cardType}</div>
                                        <div className="text-[16px] font-semibold text-[#303030]">{card.balance}</div>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-[#303030]">{card.cardNumber}</div>
                            </li>
                        );
                    })}
                </ul>
                <button
                    className="mt-4 w-full py-2 bg-[#7E49FF] text-white rounded-md text-sm font-bold"
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default ModalCardSelection;
