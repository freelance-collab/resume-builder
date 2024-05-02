import { Header } from '@/components/header';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='flex flex-grow flex-col'>{children}</main>
    </>
  );
}

export default DashboardLayout;
