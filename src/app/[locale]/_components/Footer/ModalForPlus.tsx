"use client";
import Image from "next/image";
import close from "@/public/svg/close.svg";
import Link from "next/link";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function CardModal({ isOpen, onClose, locale }: CardModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 h-full"
      onClick={onClose}
    >
      <div
        className="bg-white px-5 pb-[40px] pt-5 rounded-t-[20px] w-full relative h-full bottom-0 max-h-[223px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center">
          <hr className="w-[60px] h-[4px] bg-[#D9D9D9]" />
        </div>
        <button className="absolute right-[20px] top-[20px]" onClick={onClose}>
          <Image
            src={close}
            width={40}
            height={40}
            quality={100}
            alt="Close icon"
            className="h-full w-auto"
          />
        </button>
        <div className="text-[20px] font-medium flex flex-col gap-[15px] mt-[50px]">
          {/* Каждая ссылка вызывает onClose при клике */}
          <Link href={`/${locale}/income`} onClick={onClose}>
            Доходы
          </Link>
          <Link href={`/${locale}/expenses`} onClick={onClose}>
            Расходы
          </Link>
          <Link href={`/${locale}/transfer`} onClick={onClose}>
            Перемещение
          </Link>
        </div>
      </div>
    </div>
  );
}
