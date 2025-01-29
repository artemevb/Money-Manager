

import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/images/imed-f.svg";
import logo1 from "@/public/svg/Logo.svg";

function Logo() {
  return (
    <Link href="/" className="h-auto w-auto items-center flex  mdx:max-w-max">
      <div className="flex flex-row gap-[8px] items-center justify-between max-w-[120px]">
        <Image
          src={logo1}
          width={300}
          height={300}
          quality={100}
          alt="Rmc Logo"
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
}

export default Logo;
