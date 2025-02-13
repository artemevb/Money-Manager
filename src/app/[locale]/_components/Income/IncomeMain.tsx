"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import userIcon from '@/public/svg/income/user.svg'
import cardIcon from '@/public/svg/income/card.svg'
import bottonRow from '@/public/svg/income/botton-arrow.svg'
import pen from '@/public/svg/income/pensel.svg'
import plus from "@/public/svg/plus_bold.svg";
import document from '@/public/svg/income/documnet.svg'
import download from '@/public/svg/income/download.svg'
import IncomePayModal from './IncomePayMOdal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { serviceUtils } from '@/src/app/utils/service.utils';
import { serviseType } from '../Main/types';
import { transactionUtils } from '@/src/app/utils/transaction.util';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import IncomeHead from './IncomeHead';
import { clientUtils } from '@/src/app/utils/client.utils';
import SlelectCardModal from './slelectCardModal';
import { cardUtils } from '@/src/app/utils/card.utils';
import { AddServiceModal } from '../Services/AddServiceModal';
import AddService from './addService';

const IncomeMain = () => {
    const { register, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState(null);
    const [openCartModal, setOpenCardModal] = useState(false)
    const [openServiceModal, setOpenServiceModal] = useState(false)
    const [selectCard, setSelectCard] = useState<number>(0)
    const [selectClient, setSelectClient] = useState<number>(0)
    const [addPay, setAddPay] = useState(false)
    const [otherValute, setOtherValute] = useState('usd')
    const [date, setDate] = useState("");
    const [open, setOpen] = useState(false)
    const setTodayDate = () => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    };
    const [transactionDetails] = useState({
        type: "Расходы",
        currency: "Карта суммы 1",
        amount: "3.0 сум",
        transactionDate: "2025-01-09",
        category: "Реклама",
        comment: "НЕТ",
        file: "НЕТ",
    });
    // servise get
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: serviceUtils.getService
    })
    console.log(services);
    
    // client get
    const { data: clients } = useQuery({
        queryKey: ['clients'],
        queryFn: clientUtils.getClientAll
    })
    // card get
    const { data: cards } = useQuery({
        queryKey: ['cards'],
        queryFn: cardUtils.getCard
    })
    // const createIncome = useMutation({
    //     mutationFn: transactionUtils.postTransaction,
    //     onSuccess: () => {
    //         toast.success('Succuse income')
    //     },
    //     onError: (err) => {
    //         console.log(err);            
    //     }
    // })
    // const handleIncome = (e) => {
    //     e.preventDefault()
    //     // createIncome.mutate()
    // }
    return (
        <div className='p-6 mb-[26px] w-full mx-auto'>
            <IncomeHead />
            <IncomePayModal selectClient={(id) => setSelectClient(id)} open={open} handleClose={() => setOpen(false)} />
            <SlelectCardModal selectCard={(id) => setSelectCard(id)} open={openCartModal} handleClose={() => setOpenCardModal(false)} />
            <div className="flex flex-col space-y-4">
                {clients?.data &&
                <div onClick={() => setOpen(true)} className="mt-10 cursor-pointer rounded-[16px] px-3 py-5 text-center shadow-md border text-[#7E49FF] flex justify-between items-start">
                    <div className="flex items-center gap-x-2">
                        <Image className='p-2 bg-[#F5F2FF] rounded-full' width={50} height={50} src={userIcon} alt='user a' />
                        <div className="">
                            <p className="text-[14px] text-start pb-[5px]">От кого  </p>
                            <p className="text-[14px] text-black text-start">{clients?.data[selectClient]?.firstName} </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                        <Image src={bottonRow} alt='income' />
                        <p className='text-black'>{clients?.data[selectClient]?.phone}</p>
                    </div>
                </div>    
}                   
                {cards?.data?.cards?.length &&
                    <div onClick={() => setOpenCardModal(true)} className="mt-10 cursor-pointer rounded-[16px] px-3 py-5 text-center shadow-md border text-[#7E49FF] flex justify-between items-start">
                    <div className="flex items-center gap-x-2">
                        <Image className='p-2 bg-[#F5F2FF] rounded-full' width={50} height={50} src={cardIcon} alt='user a' />
                        <div className="">
                            <p className="text-[14px] text-start pb-[5px]">{cards?.data?.cards[selectCard]?.cardType} </p>
                            <p className="text-[14px] text-black text-start">{cards?.data?.cards[selectCard]?.balance.toLocaleString()}  </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                        <Image src={bottonRow} alt='income' />
                        <p className='text-black'>{cards?.data?.cards[selectCard]?.cardNumber}</p>
                    </div>
                </div>
                }
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
            <div className={`${addPay ? 'flex' : 'hidden'} w-full flex-col justify-between items-start space-y-5 mt-10`}>
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
                        className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10 appearance-none"
                        style={{
                            backgroundImage: "url('/svg/arrow_down.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="" selected disabled>Услуги </option>
                        {services?.data && services?.data.map((el: serviseType) => (
                            <option key={el.id} value={el.id}>{el.name} </option>
                        ))}
                    </select>
                    <div onClick={() => setOpenServiceModal(true)} className="relative w-full">
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
                <AddService open={openServiceModal} handleClose={() => setOpenServiceModal(false)} />

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
                        <span className='flex gap-x-2'><Image src={document} alt='document' /> Загрузка файла</span>
                        <Image src={download} alt='download' />
                    </button>
                </div>
            </div>
            <button className='w-full text-center p-3 bg-[#7E49FF] rounded-[8px] text-white mt-10'>Сохранить все </button>
            <div className="p-5 border border-[#F5F2FF] rounded-2xl shadow-transfer space-y-4 mt-[40px]">
                <div className="text-2xl font-bold">Транзакция</div>
                <div className="flex flex-col gap-2">
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Тип транзакции: {transactionDetails.type}
                    </span>
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Валюта: {transactionDetails.currency}
                    </span>
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Сумма транзакции: {transactionDetails.amount}
                    </span>
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Дата транзакции: {transactionDetails.transactionDate}
                    </span>
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Файл транзакции: {transactionDetails.file}
                    </span>
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Категория расхода: {transactionDetails.category}
                    </span>
                    <span className="font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                        Комментарий: {transactionDetails.comment}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 mt-10 font-bold">
                <button className="px-[19.5px] py-3 text-[#7E49FF] rounded-lg bg-[#ECE8FF] w-full text-[16px]">
                    Редактировать
                </button>
                <button className="px-[37.5px] py-3 bg-[#7E49FF] text-white rounded-lg hover:bg-purple-700 w-full text-[16px]">
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default IncomeMain;