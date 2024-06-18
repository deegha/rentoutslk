import {
  // Header,
  HeroBanner,
  CreateListingBanner,
  LookingFor,
} from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      {/* <Header /> */}

      <main>
        <HeroBanner />
        <CreateListingBanner />
        <LookingFor />
        <a href="/profile">Profile</a>
      </main>
    </>
  );
}
