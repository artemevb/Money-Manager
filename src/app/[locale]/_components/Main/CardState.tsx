// components/CardState.tsx
"use client";
import { useState, useEffect } from 'react';
import CardModal from './CardModal';
import DeleteConfirmation from './DeleteConfirmation';
import { CardData } from './types';
import Image from "next/image";
// import Link from "next/link";
// import logo from "@/public/images/imed-f.svg";
import plus from "@/public/svg/plus_bold.svg";
import plusPurple from "@/public/svg/main/plus_purple.svg";
import card1 from "@/public/images/main/money1.png";
import card2 from "@/public/images/main/money2.png";
import card3 from "@/public/images/main/money3.png";
import card from "@/public/svg/main/card.svg";
import trash from "@/public/svg/main/trash.svg";
import PaymentsList from "./PaymentsList";

export default function CardState() {
  const [hasCard, setHasCard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
        <>
          <div className=" py-8 text-center w-full mx-auto mt-[48px]">
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
            <div className="mt-[40px] w-full flex flex-col items-start">
              <h3 className="text-xl font-bold mb-4">Последние платежи</h3>
              <div className='no-scrollbar overflow-x-auto w-full text-[14px] font-medium text-white flex items-start'>
                <button className='bg-[#7E49FF] rounded-[17px] py-[6px] px-[12px]'>Все</button>
                <button className='bg-[#7E49FF] rounded-[17px] py-[6px] px-[12px] mx-[8px]'>Входящие</button>
                <button className='bg-[#7E49FF] rounded-[17px] py-[6px] px-[12px]'>Исходящие</button>
              </div>
            </div>


          </div>
          <div className='w-full h-full text-[24px] font-bold text-[#000] flex items-center justify-center  text-center mt-[20%]'><p className='max-w-[206px]'>У вас нет транзакций</p></div>
        </>
      ) : (
        <div className="bg-white rounded-xl w-full mx-auto mt-8">
          <div className="flex justify-between flex-col items-center h-full">
            <div className="bg-gradient-to-br from-[#C1B1FF] via-[#7E49FF] to-[#5718BF] rounded-[16px] text-white px-8 py-[23px] hover:opacity-90 transition-opacity text-[24px] font-bold w-full flex justify-center items-start flex-col max-h-[114px] h-full">
              <h2 className='text-[24px] font-bold'>Баланс</h2>
              <h2 className="text-[32px] font-bold text-white">1 926 515   <span className='text-[20px] '> сум</span></h2>
            </div>
            <div className="flex flex-row mt-6 w-full">


              {/* Доходы */}
              <div className="shadow-[0px_8px_8px_0px_#F1F5F9] border border-[#F5F2FF] bg-white rounded-[16px] p-[10px] flex flex-col items-start w-full text-center">
                <div className='w-full flex flex-row justify-between '>

                  <Image src={card1} width={27} height={27} quality={100} alt="Доходы" className="mb-2 w-[27px] h-[27px]" />

                  <div className='w-auto flex flex-col items-start'>
                    <span className="text-[12px] font-medium">Доходы</span>
                    <span className="text-[8px] font-medium">за месяц</span>
                  </div>
                </div>
                <span className="text-[12px] font-semibold mt-2 flex flex-row items-center">{income.toLocaleString()} <p className='text-[10px] font-medium'> сум</p></span>
              </div>

              {/* Расходы */}
              <div className=" shadow-[0px_8px_8px_0px_#F1F5F9] border border-[#F5F2FF] bg-white rounded-[16px] p-[10px] flex flex-col items-start w-full text-center mx-[4px]">
                <div className='w-full flex flex-row justify-between '>

                  <Image src={card2} width={27} height={27} quality={100} alt="Расходы" className="mb-2 w-[27px] h-[27px]" />

                  <div className='w-auto flex flex-col items-start'>
                    <span className="text-[12px] font-medium">Расходы</span>
                    <span className="text-[8px] font-medium">за месяц</span>
                  </div>
                </div>
                <span className="text-[12px] font-semibold mt-2 flex flex-row items-center gap-[3px]">{expenses.toLocaleString()} <p className='text-[10px] font-medium'> сум</p></span>
              </div>

              {/* Сальдо */}
              <div className=" shadow-[0px_8px_8px_0px_#F1F5F9] border border-[#F5F2FF] bg-white rounded-[16px] p-[10px] flex flex-col items-start w-full text-center">
                <div className='w-full flex flex-row justify-between '>

                  <Image src={card3} width={27} height={27} quality={100} alt="Сальдо" className="mb-2 w-[27px] h-[27px]" />

                  <div className='w-auto flex flex-col items-start'>
                    <span className="text-[12px] font-medium">Сальдо</span>
                    <span className="text-[8px] font-medium">за месяц</span>
                  </div>
                </div>
                <span className="text-[12px] font-semibold mt-2 flex flex-row items-center gap-[3px]">{balance.toLocaleString()} <p className='text-[10px] font-medium'> сум</p></span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[20px] font-bold mt-[40px]">Счета</h3>

            <div className='w-full overflow-x-auto flex gap-[5px] mt-[20px] no-scrollbar'>
              <div className='flex flex-nowrap items-center'>
                <div className='w-[270px] border-[#F1F5F9] shadow-[0px_8px_8px_0px_#F1F5F9] border rounded-[16px] px-[10px] pt-[10px] pb-[20px] relative shrink-0'>
                  <div className='w-full flex justify-end text-[14px]'>9860******1467</div>
                  <div className='w-full flex-row flex gap-[6px]'>
                    <div className='bg-[#F5F2FF] w-[60px] h-[60px] flex items-center justify-center rounded-[30px]'>
                      <Image src={card} width={40} height={40} quality={100} alt="Сальдо" className=" w-[40px] h-[40px]" />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <p className='text-[14px]'>Uzcard</p>
                      <p className='text-[16px] text-[#303030] font-semibold'>1 870.20 UZS</p>
                    </div>
                  </div>
                  <button className='absolute bottom-[15px] right-[15px]'
                    onClick={() => setShowDeleteConfirmation(true)}>
                    <Image src={trash} width={16} height={16} quality={100} alt="Удалить" className="w-[24px] h-[24px]" />
                  </button>
                </div>

                <button className='text-[11px] font-medium w-full flex flex-col items-center max-w-[75px] shrink-0'
                  onClick={() => setIsModalOpen(true)}>
                  Добавить карту
                  <Image src={plusPurple} width={24} height={24} quality={100} alt="Добавить" className="mb-2 w-[24px] h-[24px]" />
                </button>
              </div>
            </div>


          </div>

          <div className="mt-[40px]">
          <PaymentsList />
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