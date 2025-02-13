import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import arrowBack from '@/public/svg/clients/arrow_back.svg';
import income from '@/public/images/main/income.png'

const IncomeHead = () => {
    const router = useRouter(); 
    return (
        <>
            <button
                onClick={() => router.back()}
                className="flex items-center text-[12px] text-[#303030] mb-4"
            >
                <Image
                    src={arrowBack}
                    width={16}
                    height={16}
                    alt="Назад"
                    className="mr-1"
                />
                Назад
            </button>
            <div className="mt-10 rounded-[16px] px-5 p-2 text-center bg-[#FEFCE8] flex justify-between items-center">
                <p className="text-[24px] text-left font-bold pb-[20px]">Доходы</p>
                <Image src={income} alt='income' />
            </div>
        </>
    );
};

export default IncomeHead;