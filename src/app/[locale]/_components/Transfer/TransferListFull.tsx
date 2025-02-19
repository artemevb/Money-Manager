"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import arrowBack from '@/public/svg/clients/arrow_back.svg';
// import { FaExchangeAlt } from "react-icons/fa";
// import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import arrow_top_down from "@/public/svg/arrow_top_down.svg";
import logo from "@/public/images/transfer/logo.png";
import arrow_down_purple from "@/public/svg/arrow_down_purple.svg";
import card from "@/public/svg/main/card.svg";
import ModalCardSelection from "./ModalCardSelection";
import pen from '@/public/svg/pen.svg';
import download from '@/public/svg/downloaded_black.svg';
import document from '@/public/svg/doc.svg';
import { useMutation, useQuery } from "@tanstack/react-query";
import { cardUtils } from "@/src/app/utils/card.utils";
import { transactionUtils } from "@/src/app/utils/transaction.util";
import toast from "react-hot-toast";

const Transfer = () => {
  const [date, setDate] = useState("2024-10-26");
  const [comment, setComment] = useState("");
  const [checkedData, setCheckedData] = useState(false)
  const [file, setFile] = useState<File[]>([]);
  const [modalType, setModalType] = useState<"withdraw" | "deposit" | null>(null);
  const [selectedCard, setSelectedCard] = useState({
    withdraw: "9860 **** 1467",
    deposit: "Выберите карту",
    cardId: 0,
    cardType: "HUMO",
    monayType: "UZS"
  });
  const [selectFromCard, setSelectFromCard] = useState({
    deposit: "9860 **** 1467",
    cardId: 0,
    cardType: "HUMO",
    monayType: "UZS"
  });
  const router = useRouter();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const selectedFiles = Array.from(event.target.files)?.slice(0, 2); // Faqat 2 ta faylni olish
        setFile(selectedFiles);
    }
};
  const {data:availableCards} = useQuery({
    queryKey:['cards'],
    queryFn:cardUtils.getCard
  })
  const [firstCurrency, setFirstCurrency] = useState< {moneyType: null | string, amount:number}>({ moneyType: null, amount: 0 });
  const handleFirstChange = (field: string, value: string | number) => {
    setFirstCurrency((prev) => ({ ...prev, [field]: value }));
  };

  const addMOving = useMutation({
    mutationFn: transactionUtils.postMoving,
    onSuccess: () => {
      toast.success('Success a new moving')
    },
    onError: (err) => {
      toast.error('Error')
      console.log(err);      
    }
  })

  const handelAddMoving = () => {
    addMOving.mutate({
      transactionType:'MOVING',
      transactionDetails:[firstCurrency],
      fromCardId: selectedCard.cardId,
      toCardId: selectFromCard.cardId,
      transactionDate:date,
      comment:comment,
      files: file.length ? file : null,
    })
    console.log(addMOving.variables);    
  }

  const handleCardSelect = (cardNumber: string, cardId: number, cardType:string, monayType:string) => {
    if (modalType === "withdraw") {
      setSelectedCard((prev) => ({ ...prev, withdraw: cardNumber, cardId:cardId, cardType:cardType, monayType:monayType }));
    } else if (modalType === "deposit") {
      setSelectFromCard((prev) => ({ ...prev, deposit: cardNumber, cardId:cardId, cardType:cardType, monayType:monayType }));
    }
    setModalType(null);
  };

  return (
    <div className="mx-auto px-[16px] my-[30px]">
      <button
        onClick={() => router.back()}
        className="flex items-center text-[12px] text-[#303030] mb-5"
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
      <div className="flex items-center justify-between bg-[#F5F2FF] pt-[3px] px-[20px] rounded-2xl mb-[40px]">
        <span className="text-xl font-medium">Перемещение</span>
        {/* <FaExchangeAlt className="text-purple-500" /> */}
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
              <div className="text-[#303030] text-[12px]">{selectedCard.cardType}</div>
              <div className="text-[16px] font-semibold text-[#303030] whitespace-nowrap">
                {selectedCard.withdraw?.slice(0, 4) + '*'?.repeat(selectedCard.withdraw?.length - 8) + selectedCard.withdraw?.slice(-4)}            
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
        onClick={() => setModalType("deposit")}
      >
        <Image src={arrow_down_purple} alt="Карта" width={16} height={16} className="absolute right-5" />
        <div className="flex items-center gap-[16px] mt-2">
          <div className="rounded-full bg-[#F5F2FF] h-[50px] w-[50px] flex items-center justify-center">
            <Image src={card} alt="Карта" width={32} height={32} />
          </div>
          <div className="flex flex-col items-start">
            <div className="text-sm text-[#7E49FF] font-medium">Зачислить на</div>
            <span className="text-[#303030] text-[12px]">{selectFromCard.cardType}</span>
            <span className="text-[#303030] text-[12px]">{ selectFromCard.deposit?.slice(0, 4) + '*'?.repeat(selectFromCard.deposit?.length - 8) + selectFromCard.deposit?.slice(-4)}</span>
          </div>
        </div>
      </div>
      {selectedCard.cardId === selectFromCard.cardId && <span className="text-red-400 z-10 mt-2">Kartalar bir xil</span>}

      <div className="w-full flex flex-col justify-between items-start space-y-5 mt-10">
        <div className="w-full flex justify-between items-center">
          <p className='text-[20px] font-bold'>Введите сумму</p>
        </div>
        <div className="relative w-full">
          <input
            type="tel"
            onChange={(e) => handleFirstChange("amount", Number(e.target.value))}
            required
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
          <p className={`${firstCurrency.amount>=1000 || firstCurrency.amount==0 ?'hidden':'block'} text-red-500 text-[14px]`}>min: 1000 sum</p>
        </div>
      </div>

      {/* Выбор даты */}
      <div className="mt-[40px]">
        <label className="block text-[20px] font-bold mb-2">Введите дату</label>
        <div className="flex gap-2 items-center w-full">
          <button
            onClick={() => setDate(new Date().toISOString().split("T")[0])}
            className="px-[10px] py-[16px] w-full  text-[14px] bg-[#F5F2FF] rounded-[6px] font-medium flex justify-start"
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
      <label className="flex items-center relative cursor-pointer justify-between w-full px-[10px] py-[16px] bg-[#F5F2FF] rounded-[6px] text-[14px] mt-[40px]">
        <div className="flex items-center gap-2">
          <Image src={document} alt="Document Icon" width={16} height={16} />
          <span className="text-[#000] font-medium">Загрузка файла</span>
        </div>
        <input type="file" onChange={handleFileChange} accept=".png, .jpg, .jpeg .pdf .xlsx .doc .docx" className="w-full opacity-0 top-0 right-0 p-2 absolute h-full cursor-pointer" multiple/>
        <Image src={download} alt="Download Icon" width={16} height={16} />
      </label>
      <button onClick={() => setCheckedData(true)} className="w-full bg-[#7E49FF] text-white py-3 px-[16px] mt-10 rounded-md text-[16px] font-bold hover:bg-purple-600 transition">
        Сохранить все
      </button>
      {/* Секция транзакции */}
      {checkedData && <>
        <div className="p-5 border border-[#F5F2FF] rounded-2xl shadow-transfer space-y-4 mt-[40px]">
        <div className="text-2xl font-bold">Транзакция</div>
        <div className="flex flex-col gap-2">
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
            Тип транзакции: <span className="text-[16px] ml-2 font-medium"> Перемещение</span>
          </span>
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
            Валюта: {selectedCard.monayType}
          </span>
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
            Сумма транзакции: {firstCurrency.amount}
          </span>
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
            Дата транзакции: {date?date:'HET'}
          </span>
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
            Комментарий: {comment?comment:'HET'}
          </span>
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#6E3EF2] mr-2"></span>
            Файл транзакции: {file.length ? file[0]?.name : "НЕТ"}
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-10 font-bold">
        <button className="px-[19.5px] py-3 text-[#7E49FF] rounded-lg bg-[#ECE8FF] w-full text-[16px]">
          Редактировать
        </button>
        <button onClick={handelAddMoving} type="button" className="px-[37.5px] py-3 bg-[#7E49FF] text-white rounded-lg hover:bg-purple-700 w-full text-[16px]">
          Сохранить
        </button>
      </div>
      </>}
      
      
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
