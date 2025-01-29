'use client';
import { useState, useTransition, useEffect, useRef } from "react";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Menu from "../Menu";
import Image from "next/image";
import burgerMenu from "@/public/svg/burger-menu.svg";
import autorization from "@/public/svg/autorization_button.svg";
import { useTranslations } from "next-intl";
// import Link from "next/link";
// import axios from 'axios';

interface NavItem {
  title: string;
  slug: string;
}

interface NavigationProps {
  navOptions: NavItem[];
  locale: string;
}

const LocalSwitcher: React.FC<NavigationProps> = ({ navOptions, locale }) => {
  const t = useTranslations('Tools');
  const [menu, setMenu] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const localeDisplay: { [key: string]: string } = {
    ru: 'Ру',
    uz: 'O`z',
  };

  const handleOpenMenu = () => {
    setMenu(true);
  };

  const handleCloseMenu = () => {
    setMenu(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLanguageSelect = (nextLocale: string) => {
    setDropdownOpen(false);
    startTransition(() => {
      const segments = pathname.split('/');
      if (['ru', 'uz'].includes(segments[1])) {
        segments[1] = nextLocale;
      } else {
        segments.splice(1, 0, nextLocale);
      }
      const newPath = segments.join('/') || '/';
      router.replace(newPath);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-[12px]">
      <div className="h-full items-center flex gap-[8px]">
        <button
          className='flex items-center text-[14px] font-semibold border border-[#ECE8FF] rounded-[8px] focus:outline-none px-[14px] py-[9px] gap-[4px] bg-[#7E49FF] text-white'>
          <p>{t('autorization')}</p>
          <Image
            src={autorization}
            height={100}
            width={100}
            alt="burger-menu icon"
            className="w-[16px] h-[16px]"
          />
        </button>


        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='flex items-center text-[16px] font-semibold border border-[#ECE8FF] rounded-[8px] focus:outline-none px-[14px] py-[7px] '
          >
            <span className='sr-only'>Сменить язык</span>
            {localeDisplay[localActive] || localActive.toUpperCase()} {/* Use mapping */}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-4 w-[60px] bg-white shadow-lg z-10">
              <ul className="py-1">

                <li>
                  <button
                    onClick={() => handleLanguageSelect('ru')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Ру
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageSelect('uz')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Oz
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleOpenMenu}
          className="py-[12px] px-[12px] rounded-[8px] border border-[#ECE8FF] flex flex-row items-center"
        >
          <div className=" w-[16px] h-[16px] flex justify-center items-center">
            <Image
              src={burgerMenu}
              height={100}
              width={100}
              alt="burger-menu icon"
              className="w-[16px] h-[16px]"
            />

          </div>
        </button>

        {/* Рендер компонента Menu */}
        {menu && (
          <Menu menu={menu} closeMenu={handleCloseMenu} navOptions={navOptions} locale={locale} />
        )}
      </div>
    </div>
  );
};

export default LocalSwitcher;
