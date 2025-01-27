import { useTranslations } from "next-intl";
import Image from "next/image";
import def from "@/public/images/card1.png";
import arrow_right_black from "@/public/svg/arrow_black.svg";
import Link from "next/link";

interface LocaleProps {
    locale: string;
}

export default function Blog({ locale }: LocaleProps) {
    const t = useTranslations("Main.Blog");

    return (
        <div className="relative w-full mx-auto max-w-[1720px] flex justify-center items-center max-4xl:px-[15px]">
            main
        </div >
    );
};
