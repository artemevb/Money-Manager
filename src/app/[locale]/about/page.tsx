// pages/about.tsx
import AboutMain from "../_components/About/AboutMain";

export default function About() {
  const currentLocale: "ru" | "uz" = "ru";

  return (
    <div className="bg-[#fff] flex flex-col gap-[90px] mdl:gap-[130px] xl:gap-[180px]">
      <AboutMain locale={currentLocale} />
    </div>
  );
}
