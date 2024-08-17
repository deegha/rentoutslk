export interface PropertyProps {
  address: string;
  availableFrom?: string;
  deposit?: number;
  floorArea: string;
  propertyType: string;
  monthlyRent: number;
  title: string;
  image1: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  numberBedrooms: string;
  createdAt: { seconds: number; nanoseconds: number };
  views: string;
  favorite: string;
  active: boolean;
  id: string;
}
