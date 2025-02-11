"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import arrowBack from '@/public/svg/clients/arrow_back.svg';
import { useRouter } from 'next/navigation';
import income from '@/public/images/main/income.png'
import userIcon from '@/public/svg/income/user.svg'
import cardIcon from '@/public/svg/income/card.svg'
import bottonRow from '@/public/svg/income/botton-arrow.svg'
import pen from '@/public/svg/income/pensel.svg'
import plus from "@/public/svg/plus_bold.svg";
import document from '@/public/svg/income/documnet.svg'
import download from '@/public/svg/income/download.svg'
import IncomePayModal from './IncomePayMOdal';
const IncomeMain = () => {
    const router = useRouter();    
    const [jobTitle, setJobTitle] = useState("");
    const [addPay, setAddPay] = useState(false)
    const [otherValute, setOtherValute] = useState('usd')
    const [date, setDate] = useState("");
    const [open, setOpen] = useState(false)
    const setTodayDate = () => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    };
    const handleCloseModal = () => {
        setOpen(false)
    }
    
    return (
        <div className='p-6 mb-[26px] w-full mx-auto'>
            {/* Exit button */}
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
            <IncomePayModal open={open} handleClose={handleCloseModal}/>
            <div className="flex flex-col space-y-4">
                <div onClick={() => setOpen(true)} className="mt-10 rounded-[16px] px-3 py-5 text-center shadow-md border text-[#7E49FF] flex justify-between items-start">
                    <div className="flex items-center gap-x-2">
                        <Image className='p-2 bg-[#F5F2FF] rounded-full' width={50} height={50} src={userIcon} alt='user a' />
                        <div className="">
                            <p className="text-[14px] text-start pb-[5px]">От кого  </p>
                            <p className="text-[14px] text-black text-start">Клиент </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                        <Image src={bottonRow} alt='income' />
                        <p className='text-black'>98 601 46 71</p>
                    </div>
                </div>
                <div className="mt-10 rounded-[16px] px-3 py-5 text-center shadow-md border text-[#7E49FF] flex justify-between items-start">
                    <div className="flex items-center gap-x-2">
                        <Image className='p-2 bg-[#F5F2FF] rounded-full' width={50} height={50} src={cardIcon} alt='user a' />
                        <div className="">
                            <p className="text-[14px] text-start pb-[5px]">Зачислить на </p>
                            <p className="text-[14px] text-black text-start">Счет  </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                        <Image src={bottonRow} alt='income' />
                        <p className='text-black'></p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col justify-between items-start space-y-5 mt-10">
                <div className="w-full flex justify-between items-center">
                    <p className='text-[20px] font-bold'>Введите сумму</p>
                    <select
                        value={otherValute}
                        onChange={(e) => setOtherValute(e.target.value)}
                        className="w-[90px] rounded-md text-[20px] font-medium px-2 appearance-none outline-none"
                        style={{
                            backgroundImage: "url('/svg/income/USD.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="usd">USD</option>
                        <option value="sum">SUM</option>
                        <option value="evro">EVRO</option>
                    </select>
                </div>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                    />
                    <Image
                        src={pen}
                        width={16}
                        height={16}
                        alt="Редактировать"
                        className="absolute right-3 top-[20px] cursor-pointer"
                    />
                </div>
            </div>

            {/*  Добавить еще button */}
            <div className="flex justify-end items-center mt-10">
                <button
                    onClick={() => setAddPay((e) => !e)}
                    className="flex items-center gap-2 rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#8455fc]"         
                    >
                    Добавить еще
                    <Image
                        src={plus}
                        width={24}
                        height={24}
                        alt="Plus icon"
                        className="h-5 w-auto"
                />
                </button>
            </div>
            {/*  Добавить еще */}
            <div className={`${addPay?'flex':'hidden'} w-full flex-col justify-between items-start space-y-5 mt-10`}>
                <div className="w-full flex justify-between items-center">
                    <p className='text-[20px] font-bold'>Введите сумму</p>
                    <select
                        value={otherValute}
                        onChange={(e) => setOtherValute(e.target.value)}
                        className="w-[90px] rounded-md text-[20px] font-medium px-2 appearance-none outline-none"
                        style={{
                            backgroundImage: "url('/svg/income/USD.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="usd">USD</option>
                        <option value="sum">SUM</option>
                        <option value="evro">EVRO</option>
                    </select>
                </div>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                    />
                    <Image
                        src={pen}
                        width={16}
                        height={16}
                        alt="Редактировать"
                        className="absolute right-3 top-[20px] cursor-pointer"
                    />
                </div>
            </div>
            {/* Выберите услугу */}
            <div className="mt-10">
                <h3 className='text-[20px] font-bold'>Выберите услугу </h3>
                <div className="flex justify-between gap-x-5 mt-4">
                <select
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{
                            backgroundImage: "url('/svg/arrow_down.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="" selected disabled>Услуги </option>
                        <option value="сайт">Разработка сайта  </option>
                        <option value="telegram-bot">Разработка телеграмм  ботов </option>
                        <option value="smm">SMM</option>
                        <option value="reclama">Реклама </option>
                    </select>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Другое "
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        />
                        <Image
                            src={pen}
                            width={16}
                            height={16}
                            alt="Редактировать"
                            className="absolute right-3 top-[20px] cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {/* Укажите статус дохода */}
            <div className="mt-10">
                <h3 className='text-[20px] font-bold'>Укажите статус дохода </h3>
                <ul className="grid grid-cols-2 mt-5 gap-2">
                    <li className='bg-[#F5F2FF] rounded-[6px] px-3 py-4 text-[14px] font-medium'>
                        Предоплата
                    </li>
                    <li className='bg-[#F5F2FF] rounded-[6px] px-3 py-4 text-[14px] font-medium'>
                    Запланировано
                    </li>
                    <li className='bg-[#F5F2FF] rounded-[6px] px-3 py-4 text-[14px] font-medium'>
                    Финзайм
                    </li>
                    <li className='bg-[#F5F2FF] rounded-[6px] px-3 py-4 text-[14px] font-medium'>
                    Постоплата
                    </li>
                </ul>
            </div>
            {/* Введите дату */}
            <div className="mt-10">
                <h3 className='text-[20px] font-bold'>Введите дату </h3>
                <div className="flex justify-between items-center gap-x-4 mt-5">
                    <button onClick={setTodayDate} className='bg-[#F5F2FF] text-start rounded-[6px] px-3 py-4 text-[14px] font-medium w-full'>
                        Текущая дата 
                    </button>
                        <input
                            type="date"
                            value={date}
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500"
                        />                    
                </div>
            </div>
            {/* Напишите комментарий */}
            <div className="mt-10">
                <h3 className='text-[20px] font-bold'>Напишите комментарий </h3>
                <div className="mt-5">
                    <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Комментарий "
                                className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                            />
                            <Image
                                src={pen}
                                width={16}
                                height={16}
                                alt="Редактировать"
                                className="absolute right-3 top-[20px] cursor-pointer"
                            />
                    </div>
                    <button className='w-full rounded-md font-medium mt-5 px-2 py-[16px] bg-[#F5F2FF] text-sm flex justify-between items-center'>
                        <span className='flex gap-x-2'><Image src={document} alt='document'/> Загрузка файла</span> 
                        <Image src={download} alt='download'/>
                    </button>
                </div>
            </div>
            <button className='w-full text-center p-3 bg-[#7E49FF] rounded-[8px] text-white mt-10'>Сохранить все </button>
        </div>
    );
};

export default IncomeMain;