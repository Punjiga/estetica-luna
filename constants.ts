import { Service, Stylist, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Manicure & Pedicure',
    duration: 45,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    category: 'nails'
  },
  {
    id: 's2',
    name: 'Tratamiento Capilar',
    duration: 90,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    category: 'hair'
  },
  {
    id: 's3',
    name: 'Maquillaje Profesional',
    duration: 60,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    category: 'makeup'
  },
  {
    id: 's4',
    name: 'Diseño de Cejas & Pestañas',
    duration: 30,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    category: 'face'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: 'María González',
    specialty: 'Cabello y Keratina',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=800&q=80',
    description: 'Especialista en tratamientos regenerativos y colorimetría avanzada.'
  },
  {
    id: 'st2',
    name: 'Ana Rodríguez',
    specialty: 'Uñas y Nail Art',
    image: 'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=800&q=80',
    description: 'Artista certificada en diseño de uñas acrílicas y esculpidas.'
  },
  {
    id: 'st3',
    name: 'Sofía Morales',
    specialty: 'Maquillaje Profesional',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80',
    description: 'Maquilladora de eventos y novias con 5 años de experiencia.'
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80',
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Laura Jiménez',
    text: 'Excelente servicio y atención. María hizo un trabajo increíble con mi keratina. Super recomendado!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 't2',
    name: 'Carolina Vega',
    text: 'El mejor lugar para consentirse en Cartago. Ana es una artista con las uñas. Siempre salgo feliz.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 't3',
    name: 'Valeria Morales',
    text: 'Ambiente súper profesional y relajante. El sistema de reservas online es muy conveniente. Volveré!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/90.jpg'
  }
];
