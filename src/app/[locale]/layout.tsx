// import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '@/src/app/[locale]/_components/styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from './_components/QueryProvider';
import { Toaster } from 'react-hot-toast';
// import Script from 'next/script';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  fallback: ['sans-serif'],
});

export type Locales = 'ru' | 'uz';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale: Locales = params?.locale === 'uz' ? 'uz' : 'ru';

  unstable_setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={raleway.className}>
      <body className={raleway.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header locale={locale} />
              <main className="flex-1">{children}</main>
            <Footer locale={locale} />
            <Toaster/>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
