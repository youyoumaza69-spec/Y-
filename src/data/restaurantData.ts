import { DaySchedule, Review } from '../types';

export const RESTAURANT_INFO = {
  name: "Le Passager",
  tagline: "Pizzas - Roulés - Tacos - Sandwiches - Burgers - Assiettes",
  address: "70 Rue Léon Blum",
  city: "Villeurbanne",
  postalCode: "69100",
  region: "Auvergne-Rhône-Alpes, France",
  fullAddress: "70 Rue Léon Blum, 69100 Villeurbanne",
  phonePrimary: "09 54 52 72 72",
  phoneSecondary: "06 52 47 78 46",
  nearestMetro: "Cusset (Métro A)",
  busStop: "Vaillant Couturier (Bus C3 / C11)",
  mapCoordinates: {
    lat: 45.7656,
    lng: 4.8981
  },
  googleMapsUrl: "https://maps.google.com/?q=70+Rue+L%C3%A9on+Blum+69100+Villeurbanne",
  wazeUrl: "https://waze.com/ul?q=70+Rue+L%C3%A9on+Blum+Villeurbanne",
  features: [
    { title: "Cartes de crédit", desc: "Paiement CB & Sans Contact acceptés", icon: "CreditCard" },
    { title: "Sur Place & À Emporter", desc: "Service rapide et convivial", icon: "ShoppingBag" },
    { title: "Accès PMR", desc: "Accessible aux personnes à mobilité réduite", icon: "Accessibility" },
    { title: "Qualité & Fraîcheur", desc: "Sauce gruyère maison & viandes de qualité", icon: "Flame" },
  ]
};

export const OPENING_HOURS: DaySchedule[] = [
  { dayName: "Lundi", dayIndex: 1, openTime: "11:30", closeTime: "22:30" },
  { dayName: "Mardi", dayIndex: 2, openTime: "11:30", closeTime: "22:30" },
  { dayName: "Mercredi", dayIndex: 3, openTime: "11:30", closeTime: "22:30" },
  { dayName: "Jeudi", dayIndex: 4, openTime: "11:30", closeTime: "22:30" },
  { dayName: "Vendredi", dayIndex: 5, openTime: "14:00", closeTime: "22:30" },
  { dayName: "Samedi", dayIndex: 6, openTime: "11:30", closeTime: "22:30" },
  { dayName: "Dimanche", dayIndex: 0, openTime: "11:30", closeTime: "22:30" },
];

export const AVAILABLE_MEATS = [
  "Steak haché",
  "Escalope de poulet",
  "Viande Kebab",
  "Chicken marinée",
  "Fish (Poisson)",
  "Cordon Bleu",
  "Nugget's croustillants"
];

export const AVAILABLE_SAUCES = [
  "Sauce Gruyère Fait Maison",
  "Sauce Blanche",
  "Algérienne",
  "Mayonnaise",
  "Ketchup",
  "Samouraï",
  "Biggy Burger",
  "Harissa",
  "Sauce Barbecue",
  "Curry"
];

export const GRATINAGE_OPTIONS = [
  { name: "Chèvre Miel", price: 3, desc: "Fromage de chèvre, crème fraîche, miel" },
  { name: "Mozza à la Provençale", price: 3, desc: "Herbes de Provence, sauce tomate ou crème fraîche, mozzarella" },
  { name: "Cheddar Barbecue", price: 3, desc: "Cheddar fondu, crème fraîche, sauce barbecue" },
  { name: "Raclette", price: 3, desc: "Fromage à raclette généreux, crème fraîche" },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Maligne B.",
    rating: 5,
    date: "Il y a 2 jours",
    comment: "Les meilleurs tacos gratinés de Villeurbanne ! La sauce gruyère maison est une pure tuerie. Accueil toujours au top et service très rapide.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Karim M.",
    rating: 5,
    date: "Il y a 1 semaine",
    comment: "Le Tacos Mustang Géant et le Roulé Maison sont incroyables. Les portions sont super généreuses et le prix très correct pour la qualité.",
    verified: true
  },
  {
    id: "rev-3",
    author: "Sophie D.",
    rating: 5,
    date: "Il y a 2 semaines",
    comment: "Client régulier depuis des mois. Très proche de la station Cusset. Mention spéciale pour l'Assiette Double Viande bien garnie !",
    verified: true
  },
  {
    id: "rev-4",
    author: "Nassim K.",
    rating: 5,
    date: "Il y a 1 mois",
    comment: "Super formule Pizza Familiale + Boissonn, parfait pour une soirée foot entre amis. Personnel chaleureux et toujours serviable.",
    verified: true
  }
];
