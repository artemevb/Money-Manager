"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import arrowBack from '@/public/svg/clients/arrow_back.svg';
// import { FaExchangeAlt } from "react-icons/fa";
// import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import arrow_top_down from "@/public/svg/arrow_top_down.svg";
import logo from "@/public/images/expenses/logo.png";
import arrow_down_purple from "@/public/svg/arrow_down_purple.svg";
import card from "@/public/svg/main/card.svg";
import ModalCardSelection from "./ExpensesCardSelection";
import pen from '@/public/svg/pen.svg';
import download from '@/public/svg/downloaded_black.svg';
import document from '@/public/svg/doc.svg';
import ExpensesCategoryModal from "./ExpensesCategoryModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cardUtils } from "@/src/app/utils/card.utils";
import plus from "@/public/svg/plus_bold.svg";
import { transactionUtils } from "@/src/app/utils/transaction.util";
import toast from "react-hot-toast";


const Transfer = () => {
    const [date, setDate] = useState("2024-10-26");
    const [comment, setComment] = useState("");
    const [addPay, setAddPay] = useState(false)
    const [checkedData, setCheckedData] = useState(false)
    const [file, setFile] = useState<File[]>([]);
    const availableCurrencies = ["USD", "EUR", "UZS"];
    const queryClient = useQueryClient()
    const router = useRouter();
    const [firstCurrency, setFirstCurrency] = useState({ moneyType: "USD", amount: 0 });
    const [secondCurrency, setSecondCurrency] = useState<{ moneyType: string; amount: number } | null>({ moneyType: '', amount: 0 });
    const handleFirstChange = (field: string, value: string | number) => {
        setFirstCurrency((prev) => ({ ...prev, [field]: value }));
    };
    const handleSecondChange = (field: string, value: string | number) => {
        setSecondCurrency((prev) => prev ? { ...prev, [field]: value } : { moneyType: '', amount: 0 });
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files)?.slice(0, 2); // Faqat 2 ta faylni olish
            setFile(selectedFiles);
        }
    };

    const { data: availableCards } = useQuery({
        queryKey: ['cards'],
        queryFn: cardUtils.getCard
    })
    

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({
        name: "Категория расходов",
        id: 0
    });

    const [modalType, setModalType] = useState<"withdraw" | "deposit" | "id" | "cardType" | null>(null);
    const [selectedCard, setSelectedCard] = useState({
        withdraw: availableCards?.data?.cards[0]?.cardNumber ? availableCards?.data?.cards[0]?.cardNumber : "9860 **** 1467",
        deposit: "Категория расходов ",
        id: availableCards?.data?.cards?.length &&  availableCards?.data?.cards[0]?.id,
        cardType: availableCards?.data?.cards?.length &&  availableCards?.data?.cards[0]?.cardType
    });    

   console.log(availableCards?.data?.cards[0]?.cardNumber);
   
    const transactionDetailsData = secondCurrency?.amount ? [{ moneyType: firstCurrency.moneyType, amount: firstCurrency.amount }, { moneyType: secondCurrency.moneyType, amount: secondCurrency.amount }] : [{ moneyType: firstCurrency.moneyType, amount: firstCurrency.amount }]

    const expensesMutate = useMutation({
        mutationFn: transactionUtils.postConsumption,
        onSuccess: () => {
            toast.success('Succes new moving')
            queryClient.invalidateQueries({ queryKey: ['transactios'] })
        },
        onError: (err) => {
            console.log(err);
            toast.error('Something went wrong')
        }
    })
    
    const handleExpenses = () => {
        expensesMutate.mutate({
            transactionType: "CONSUMPTION",
            fromCardId: selectedCard.id,
            toCategoryConsumptionId: selectedCategory.id,
            files: file?.length ? file : null,
            transactionDate: date,
            comment: comment,
            transactionDetails: transactionDetailsData,
        })
    }
    const handleCardSelect = (cardNumber: string, cardId: number, cardType:string) => {
        if (modalType === "withdraw") {
            setSelectedCard((prev) => ({ ...prev, withdraw: cardNumber,cardType:cardType, id: cardId }));
        } else if (modalType === "deposit") {
            setSelectedCard((prev) => ({ ...prev, deposit: cardNumber }));
        }
        setModalType(null);
    };
    return (
        <div className="px-[16px] my-[30px]">
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-[12px] text-[#303030] mb-5"
            >
                <Image
                    src={arrowBack}
                    width={16}
                    height={16}
                    quality={100}
                    alt="Назад"
                    className="mr-1"
                />
                Назад
            </button>
            <div className="flex items-center justify-between bg-[#ECFDF5] pt-[3px] px-[20px] rounded-2xl mb-[40px]">
                <span className="text-xl font-medium">Расход</span>
                <Image
                    src={logo}
                    height={60}
                    width={60}
                    quality={100}
                    alt="close"
                    className="w-full h-full max-w-[60px]"
                />
            </div>

            {/* Блок списания */}
            <div
                className="p-4 rounded-2xl border border-[#F5F2FF] shadow-transfer mb-[-10px] relative cursor-pointer"
                onClick={() => setModalType("withdraw")}
            >
                <Image src={arrow_down_purple} alt="Карта" width={16} height={16} className="absolute right-5" />
                <div className="flex justify-between items-center mt-2 w-full">
                    <div className="w-full flex gap-[15px]">
                        <div className="rounded-full bg-[#F5F2FF] h-[50px] w-[50px] flex items-center justify-center">
                            <Image src={card} alt="Карта" width={32} height={32} />
                        </div>
                        <div>
                            <div className="text-sm text-[#7E49FF] font-medium">Списать с</div>
                            <div className="text-[#303030] text-[12px]">{selectedCard?.cardType}</div>
                            <div className="text-[16px] font-semibold text-[#303030] whitespace-nowrap">
                                {selectedCard.withdraw?.slice(0, 4)+ '*'?.repeat(selectedCard.withdraw?.length - 8) + selectedCard?.withdraw?.slice(-4)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Кнопка обмена */}
            <div className="flex justify-end mr-[60px] z-[10]">
                <button className="p-2 bg-[#7E49FF] text-white rounded-full shadow-md h-[40px] w-[40px] flex justify-center items-center z-[10]">
                    <span className="text-xl z-[10]">
                        <Image src={arrow_top_down} width={16} height={16} alt="Обмен" />
                    </span>
                </button>
            </div>

            {/* Блок зачисления */}
            <div
                className="pt-[10px] px-[10px] pb-[20px] rounded-2xl border border-[#F5F2FF] shadow-transfer mt-[-10px] relative cursor-pointer"
                onClick={() => setCategoryModalOpen(true)}
            >
                <Image src={arrow_down_purple} alt="Карта" width={16} height={16} className="absolute right-5" />
                <div className="flex items-center gap-[16px] mt-2">
                    <div className="rounded-full bg-[#F5F2FF] h-[50px] w-[50px] flex items-center justify-center">
                        <Image src={card} alt="Карта" width={32} height={32} />
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="text-sm text-[#7E49FF] font-medium">Куда</div>
                        <span className="text-[#303030] text-[12px]">{selectedCategory.name}</span>
                    </div>
                </div>
            </div>
            {/* Введите сумму */}
            <div className="mt-[20px]">
                <label className="block text-lg font-bold mb-2 text-[#000]">
                    Введите сумму
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        onChange={(e) => handleFirstChange("amount", e.target.value)}
                        placeholder="Введите сумму"
                        className="w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px] text-[#000]"
                    />
                    <select
                        value={firstCurrency.moneyType}
                        onChange={(e) => handleFirstChange("moneyType", e.target.value)}
                        className="bg-[#F5F2FF] px-[10px] py-[16px] rounded-[6px] text-[14px] text-[#000]"
                    >
                        {availableCurrencies.map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/*  Добавить еще button */}
            <div className="flex justify-end items-center mt-10">
                <button
                    type='button'
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
                        onChange={(e) => handleSecondChange("moneyType", e.target.value)}
                        className="w-[90px] rounded-md text-[20px] font-medium px-2 appearance-none outline-none"
                        style={{
                            backgroundImage: "url('/svg/income/USD.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                        }}
                    >
                        <option value="USD">USD</option>
                        <option value="UZS">SUM</option>
                        <option value="EVRO">EVRO</option>
                    </select>
                </div>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        onChange={(e) => handleSecondChange("amount", Number(e.target.value))}
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
            {/* Выбор даты */}
            <div className="mt-[40px]">
                <label className="block text-[20px] font-bold mb-2">Введите дату</label>
                <div className="flex gap-2 items-center w-full">
                    <button
                        onClick={() => setDate(new Date().toISOString().split("T")[0])}
                        className="px-[10px] py-[16px] w-full  text-[14px] bg-[#F5F2FF] rounded-[6px] font-medium flex justify-start "
                    >
                        Текущая дата
                    </button>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px]"
                    />
                </div>
            </div>

            {/* Секция комментария */}
            <div className="mt-[40px]">
                <label className="block text-lg font-bold mb-2 text-[#000]">
                    Напишите комментарий
                </label>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px] text-[#000]"
                    placeholder="Комментарий"
                />
                <Image src={pen} alt="Pen Icon" width={16} height={16} className="bottom-[35px] ml-auto right-[10px] relative" />
            </div>

            {/* Секция загрузки файла */}
            <label className="flex items-center relative justify-between cursor-pointer w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px] mt-[40px]">
                <div className="flex items-center gap-2">
                    <Image src={document} alt="Document Icon" width={16} height={16} />
                    <span className="text-[#000] font-medium">Загрузка файла</span>
                </div>
                <input type="file" onChange={handleFileChange} accept=".png, .jpg, .jpeg .pdf .xlsx .doc .docx" className="w-full opacity-0 top-0 right-0 p-2 absolute h-full cursor-pointer" multiple/>
                <Image src={download} alt="Download Icon" width={16} height={16} />
            </label>

            <button onClick={()=>setCheckedData(true)} className="w-full bg-[#7E49FF] text-white py-3 px-[16px] mt-10 rounded-md text-[16px] font-bold hover:bg-purple-600 transition">
                Сохранить все
            </button>
            {/* Секция транзакции */}
            {checkedData && <>
                <div className="p-5 border border-[#F5F2FF] rounded-2xl shadow-transfer space-y-4 mt-[40px]">
                    <div className="text-2xl font-bold">Транзакция</div>
                    <div className="flex flex-col gap-2">
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Тип транзакции: Расходы
                        </span>
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Валюта: {transactionDetailsData[0].moneyType}
                        </span>
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Сумма транзакции: {transactionDetailsData[0].amount} {transactionDetailsData[0].moneyType}
                        </span>
                        {secondCurrency?.amount ? <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Сумма транзакции: {transactionDetailsData[1].amount} <span className='lowercase ml-2'>{transactionDetailsData[1].moneyType}</span>
                        </span> : ''}
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Дата транзакции: {date ? date : "НЕТ"}
                        </span>
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Файл транзакции: {file?.length ? file[0]?.name : "НЕТ"}
                        </span>
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Категория расхода: НЕТ
                        </span>
                        <span className="font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
                            Комментарий: {comment ? comment : "НЕТ"}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 mt-10 font-bold">
                    <button className="px-[19.5px] py-3 text-[#7E49FF] rounded-lg bg-[#ECE8FF] w-full text-[16px]">
                        Редактировать
                    </button>
                    <button type="button" onClick={handleExpenses} className="px-[37.5px] py-3 bg-[#7E49FF] text-white rounded-lg hover:bg-purple-700 w-full text-[16px]">
                        Сохранить
                    </button>
                </div>
            </>}
            <ExpensesCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onSelect={(name:string, id:number) => setSelectedCategory({name,id})}
            />
            <ModalCardSelection
                isOpen={!!modalType}
                onClose={() => setModalType(null)}
                onSelect={handleCardSelect}
                title={modalType === "withdraw" ? "Списать с" : "Зачислить на"}
                availableCards={availableCards?.data?.cards}
                selectedCardNumber={
                    modalType === "withdraw" ? selectedCard.withdraw : selectedCard.deposit
                }
            />
        </div>
    );
};

export default Transfer;
