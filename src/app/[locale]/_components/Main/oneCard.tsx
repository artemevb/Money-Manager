import React, { useState } from 'react';
import card from "@/public/svg/main/card.svg";
import trash from "@/public/svg/main/trash.svg";
import Image from 'next/image';
import DeleteConfirmation from './DeleteConfirmation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cardUtils } from '@/src/app/utils/card.utils';
import toast from 'react-hot-toast';

interface cartProps {
    id: number
    cartNumber: string,
    cartPrice: number,
    cartName: string,
    monyType: string
}

const OneCard = (data: cartProps) => {
    const queryClient = useQueryClient()    
    const safeCardNumber = data.cartNumber.slice(0, 4) + '*'.repeat(data.cartNumber.length - 8) + data.cartNumber.slice(-4)
    
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // delete card
    const deleteCard = useMutation({
        mutationFn: cardUtils.deleteCard,
        onSuccess: () => {
            toast.success("Delete card 🗑️")
            queryClient.invalidateQueries({ queryKey: ['cards'] })
            setShowDeleteConfirmation(false)
        },
        onError: (err) => {
            console.log(err);
            toast.error('Something went wrong ')
        }
    })
    const handleCardDelete = () => {
        deleteCard.mutate(data.id)
    }
    return (
        <>
            <div className='w-[270px] border-[#F1F5F9] shadow-[0px_8px_8px_0px_#F1F5F9] border rounded-[16px] px-[10px] pt-[10px] pb-[20px] relative shrink-0'>
                <div className='w-full flex justify-end text-[14px]'>{safeCardNumber}</div>
                <div className='w-full flex-row flex gap-[6px]'>
                    <div className='bg-[#F5F2FF] w-[60px] h-[60px] flex items-center justify-center rounded-[30px]'>
                        <Image src={card} width={40} height={40} quality={100} alt="Сальдо" className=" w-[40px] h-[40px]" />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className='text-[14px]'>{data.cartName}</p>
                        <p className='text-[16px] text-[#303030] font-semibold'>{data.cartPrice.toLocaleString()} {data?.monyType}</p>
                    </div>
                </div>
                <button className='absolute bottom-[15px] right-[15px]'
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    <Image src={trash} width={16} height={16} quality={100} alt="Удалить" className="w-[24px] h-[24px]" />
                </button>
            </div>
            <DeleteConfirmation
                isOpen={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={handleCardDelete}
            />
        </>
    );
};

export default OneCard;