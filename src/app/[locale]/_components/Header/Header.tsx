// Import necessary components and hooks
import Logo from "@/src/app/[locale]/_components/Header/Logo";
import Navigation from "@/src/app/[locale]/_components/Header/Navigation";
import Tools from "@/src/app/[locale]/_components/Header/Tools";
import { useTranslations } from 'next-intl';

interface NavItem {
  title: string;
  slug: string;
}

interface LocaleProps {
  locale: string;
}

const Header = ({ locale }: LocaleProps) => {
  const t = useTranslations('Header');

  // Define navigation items with translated titles
  const data: NavItem[] = [
    {
      title: t('nav.about'),
      slug: '/about',
    },
    {
      title: t('nav.profile'),
      slug: '/about-me',
    },
    {
      title: t('nav.security'),
      slug: '/security',
    },
    {
      title: t('nav.support'),
      slug: 'support',
    },
  ];

  return (
    <header className="w-full bg-white px-2 h-[55px] border-b">
      <div className="w-full max-w-[1440px] flex items-center justify-between gap-2 h-full mx-auto">
        <Logo />
        <Navigation navOptions={data} locale={locale} />
        <Tools navOptions={data} locale={locale} />
      </div>
    </header>
  );
}

export default Header;

