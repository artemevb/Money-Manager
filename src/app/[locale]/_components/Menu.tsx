'use client';
import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import close from "@/public/svg/close.svg";

export interface NavItem {
    title: string;
    slug: string;
}

interface MenuProps {
    menu: boolean;
    closeMenu: () => void;
    navOptions: NavItem[];
    locale: string;
}

const Menu: React.FC<MenuProps> = ({ menu, closeMenu, navOptions, locale }) => {
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, closeMenu]);

    return (
        <>
            {/* Overlay для затемнения */}
            {menu && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity duration-300 ease-in-out"
                    onClick={closeMenu} // Закрыть меню при клике на overlay
                />
            )}

            {/* Само меню */}
            <div
                className={`fixed z-[9999] top-0 right-0 w-[86%] bg-white h-full shadow-md ${menu ? "animate-slideInFromRight" : "transform translate-x-full"
                    } transition-transform p-[20px] duration-300 ease-in-out`}
                ref={menuRef} // Привязка рефа для клика вне меню
            >
                <button
                    className="w-full flex justify-end"
                    onClick={closeMenu} // Вызов closeMenu при клике на кнопку
                >
                    <Image
                        src={close}
                        height={24}
                        width={24}
                        quality={100}
                        alt="close"
                        className="w-full h-full max-w-[24px]"
                    />
                </button>
                <nav className="flex flex-col mt-2 ">
                    {navOptions.map((item, index) => (
                        <Link
                            key={index}
                            onClick={() => {
                                closeMenu();
                                router.push(`/${locale}/${item.slug}`);
                            }}
                            href={`/${locale}/${item.slug}`}
                            className="w-full py-[10px] px-6 flex justify-between items-center text-[20px] font-medium"
                        >
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav >
            </div >
        </>
    );
};

export default Menu;