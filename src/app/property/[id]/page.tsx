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

interface PropertyPageProps {
  params: {
    id: string;
  };
}

async function fetchProperty(id: string): Promise<PropertyProps> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/check-property/${id}`,
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

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const property = await fetchProperty(params.id);

  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
    { name: 'Colombo', href: '' },
    { name: 'Apartment', href: '' },
    {
      name: `${property.title} in ${property.place}`,
      href: `/property/${params.id}`,
    },
  ];

  return (
    <>
      <Header />
      <main>
        <PageTitle
          title={`rentoutslk | ${property.title} in ${property.place}`}
          description={`${property.title} in ${property.place}`}
        />
        <Breadcrumbs categories={categories} />
        <PropertyDetails property={property} />
        <AboutProperty property={property} />
        <TrendingProperties />
        <LookingForProperty />
        <PropertyComponent />
      </main>
      <Footer />
    </>
  );
};

export default PropertyPage;
