"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import AarrowTop from '@/public/svg/arrow_top.svg';
import AarrowBottom from '@/public/svg/arrow_down.svg';
import arrowBack from '@/public/svg/clients/arrow_back.svg';
import plus from '@/public/svg/plus_purple.svg';
import phone from '@/public/svg/phone_for_about.svg';
import CardModal from "../Footer/ModalForPlus";

const faqs = [
    { question: "Для чего нужен сайт ?", answer: "Сайт помогает привлекать клиентов, автоматизировать процессы и улучшать маркетинг." },
    { question: "Как вы работаете", answer: "Работа начинается с тщательного сбора информации о вашем бизнесе, целевой аудитории и текущих потребностях." },
    { question: "Что даст SMM ?", answer: "SMM помогает повысить узнаваемость бренда, увеличить продажи и наладить коммуникацию с клиентами." },
    { question: "В чем отличие SEO и контекстной рекламы ?", answer: "SEO работает на долгосрочную перспективу, а контекстная реклама дает быстрые результаты." },
    { question: "Какое преимущество видеомаркетинга ?", answer: "Видеомаркетинг привлекает больше внимания, улучшает вовлеченность и повышает доверие к бренду." }
];

interface locale {
    locale : string;
}

const AboutPage = ({locale}: locale) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const router = useRouter(); // Используем useRouter для навигации
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-6 mb-[26px] w-full mx-auto">
            <button
                onClick={() => router.back()} // Возвращаемся на предыдущую страницу
                className="flex items-center text-[12px] text-[#303030] mb-4"
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

            <h1 className="text-xl font-bold mb-4">О нас</h1>
            <p className="text-[#303030] text-[16px] mb-[40px]">
                Money Manager предназначен для автоматизации учета финансовых операций, управления клиентами и услугами, создания отчетов и настройки уведомлений.
            </p>

            {/* Аккордеон */}
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-[20px] p-5 transition-all duration-300 ${openIndex === index ? "border-[#7E49FF]" : "border-[#A6A6A6]"
                            }`}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between items-center w-full text-left font-semibold text-[18px]"
                        >
                            {faq.question}
                            <Image
                                src={openIndex === index ? AarrowTop : AarrowBottom}
                                alt="Arrow Icon"
                                width={28}
                                height={28}
                            />
                        </button>
                        {openIndex === index && <p className="mt-2 text-sm text-[#A6A6A6]">{faq.answer}</p>}
                    </div>
                ))}
            </div>

            {/* Градиентная кнопка */}
            <div
                className="mt-10 text-white rounded-[16px] p-5 text-center"
                style={{
                    background: "linear-gradient(200deg, #C1B1FF 8.33%, #7E49FF 50%, #9747FF 70.83%, #5718BF 91.67%)",
                }}
            >
                <p className="text-[24px] text-left font-bold pb-[20px]">Не забудьте добавить транзакцию сегодня!</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2 bg-white text-[#7E49FF] font-semibold px-3 py-[6px] rounded-lg text-[14px] flex items-center justify-center gap-[4px] ml-auto">
                    Добавить
                    <Image
                        src={plus}
                        alt="Arrow Icon"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            {/* Контакты */}
            <div className="mt-6 text-left ">
                <h2 className="text-black text-xl font-semibold">Свяжитесь с поддержкой</h2>
                <div className="mt-[23px] w-full flex justify-between items-center space-x-4">
                    <a
                        href="tel:936702802"
                        className="bg-purple-100 w-full text-black text-[14px] font-medium text-left px-6 py-4 rounded-lg"
                    >
                        93 670 28 02
                    </a>
                    <button
                        onClick={() => (window.location.href = "tel:936702802")}
                        className="bg-[#7E49FF] hover:bg-purple-700 text-white text-lg font-medium px-[33px] py-3 rounded-lg flex items-center justify-between w-full"
                    >
                        Позвонить
                        <Image src={phone} alt="Телефон" width={16} height={16} />
                    </button>
                </div>
            </div>
            <CardModal isOpen={isModalOpen} locale={locale} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AboutPage;
