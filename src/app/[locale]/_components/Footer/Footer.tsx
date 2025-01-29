"use client";
// import resultLogo from "@/public/svg/footer/result-logo.png";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import home from "@/public/svg/footer/home.svg";
import reports from "@/public/svg/footer/reports.svg";
import plus from "@/public/svg/footer/plus.svg";
import clients from "@/public/svg/footer/clients.svg";
import services from "@/public/svg/footer/services.svg";
// import axios from 'axios';

interface LocaleProps {
  locale: string;
}

export default function Footer({ locale }: LocaleProps) {
  const t = useTranslations('Footer');

  return (
    <footer className=" w-full pt-[8px]  border-t">
      <div className="w-full max-w-[1440px] flex flex-col gap-[15px] mx-auto ">
        <div className="w-full flex justify-between flex-row gap-[15px] px-[25px] relative font-semibold">
          <Link href={`/`} className="hover:text-[#B3B3B3] text-[12px] flex items-center flex-col gap-[8px]">
            <Image
              src={home}
              height={100}
              width={100}
              alt="burger-menu icon"
              className="w-[24px] h-[24px]"
            />
            {t('main')}</Link>
          <Link href={`/${locale}/reports`} className="hover:text-[#B3B3B3] text-[12px] flex items-center flex-col gap-[8px]">
            <Image
              src={reports}
              height={100}
              width={100}
              alt="burger-menu icon"
              className="w-[24px] h-[24px]"
            />
            {t('reports')}</Link>

          <Link
            href={`/${locale}/`}
            className="bg-[#7E49FF] hover:bg-[#8457f7] rounded-full flex justify-center items-center w-[50px] h-[50px] relative -top-[18px]"
          >
            <Image
              src={plus}
              height={100}
              width={100}
              alt="burger-menu icon"
              className="w-[24px] h-[24px]"
            />
          </Link>


          <Link href={`/${locale}/clients`} className="hover:text-[#B3B3B3] text-[12px] flex items-center flex-col gap-[8px]">
            <Image
              src={clients}
              height={100}
              width={100}
              alt="burger-menu icon"
              className="w-[24px] h-[24px]"
            />
            {t('clients')}</Link>
          <Link href={`/${locale}/services`} className="hover:text-[#B3B3B3] text-[12px] flex items-center flex-col gap-[8px]">
            <Image
              src={services}
              height={100}
              width={100}
              alt="burger-menu icon"
              className="w-[24px] h-[24px]"
            />
            {t('services')}</Link>

        </div>
      </div>
    </footer >
  );
}
