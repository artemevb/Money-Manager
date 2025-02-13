import Image from "next/image";
import { useEffect, useState } from "react";
import plus from "@/public/svg/plus_bold.svg";
import pen from '@/public/svg/income/pensel.svg'
interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function IncomePayModal({ handleClose, open }: ModalProps) {
    const [addMore, setAddMore] = useState(false)
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
                        <div className="flex items-center gap-x-3 justify-between mt-3">
                            <div className="border shadow px-5 py-3 rounded-[16px] w-full">
                                <p className="text-[#7E49FF] text-[15px]">От кого  </p>
                                <p className="text-[18px]">Банк </p>
                            </div>
                            <div className="border shadow px-5 py-3 rounded-[16px] w-full">
                                <p className="text-[#7E49FF] text-[15px]">От кого  </p>
                                <p className="text-[18px]">Клиент  </p>
                            </div>
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
                        {addMore && <div className="mt-10">
                            <div className="flex justify-between gap-x-2">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="firsName"
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
                                        name="firsName"
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
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Роль  "
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
                            <div className="relative w-full mt-3">
                                    <input
                                        type="tel"
                                        name="lastName"
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
                            <button className="w-full py-3 bg-[#7E49FF] text-white font-bold text-[16px] rounded-[8px] mt-3" type="submit">Сохранить  </button>
                        </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
