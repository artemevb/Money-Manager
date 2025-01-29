
import Blog from "./CardState";

// interface NewsCompProps {
//   locale: string;
// }
export default function Main() {
  // export default function Main({ locale }: NewsCompProps) {
  return (
    <main className=" flex flex-col gap-[90px] mdl:gap-[130px] xl:gap-[180px]">

      {/* <Blog locale={locale}/> */}
      <Blog />
    </main>
  );
}
