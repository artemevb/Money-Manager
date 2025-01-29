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
import card1 from "@/public/images/main/money1.png";
import card2 from "@/public/images/main/money2.png";
import card3 from "@/public/images/main/money3.png";

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

  const income = 1_500_000; // Доходы
  const expenses = 850_000; // Расходы
  const balance = income - expenses; // Сальдо

  return (
    <div className="h-full bg-white p-4 w-full">
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
        <div className="bg-white rounded-xl w-full mx-auto mt-8">
          <div className="flex justify-between flex-col items-center h-full">
            <div className="bg-gradient-to-br from-[#C1B1FF] via-[#7E49FF] to-[#5718BF] rounded-[16px] text-white px-8 py-[23px] hover:opacity-90 transition-opacity text-[24px] font-bold w-full flex justify-center items-center flex-row max-h-[114px] h-full">
              <h2 className="text-[32px] font-bold text-white">1 926 515   <span className='text-[20px] '> сум</span></h2>
            </div>
            <div className="flex flex-row mt-6 w-full">


              {/* Доходы */}
              <div className="shadow-[0px 8px 8px 0px] border border-[#F5F2FF] bg-white rounded-[16px] p-[10px] flex flex-col items-start w-full text-center">
                <div className='w-full flex flex-row justify-between '>

                  <Image src={card1} width={27} height={27} quality={100} alt="Доходы" className="mb-2 w-[27px] h-[27px]" />

                  <div className='w-auto flex flex-col items-start'>
                    <span className="text-[12px] font-medium">Доходы</span>
                    <span className="text-[8px] font-medium">за месяц</span>
                  </div>
                </div>
                <span className="text-[12px] font-bold mt-2 flex flex-row items-center">{income.toLocaleString()} <p className='text-[10px] font-medium'> сум</p></span>
              </div>

              {/* Расходы */}
              <div className="shadow-[0px 8px 8px 0px] border border-[#F5F2FF] bg-white rounded-[16px] p-[10px] flex flex-col items-start w-full text-center mx-[4px]">
                <div className='w-full flex flex-row justify-between '>

                  <Image src={card2} width={27} height={27} quality={100} alt="Расходы" className="mb-2 w-[27px] h-[27px]" />

                  <div className='w-auto flex flex-col items-start'>
                    <span className="text-[12px] font-medium">Расходы</span>
                    <span className="text-[8px] font-medium">за месяц</span>
                  </div>
                </div>
                <span className="text-[12px] font-bold mt-2 flex flex-row items-center gap-[3px]">{income.toLocaleString()} <p className='text-[10px] font-medium'> сум</p></span>
              </div>

              {/* Сальдо */}
              <div className="shadow-[0px 8px 8px 0px] border border-[#F5F2FF] bg-white rounded-[16px] p-[10px] flex flex-col items-start w-full text-center">
                <div className='w-full flex flex-row justify-between '>

                  <Image src={card3} width={27} height={27} quality={100} alt="Сальдо" className="mb-2 w-[27px] h-[27px]" />

                  <div className='w-auto flex flex-col items-start'>
                    <span className="text-[12px] font-medium">Сальдо</span>
                    <span className="text-[8px] font-medium">за месяц</span>
                  </div>
                </div>
                <span className="text-[12px] font-bold mt-2 flex flex-row items-center gap-[3px]">{balance.toLocaleString()} <p className='text-[10px] font-medium'> сум</p></span>
              </div>
            </div>

            {/* <div className="flex gap-3">
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
            </div> */}
          </div>

          <div>
            <h3 className="text-xl font-bold mt-[40px]">Счета</h3>

          </div>

          <div className=" mt-[40px]">
            <h3 className="text-xl font-semibold mb-4">Последние платежи</h3>
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