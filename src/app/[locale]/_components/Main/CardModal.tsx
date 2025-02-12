// components/CardModal.tsx
"use client";
import { useState, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import { CardData } from './types';
import Image from "next/image";
// import Link from "next/link";
// import logo from "@/public/images/imed-f.svg";
import close from "@/public/svg/close.svg";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardSubmit: (cardData: CardData) => void;
}

export default function CardModal({ isOpen, onClose, onCardSubmit }: CardModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');

  // Функция форматирования суммы с пробелами
  const formatAmount = (value: string) => {
    return value.replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(e.target.value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCardSubmit({
      cardNumber: cardNumber.replace(/\s/g, ''),
      balance: parseFloat(amount.replace(/\s/g, '').replace(',', '.')) || 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full ">
      <div className="bg-white px-5 pb-[40px] pt-5 rounded-t-[20px] w-full relative h-full bottom-0 max-h-[372px]">
        <div className='flex items-center justify-center'>
          <hr className='w-[60px] h-[4px] bg-[#D9D9D9] ' />
        </div>
        <button className='absolute right-[20px] top-[20px]'
          onClick={onClose}>
          <Image
            src={close}
            width={40}
            height={40}
            quality={100}
            alt="Rmc Logo"
            className="h-full w-auto"
          />
        </button>
        <h3 className="text-xl font-semibold mt-[40px]">Добавить карту</h3>

        <form onSubmit={handleSubmit} className="space-y-4 mt-[20px] text-[12px] text-[#A6A6A6]">
          <div>
            <label className="block mb-1">Номер карты</label>
            <InputMask
              mask="9999 9999 9999 9999"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[14px] font-medium text-[#000000]"
              placeholder="Введите номер карты"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Сумма денег на карте</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[14px] font-medium text-[#000000]"
              placeholder="Введите сумму"
              required
            />
          </div>

          <div className="flex w-full mt-5">
            <button
              type="submit"
              className="px-4 py-3 bg-[#7E49FF] text-white rounded-lg w-full hover:bg-[#8c61fa] transition-colors text-[16px] font-bold"
            >
              Применить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}