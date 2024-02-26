import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

interface Props {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh] bg-white">{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
