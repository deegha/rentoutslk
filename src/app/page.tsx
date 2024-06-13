import { Header, HeroBanner } from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <HeroBanner />
        <a href="/profile">Profile</a>
      </main>
    </>
  );
}
