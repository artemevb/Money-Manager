// components/CardState.tsx
"use client";
import { useState, useEffect } from 'react';
import CardModal from './CardModal';
import DeleteConfirmation from './DeleteConfirmation';
import { CardData, Transaction } from './types';
import Image from "next/image";
// import Link from "next/link";
// import logo from "@/public/images/imed-f.svg";
import plus from "@/public/svg/plus_bold.svg";

export default function CardState() {
  const [hasCard, setHasCard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [transactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedCard = localStorage.getItem('cardData');
    setHasCard(!!savedCard);
  }, []);

  const handleCardAdd = (cardData: CardData) => {
    localStorage.setItem('cardData', JSON.stringify(cardData));
    setHasCard(true);
    setIsModalOpen(false);
  };

  const handleCardDelete = () => {
    localStorage.removeItem('cardData');
    setHasCard(false);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-white p-4 w-full">
      {!hasCard ? (
        <div className=" p-8 text-center w-full mx-auto mt-[48px]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-br from-[#C1B1FF] via-[#7E49FF] to-[#5718BF] rounded-[16px] text-white px-8 py-[23px] hover:opacity-90 transition-opacity text-[24px] font-bold w-full flex justify-center items-center flex-col max-h-[114px] h-full"
          >
            <div className="flex flex-row gap-[8px] items-center justify-between max-w-[120px]">
              <Image
                src={plus}
                width={40}
                height={40}
                quality={100}
                alt="Rmc Logo"
                className="h-full w-auto"
              />
            </div>
            Добавить карту
          </button>

        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto mt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">1 926 515 сум</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirmation(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Удалить карту
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-gray-800"
              >
                Изменить данные
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">История операций</h3>
            <div className="space-y-4">
              {transactions.map((transaction, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{transaction.date}</p>
                      <p className="text-gray-600">{transaction.status}</p>
                    </div>
                    <span className="text-lg font-semibold">
                      {transaction.amount} сум
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCardSubmit={handleCardAdd}
      />

      <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleCardDelete}
      />
    </div>
  );
}