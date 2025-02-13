"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CloseEyes from "@/public/svg/NotEyes.svg";
import Eyes from "@/public/svg/eyes.svg";
import Pen from "@/public/svg/pen.svg";
import arrowBack from "@/public/svg/clients/arrow_back.svg";

const ProfileSettings: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);
    const router = useRouter();

    return (
        <div className="max-w-md mx-auto px-4 py-[28px]">
            {/* Назад */}
            <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-500 text-sm mb-[21px]">
                <Image src={arrowBack} alt="Назад" width={20} height={20} className="mr-2" />
                Назад
            </button>

            {/* Мой профиль */}
            <h2 className="text-xl font-bold mb-[20px]">Мой профиль</h2>
            <div className="space-y-2">
                {["Рашид", "Мирзиёев", "Сардорович", "Менеджер"].map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center bg-[#F5F2FF] p-3 rounded-md"
                    >
                        <span className="text-gray-700">{item}</span>
                        {index !== 3 && (
                            <button className="text-gray-400 hover:text-gray-600">
                                <Image src={Pen} alt="Редактировать" width={20} height={20} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Изменить пароль */}
            <h2 className="text-lg font-semibold mt-10 mb-5">Изменить пароль</h2>
            <div className="space-y-2">
                {["Старый пароль", "Новый пароль"].map((placeholder, index) => (
                    <div key={index} className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder={placeholder}
                            className="w-full bg-[#F5F2FF] p-3 rounded-md focus:outline-none"
                        />
                        <button
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-3"
                        >
                            <Image
                                src={passwordVisible ? Eyes : CloseEyes}
                                alt="Показать/Скрыть"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                ))}
            </div>

            {/* Изменить логин */}
            <h2 className="text-lg font-semibold mt-10 mb-5">Изменить логин</h2>
            <div className="space-y-2">
                {["Старый логин", "Новый логин"].map((placeholder, index) => (
                    <div key={index} className="relative">
                        <input
                            type={loginVisible ? "text" : "password"}
                            placeholder={placeholder}
                            className="w-full bg-[#F5F2FF] p-3 rounded-md focus:outline-none"
                        />
                        <button
                            onClick={() => setLoginVisible(!loginVisible)}
                            className="absolute right-3 top-3"
                        >
                            <Image
                                src={loginVisible ? Eyes : CloseEyes}
                                alt="Показать/Скрыть"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                ))}
            </div>

            {/* Кнопка сохранения */}
            <button className="w-full bg-[#7E49FF] text-white py-3 px-[16px] mt-10 rounded-md text-[16px] font-bold hover:bg-purple-600 transition">
                Сохранить все
            </button>
        </div>
    );
};

export default ProfileSettings;
