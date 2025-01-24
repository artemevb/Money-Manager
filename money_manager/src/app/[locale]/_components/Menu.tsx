'use client';
import { useEffect, useRef, ChangeEvent, useTransition } from "react";
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
// import close from "@/public/svg/tools/close-black.svg";
import arrow_black from "@/public/svg/arrow_black.svg";
import { NavItem } from "./Header/NavItem";
import { useTranslations } from 'next-intl';
// import axios from 'axios';

interface MenuProps {
    menu: boolean;
    closeMenu: () => void;
    navOptions: NavItem[];
    locale: string;
}

const Menu: React.FC<MenuProps> = ({ menu, closeMenu, navOptions, locale }) => {
    const t = useTranslations('Header');
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                // If you plan to use the menu for a language switcher, uncomment and use setLanguageMenu
                // setLanguageMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div
            className={`fixed z-[9999] top-0 right-0 w-full bg-white h-full shadow-md ${menu ? "animate-slideInFromRight" : "transform translate-x-full"} transition-transform duration-300 ease-in-out`}
        >
            {/* Header with Language Switcher and Close Button */}
            <div className="border-b py-4 flex">
                <div className="w-full flex justify-between mx-4">



                </div>
                <nav className="flex flex-col mt-2 ">
                    {/* Other Navigation Items */}
                    {navOptions.map((item, index) => (
                        <Link
                            key={index}
                            onClick={() => {
                                closeMenu();
                                router.push(`/${locale}/${item.slug}`);
                            }}
                            href={`/${locale}/${item.slug}`}
                            className="block border-b py-4 px-6 flex justify-between items-center text-[20px] font-semibold"
                        >
                            <span>{item.title}</span>
                            <Image
                                src={arrow_black}
                                alt="Arrow"
                                width={20}
                                height={20}
                                className="w-[20px] h-[20px]"
                            />
                        </Link>
                    ))}
                </nav >
            </div >
        </div >
    );
};

export default Menu;
