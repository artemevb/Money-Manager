'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import userIcon from '@/public/svg/income/user.svg'
import bottonRow from '@/public/svg/income/botton-arrow.svg'
import plus from "@/public/svg/plus_bold.svg";
import pen from '@/public/svg/income/pensel.svg'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientUtils } from "@/src/app/utils/client.utils";
import { clietnType, serviseType } from "../Main/types";
import { serviceUtils } from "@/src/app/utils/service.utils";
import toast from "react-hot-toast";
interface ModalProps {
    open: boolean;
    handleClose: () => void;
    selectClient: (id:number) => void
}

export default function IncomePayModal({ handleClose, open, selectClient }: ModalProps) {
    const [addMore, setAddMore] = useState(false)
    const queryClient = useQueryClient()
    const formRef = useRef<HTMLDivElement>(null);
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
    const {data:clients} = useQuery({
        queryKey:['clients'],
        queryFn:clientUtils.getClientAll
    })
    const {data:services} = useQuery({
        queryKey:['services'],
        queryFn:serviceUtils.getService
    })
    const createClient = useMutation({
        mutationFn: clientUtils.postClient,
        onSuccess: () => {
            toast.success('Success new client')
            queryClient.invalidateQueries({queryKey: ['clients']})
            setAddMore(false)
            handleClose()
        },
        onError: (err) => {
            console.log(err);           
            toast.error('Something went wrong') 
        }
    })
    const handleAddClient = () => {
        if (!formRef.current) return;
    
        const firstName = (formRef.current.querySelector("[name=firstName]") as HTMLInputElement)?.value;
        const lastName = (formRef.current.querySelector("[name=lastName]") as HTMLInputElement)?.value;
        const fatherName = (formRef.current.querySelector("[name=fatherName]") as HTMLInputElement)?.value;
        const phone = (formRef.current.querySelector("[name=phone]") as HTMLInputElement)?.value;
        const serviceTypeId = (formRef.current.querySelector("[name=service]") as HTMLSelectElement)?.value;
    
        createClient.mutate({
            firstName,
            lastName,
            fatherName,
            phone,
            serviceTypeId: Number(serviceTypeId),
            status: "ACTUAL"
        });
    };
    const handleSlelectClient = (index:number) => {
        selectClient(index)
        handleClose()
    }
    return (
        <div>
            {open && (
                <div
                    className="fixed inset-0 flex items-center h-screen justify-center bg-black/50 backdrop-blur-sm z-20"
                    onClick={handleClose}
                >
                    <div
                        className="bg-white rounded-2xl p-6 w-[95%] max-w-md shadow-xl transform transition-all scale-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold">От кого </h2>
                        <div className="flex flex-col items-center justify-between space-y-2 mt-3">
                            {/* <div className="border shadow px-5 py-3 rounded-[16px] w-full">
                                <p className="text-[#7E49FF] text-[15px]">От кого  </p>
                                <p className="text-[18px]">Банк </p>
                            </div>
                            <div className="border shadow px-5 py-3 rounded-[16px] w-full">
                                <p className="text-[#7E49FF] text-[15px]">От кого  </p>
                                <p className="text-[18px]">Клиент  </p>
                            </div> */}
                            {
                                clients?.data?.length && clients.data.map((el: clietnType, i:number) => (
                                    <div key={Math.random()} onClick={() => handleSlelectClient(i)} className="w-full cursor-pointer rounded-[16px] px-3 py-5 text-center shadow-md border text-[#7E49FF] flex justify-between items-start">
                                        <div className="flex items-center gap-x-2">
                                            <Image className='p-2 bg-[#F5F2FF] rounded-full' width={50} height={50} src={userIcon} alt='user a' />
                                            <div className="">
                                                <p className="text-[14px] text-start pb-[5px]">От кого  </p>
                                                <p className="text-[14px] text-black text-start">{el.firstName} </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-end">
                                            <Image src={bottonRow} alt='income' />
                                            <p className='text-black'>{el.phone}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {!addMore && <button
                            onClick={() => setAddMore(true)}
                            className="flex items-center ml-auto mt-3 gap-2 rounded-lg bg-[#7E49FF] px-3 py-2 text-sm font-bold text-white hover:bg-[#8455fc]"
                        >
                            Добавить еще
                            <Image
                                src={plus}
                                width={24}
                                height={24}
                                alt="Plus icon"
                                className="h-5 w-auto"
                            />
                        </button>}
                        {addMore && <div ref={formRef} className="mt-10">
                            <div className="flex justify-between gap-x-2">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Имя  "
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
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Фамилия  "
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
                            <div className="flex justify-between gap-x-2 mt-3">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="fatherName"
                                        placeholder="Очество    "
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
                                <div className="relative w-full">
                                    <select
                                        name="service"
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
                                </div>
                            </div>
                            <div className="relative w-full mt-3">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Номер телефона   "
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
                            <button className="w-full py-3 bg-[#7E49FF] text-white font-bold text-[16px] rounded-[8px] mt-3" type="button" onClick={handleAddClient} >Сохранить  </button>
                        </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
