"use client";
// import resultLogo from "@/public/svg/footer/result-logo.png";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import Image from "next/image";
// import axios from 'axios';

interface LocaleProps {
  locale: string;
}

export default function Footer({ locale }: LocaleProps) {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-darkOverlay w-full pt-[30px] border_radius_footer xl:pt-[120px]">
      <div className="w-full max-w-[1440px] flex flex-col gap-[15px] mx-auto">
        <div className="w-full flex justify-between flex-col gap-[15px] px-[25px]">
          <div className="lg:w-1/2 xl:max-w-[609px] w-full flex max-mdx:gap-5  border-x border-[#5A5A5A] h-[179px] xl:h-[269px]">
            <div className="flex-1 flex items-center justify-center border-r border-[#5A5A5A]">
              <div className="flex flex-col text-left text-[16px] mdx:text-[18px] xl:text-[20px] gap-[20px] mdx:gap-[10px] text-[#FFFFFF] font-medium xl:max-w-[110px] xl:gap-[30px]">
                {/* <Link href={`/${locale}/services`} className="hover:text-[#B3B3B3]">{t('services')}</Link> */}
                <Link href={`/${locale}/about`} className="hover:text-[#B3B3B3]">{t('aboutUs')}</Link>
                <Link href={`/${locale}/cases`} className="hover:text-[#B3B3B3]">{t('cases')}</Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col text-left text-[16px] mdx:text-[18px] xl:text-[20px] gap-[20px] mdx:gap-[10px] text-[#FFFFFF] font-medium xl:max-w-[163px] xl:gap-[30px]">
                <Link href={`/${locale}/blog`} className="hover:text-[#B3B3B3]">{t('blog')}</Link>
                <Link href={`/#contacts`} className="hover:text-[#B3B3B3]">{t('contacts')}</Link>
                {/* <Link href={`/${locale}/marketing`} className="hover:text-[#B3B3B3]">{t('marketing')}</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}
