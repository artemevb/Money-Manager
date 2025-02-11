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

const Transfer = () => {
    const [date, setDate] = useState("2024-10-26");
    const [currency, setCurrency] = useState("USD");
    const [comment, setComment] = useState("");
    const [amount, setAmount] = useState("");

    const availableCurrencies = ["USD", "EUR", "UZS"];
    const [transactionDetails] = useState({
        type: "Расходы",
        currency: "Карта суммы 1",
        amount: "3.0 сум",
        transactionDate: "2025-01-09",
        category: "Реклама",
        comment: "НЕТ",
        file: "НЕТ",
    });

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Категория расходов");

    const [modalType, setModalType] = useState<"withdraw" | "deposit" | null>(null);
    const [selectedCard, setSelectedCard] = useState({
        withdraw: "9860 **** 1467",
        deposit: "Категория расходов ",
    });
    const router = useRouter();

    const availableCards = [
        { id: 1, type: "Uzcard", balance: "1 870.20 UZS", cardNumber: "9860 **** 1467" },
        { id: 2, type: "Uzcard", balance: "2 340.10 UZS", cardNumber: "1234 **** 5678" },
        { id: 3, type: "Uzcard", balance: "1 500.00 UZS", cardNumber: "8765 **** 4321" },
    ];

    const handleCardSelect = (cardNumber: string) => {
        if (modalType === "withdraw") {
            setSelectedCard((prev) => ({ ...prev, withdraw: cardNumber }));
        } else if (modalType === "deposit") {
            setSelectedCard((prev) => ({ ...prev, deposit: cardNumber }));
        }
        setModalType(null);
    };

    return (
        <div className="max-w-sm mx-auto px-[16px] my-[30px]">
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
                            <div className="text-[#303030] text-[12px]">Uzcard</div>
                            <div className="text-[16px] font-semibold text-[#303030] whitespace-nowrap">
                                {selectedCard.withdraw}
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
                        <span className="text-[#303030] text-[12px]">{selectedCategory}</span>
                    </div>
                </div>
            </div>




            <div className="mt-[20px]">
                <label className="block text-lg font-bold mb-2 text-[#000]">
                    Введите сумму
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Введите сумму"
                        className="w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px] text-[#000]"
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
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
            <div className="flex items-center justify-between w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px] mt-[40px]">
                <div className="flex items-center gap-2">
                    <Image src={document} alt="Document Icon" width={16} height={16} />
                    <span className="text-[#000] font-medium">Загрузка файла</span>
                </div>
                <Image src={download} alt="Download Icon" width={16} height={16} />
            </div>
            <button className="w-full bg-[#7E49FF] text-white py-3 px-[16px] mt-10 rounded-md text-[16px] font-bold hover:bg-purple-600 transition">
                Сохранить все
            </button>
            {/* Секция транзакции */}
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
            <ExpensesCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onSelect={(category) => setSelectedCategory(category)}
            />
            <ModalCardSelection
                isOpen={!!modalType}
                onClose={() => setModalType(null)}
                onSelect={handleCardSelect}
                title={modalType === "withdraw" ? "Списать с" : "Зачислить на"}
                availableCards={availableCards}
                selectedCardNumber={
                    modalType === "withdraw" ? selectedCard.withdraw : selectedCard.deposit
                }
            />
        </div>
    );
};

export default Transfer;
