"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
// import Image from "next/image";
// import axios from "axios";
import { useTranslations } from "next-intl";

interface QuestionSentProps {
  closeModal: () => void;
}

// Интерфейс для состояния формы
interface FormValues {
  name: string;         // обязательное поле
  phone: string;        // обязательное поле
  comment?: string;     // необязательное поле
  service?: string;     // необязательное поле
}

// Интерфейс для результата валидации
interface ValidationResult {
  isValid: boolean;
  message: string;
}

const QuestionSent: React.FC<QuestionSentProps> = ({ closeModal }) => {
  const t = useTranslations("Modal");

  // Закрытие модального окна при клике вне его содержимого
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Начальные значения формы
  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    comment: "",
    service: t("text-3") // можно считать как дефолтное значение
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);



  // Обработчик изменения полей ввода
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Разрешаем только цифры, плюс, пробелы, дефисы и скобки
      const filteredValue = value.replace(/[^\d+()\s-]/g, "");
      setValues((prevValues) => ({
        ...prevValues,
        phone: filteredValue
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  // Функция валидации полей name и phone
  const validateInput = (name: keyof FormValues, value: string): ValidationResult => {
    if (name === "name") {
      return value.trim().length >= 3
        ? { isValid: true, message: t("correct") }
        : { isValid: false, message: t("enter_full_name") };
    } else if (name === "phone") {
      // Обновлённый регекс для номеров телефонов с поддержкой скобок
      const phoneRegex = /^\+?[\d\s()-]{7,20}$/;
      return phoneRegex.test(value)
        ? { isValid: true, message: t("correct") }
        : { isValid: false, message: t("enter_valid_phone_number") };
    }
    // Для необязательных полей (comment и service) не делаем строгую валидацию
    return { isValid: true, message: "" };
  };



  return (
    <>
      {/* Основное модальное окно */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]"
        onClick={handleBackdropClick}
      >
        <div className="bg-white p-6 mdx:p-[30px] shadow-md w-[90%] rounded-[30px] max-w-[466px] relative flex flex-col items-center justify-center">
          <form
            className="flex flex-col gap-[16px] mdx:gap-[20px] w-full mt-[20px] mdx:mt-[40px]"
          >
            {/* Поля name и phone (обязательные) */}
            {["name", "phone"].map((field) => (
              <div className="relative" key={field}>
                <input
                  type={field === "phone" ? "tel" : "text"}
                  name={field}
                  value={values[field as keyof FormValues] as string}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput(field)}
                  onBlur={() => setFocusedInput(null)}
                  className={`block w-full px-3 py-[22px] text-[#666666] placeholder-transparent focus:outline-none border border-[#F0F0F0] rounded-[20px] ${focusedInput === field
                    ? validateInput(
                      field as keyof FormValues,
                      values[field as keyof FormValues] as string
                    ).isValid
                      ? "border-[#EEEEEE] text-black"
                      : "border-red-500 text-black"
                    : "border-[#EEEEEE] text-black"
                    }`}
                  placeholder={
                    field === "name"
                      ? t("full-name")
                      : t("telephone-number")
                  }
                  inputMode={field === "phone" ? "numeric" : undefined}
                />
                <label
                  htmlFor={field}
                  className={`absolute transition-all text-[16px] mdx:text-[19px] ${focusedInput === field ||
                    (values[field as keyof FormValues] &&
                      (values[field as keyof FormValues] as string).length > 0)
                    ? "-top-4 text-xs"
                    : "top-[22px] left-[24px] text-[16px] mdx:text-[20px]"
                    } ${focusedInput === field
                      ? "text-[#666666] opacity-[0.8]"
                      : "text-[#666666] opacity-[0.8]"
                    } cursor-text`}
                  onClick={() => {
                    const input = document.getElementsByName(field)[0] as HTMLElement;
                    input.focus();
                  }}
                >
                  {focusedInput === field &&
                    (values[field as keyof FormValues] as string).length > 0
                    ? validateInput(
                      field as keyof FormValues,
                      values[field as keyof FormValues] as string
                    ).message
                    : field === "name"
                      ? t("full-name")
                      : t("telephone-number")}
                </label>
                {/* Опционально: отображение сообщения об ошибке валидации */}
                {(focusedInput === field ||
                  (values[field as keyof FormValues] &&
                    (values[field as keyof FormValues] as string).length > 0)) &&
                  !validateInput(
                    field as keyof FormValues,
                    values[field as keyof FormValues] as string
                  ).isValid ? (
                  <span className="text-red-500 text-sm">
                    {
                      validateInput(
                        field as keyof FormValues,
                        values[field as keyof FormValues] as string
                      ).message
                    }
                  </span>
                ) : null}
              </div>
            ))}

          

            {/* Необязательное поле comment */}
            <div className="relative" key="comment">
              <input
                name="comment"
                value={values.comment ?? ""}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput("comment")}
                onBlur={() => setFocusedInput(null)}
                className={`block w-full px-3 py-[22px] text-[#666666] placeholder-transparent focus:outline-none border border-[#F0F0F0] rounded-[20px] ${focusedInput === "comment"
                  ? "border-[#EEEEEE] text-black"
                  : "border-[#EEEEEE] text-black"
                  }`}
                placeholder={t("comment-placeholder")}
              />
              <label
                htmlFor="comment"
                className={`absolute transition-all text-[16px] mdx:text-[19px] ${focusedInput === "comment" || (values.comment && values.comment.length > 0)
                  ? "-top-4 text-xs"
                  : "top-[22px] left-[24px] text-[16px] mdx:text-[20px]"
                  } ${focusedInput === "comment"
                    ? "text-[#666666] opacity-[0.8]"
                    : "text-[#666666] opacity-[0.8]"
                  } cursor-text`}
                onClick={() => {
                  const textarea = document.getElementsByName("comment")[0] as HTMLElement;
                  textarea.focus();
                }}
              >
                {focusedInput === "comment" && values.comment
                  ? values.comment
                  : t("comment")}
              </label>
            </div>



            <div className="flex justify-start w-full">
              <button className="group border rounded-full border-[#fff] flex flex-row items-center justify-between bg-corporate pr-[6px] mdx:pr-[12px] py-[4px] mdx:py-[12px] overflow-hidden w-full">
                <p className="text-[#fff] pl-[24px] pr-[10px] text-[16px] mdx:text-[18px] xl:text-[20px] font-semibold">
                  {t("send")}
                </p>
                {/* <div className="relative rounded-full bg-[#ffff] w-[40px] h-[40px] flex items-center justify-center overflow-hidden">
                  <Image
                    src={arrow_right_black}
                    alt={t("arrowAlt") || "arrow black right"}
                    width={100}
                    height={100}
                    quality={100}
                    className="w-[20px] h-[20px] transition-transform duration-300 transform group-hover:translate-x-[10px]"
                  />
                </div> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuestionSent;
