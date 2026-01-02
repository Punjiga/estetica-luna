export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number; // colones
  image: string;
  category: 'hair' | 'nails' | 'makeup' | 'face';
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  image: string;
  description: string;
}

export interface TimeSlot {
  time: string; // "09:00"
  available: boolean;
}

export interface ClientData {
  name: string;
  phone: string;
  email: string;
  notes: string;
  isFirstVisit: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  stylistId: string;
  date: Date;
  time: string;
  client: ClientData;
  createdAt: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image: string;
}
