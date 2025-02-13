import { cardUtils } from '@/src/app/utils/card.utils';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { cardType } from '../Main/types';
import Image from 'next/image';
import cardIcon from '@/public/svg/income/card.svg'
import bottonRow from '@/public/svg/income/botton-arrow.svg'


interface ModalProps {
    open: boolean;
    handleClose: () => void;
    selectCard: (id: number) => void
}

const SlelectCardModal = ({ handleClose, open,selectCard }: ModalProps) => {
    useEffect(() => {
            if (open) {
                document.body.style.overflow = "hidden"; // Scrollni o‘chirish
            } else {
                document.body.style.overflow = "auto"; // Scrollni tiklash
            }    
            return () => {
                document.body.style.overflow = "auto"; // Komponent unmount bo‘lganda scrollni tiklash
            };
    }, [open]);
    const {data: cards} = useQuery({
        queryKey: ['cards'],
        queryFn: cardUtils.getCard
    })
    const handleSelectCard = (index: number) => {
        selectCard(index)
        handleClose()
    }
    return open && (
        <div className="fixed inset-0 flex items-center h-screen justify-center bg-black/50 backdrop-blur-sm z-20"  onClick={handleClose}>
            <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md shadow-xl transform transition-all scale-95" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-3">Зачислить на  </h2>
                <div className="flex flex-col space-y-2 items-center">
                    {cards?.data?.cards?.length && cards?.data.cards.map((el:cardType, i:number) => (
                        <div key={el.id} onClick={() => handleSelectCard(i)} className="w-full hover:border hover:border-blue-500 cursor-pointer rounded-[16px] px-3 py-5 text-center shadow-md border text-[#7E49FF] flex justify-between items-start">
                            <div className="flex items-center gap-x-2">
                                <Image className='p-2 bg-[#F5F2FF] rounded-full' width={50} height={50} src={cardIcon} alt='user a' />
                                <div className="">
                                    <p className="text-[14px] text-start pb-[5px]">{el.cardType} </p>
                                    <p className="text-[14px] text-black text-start">{el.balance.toLocaleString()}  </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-end">
                                <Image src={bottonRow} alt='income' />
                                <p className='text-black'>{el.cardNumber}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlelectCardModal;