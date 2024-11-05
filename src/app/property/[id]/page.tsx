import {
  Header,
  Footer,
  LookingForProperty,
  TrendingProperties,
  AboutProperty,
  PropertyDetails,
  Breadcrumbs,
  PropertyComponent,
} from '@/components';
import { PropertyProps } from '@/interface/property';
import { SearchProvider } from '@/context/searchProvider/searchProvider';
import ViewTracker from '@/components/viewTracker/viewTracker';

async function fetchProperty(id: string): Promise<PropertyProps> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/check-property/${id}?timestamp=${Date.now()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch property data');
  }

  const property: PropertyProps = await response.json();
  return property;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await fetchProperty(params.id);
  const mainImage = property.images[0] || '/og.png';

  return {
    title: `rentoutslk | ${property.title} in ${property.city}`,
    description: `${property.title} in ${property.city}`,
    openGraph: {
      title: `rentoutslk | ${property.title} in ${property.city}`,
      description: `${property.title} in ${property.city}`,
      url: `https://rentoutslk.vercel.app/property/${params.id}`,
      images: [
        {
          url: mainImage,
          alt: `${property.title} in ${property.city}`,
        },
      ],
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: `rentoutslk | ${property.title} in ${property.city}`,
      description: `${property.title} in ${property.city}`,
      images: [mainImage],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await fetchProperty(params.id);

  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
    { name: `${property.propertyType}`, href: '/rentals' },
    {
      name: `${property.title} in ${property.city}`,
      href: `/property/${params.id}`,
    },
  ];

  return (
    <SearchProvider>
      <Header />
      <main>
        <Breadcrumbs categories={categories} />
        <PropertyDetails property={property} propertyId={params.id} />
        <AboutProperty property={property} />
        <TrendingProperties address={property.address} city={property.city} />
        <PropertyComponent
          ownerId={property.ownerId}
          property={property}
          propertyId={params.id}
        />
        <LookingForProperty city={property.city} />

        <ViewTracker propertyId={params.id} />
      </main>
      <Footer />
    </SearchProvider>
  );
}
