export interface TourRequestProps {
  id?: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  city: string;
  firstQuestion: string;
  secondQuestion: string;
  customQuestion: string;
  firstAnswer: string;
  secondAnswer: string;
  customAnswer: string;
  message: string;
  userId: string;
  status: 'accepted' | 'declined' | 'pending' | 'deleted';
  createdAt: { seconds: number; nanoseconds: number };
  ownerId: string;
  propertyId: string;
}
