import React from 'react';
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
import PageTitle from '@/components/nav/pageTitle';
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

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchProperty(params.id);

  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
    { name: `${property.propertyType}`, href: '/rentals' },
    {
      name: `${property.title} in ${property.place}`,
      href: `/property/${params.id}`,
    },
  ];

  return (
    <SearchProvider>
      <Header />
      <main>
        <PageTitle
          title={`rentoutslk | ${property.title} in ${property.place}`}
          description={`${property.title} in ${property.place}`}
        />
        <Breadcrumbs categories={categories} />
        <PropertyDetails property={property} propertyId={params.id} />
        <AboutProperty property={property} />
        <TrendingProperties address={property.address} place={property.place} />
        <LookingForProperty place={property.place} />
        <PropertyComponent ownerId={property.ownerId} propertyId={params.id} />
        <ViewTracker propertyId={params.id} />
      </main>
      <Footer />
    </SearchProvider>
  );
};

export default PropertyPage;
