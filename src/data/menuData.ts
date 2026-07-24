import { MenuItem, PizzaSizeOption } from '../types';

const STANDARD_PIZZA_SIZES: PizzaSizeOption[] = [
  { id: 'senior', name: 'Senior', size: '33 cm', price: 8.50 },
  { id: 'familiale', name: 'Familiale', size: '40 cm', price: 13.00 },
  { id: 'geante', name: 'Géante', size: '50 cm', price: 19.00 },
];

const NOUVEAUTE_PIZZA_SIZES: PizzaSizeOption[] = [
  { id: 'senior', name: 'Senior', size: '33 cm', price: 9.00 },
  { id: 'familiale', name: 'Familiale', size: '40 cm', price: 13.50 },
  { id: 'geante', name: 'Géante', size: '50 cm', price: 20.00 },
];

const MARGARITA_PIZZA_SIZES: PizzaSizeOption[] = [
  { id: 'senior', name: 'Senior', size: '33 cm', price: 8.00 },
  { id: 'familiale', name: 'Familiale', size: '40 cm', price: 12.00 },
  { id: 'geante', name: 'Géante', size: '50 cm', price: 18.00 },
];

export const MENU_ITEMS: MenuItem[] = [
  // NOS PIZZAS
  {
    id: 'pizza-margarita',
    name: 'Pizza Margarita',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, OLIVES.',
    priceSeul: 8.0,
    image: '/images/pizza_margarita_photo_1784811378366.jpg',
    tags: ['Incontournable', 'Classique'],
    isPopular: true,
    options: {
      pizzaSizes: MARGARITA_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-boisee',
    name: 'Pizza Boisée',
    category: 'pizzas',
    description: 'CRÈME FRAÎCHE, MOZZARELLA, ESCALOPE DE POULET, POIVRONS, SAUCE GRUYÈRE.',
    priceSeul: 8.5,
    image: '/images/pizza_boisee_photo_1784811322225.jpg',
    tags: ['Best-Seller', 'Sauce Gruyère'],
    isPopular: true,
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-orientale',
    name: 'Pizza Orientale',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, MERGUEZ, POIVRONS.',
    priceSeul: 8.5,
    image: '/images/pizza_orientale_photo_1784811334770.jpg',
    tags: ['Merguez Épicée'],
    isPopular: true,
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-campione',
    name: 'Pizza Campione',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, VIANDE HACHÉE, POIVRONS.',
    priceSeul: 8.5,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tags: ['Viande Hachée'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-kebab',
    name: 'Pizza Kebab',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, KEBAB, POIVRONS.',
    priceSeul: 8.5,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    tags: ['Viande Kebab'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-pacifica',
    name: 'Pizza Pacifica',
    category: 'pizzas',
    description: 'SAUCE TOMATE OU CRÈME FRAÎCHE, MOZZARELLA, SAUMON FUMÉ.',
    priceSeul: 8.5,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    tags: ['Saumon Fumé'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-tonato',
    name: 'Pizza Tonato',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, THON, POIVRONS.',
    priceSeul: 8.5,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
    tags: ['Thon & Poivrons'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-fruits-de-mer',
    name: 'Pizza Fruits de Mer',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, COCKTAIL DE FRUITS DE MER.',
    priceSeul: 8.5,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    tags: ['Fruits de Mer'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-jambon',
    name: 'Pizza Jambon',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, JAMBON DE DINDE OU POULET, CHAMPIGNONS.',
    priceSeul: 8.5,
    image: '/images/pizza_jambon_photo_1784811867145.jpg',
    tags: ['Jambon Dinde/Poulet'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-vegetarienne',
    name: 'Pizza Végétarienne',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, POIVRONS, OIGNONS, CHAMPIGNONS, OLIVES, TOMATES FRAÎCHES.',
    priceSeul: 8.5,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
    tags: ['100% Végétarienne'],
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-4-fromages',
    name: 'Pizza 4 Fromages',
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, EMMENTAL, ROQUEFORT, CHÈVRE.',
    priceSeul: 8.5,
    image: '/images/pizza_4fromages_photo_1784811346513.jpg',
    tags: ['4 Fromages', 'Gourmand'],
    isPopular: true,
    options: {
      pizzaSizes: STANDARD_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-indienne',
    name: "Pizza L'Indienne",
    category: 'pizzas',
    description: 'CRÈME FRAÎCHE, MOZZARELLA, SAUCE CURRY, POULET, OIGNONS.',
    priceSeul: 9.0,
    image: '/images/pizza_indienne_photo_1784811357567.jpg',
    tags: ['Nouveauté', 'Sauce Curry'],
    isNew: true,
    options: {
      pizzaSizes: NOUVEAUTE_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-americaine',
    name: "Pizza L'Américaine",
    category: 'pizzas',
    description: 'SAUCE TOMATE, MOZZARELLA, VIANDE HACHÉE, SAUCE BARBECUE.',
    priceSeul: 9.0,
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=600&q=80',
    tags: ['Nouveauté', 'Sauce Barbecue'],
    isNew: true,
    options: {
      pizzaSizes: NOUVEAUTE_PIZZA_SIZES
    }
  },
  {
    id: 'pizza-chevre-miel',
    name: 'Pizza Chèvre Miel',
    category: 'pizzas',
    description: 'CRÈME FRAÎCHE, MOZZARELLA, FROMAGE DE CHÈVRE, MIEL.',
    priceSeul: 9.0,
    image: '/images/pizza_chevre_miel_photo_1784811367143.jpg',
    tags: ['Nouveauté', 'Sucré-Salé'],
    isNew: true,
    options: {
      pizzaSizes: NOUVEAUTE_PIZZA_SIZES
    }
  },

  // TACOS
  {
    id: 'tacos-classique',
    name: 'Tacos Classique',
    category: 'tacos',
    description: 'GALETTE, VIANDE ET SAUCE AU CHOIX, SAUCE GRUYERE, FRITES, CRUDITES.',
    priceSeul: 7.0,
    priceMenu: 11.0,
    image: '/images/french_tacos_classic_1784775203858.jpg',
    tags: ['Best-Seller', 'Sauce Gruyère Maison'],
    isPopular: true,
    options: {
      meatsCount: 1,
      allowGratinage: true
    }
  },
  {
    id: 'tacos-royal',
    name: 'Tacos Royal',
    category: 'tacos',
    description: 'GALETTE, VIANDE ET SAUCE AU CHOIX, SAUCE GRUYERE, FRITES, CRUDITES, SUPPLÉMENT CHEDDAR ET OEUF.',
    priceSeul: 9.0,
    priceMenu: 13.0,
    image: '/images/french_tacos_royal_1784775217008.jpg',
    tags: ['Gourmand', 'Cheddar & Œuf'],
    isPopular: true,
    options: {
      meatsCount: 1,
      allowGratinage: true
    }
  },
  {
    id: 'tacos-mustang',
    name: 'Tacos Mustang',
    category: 'tacos',
    description: 'LE GEANT ! DOUBLE GALETTE ET DOUBLE VIANDE, SAUCES, MAXI FRITES, CRUDITÉS, & SAUCE GRUYERE FAITE MAISON.',
    priceSeul: 13.0,
    priceMenu: 17.0,
    image: '/images/french_tacos_mustang_1784775231459.jpg',
    tags: ['LE GÉANT !', 'Double Galette'],
    isNew: true,
    options: {
      meatsCount: 2,
      allowGratinage: true
    }
  },

  // ROULÉS
  {
    id: 'roule-maison',
    name: 'Roulé Maison',
    category: 'roules',
    description: 'PÂTE A PIZZA, UNE VIANDE AU CHOIX, SAUCE, CRUDITES, FRITES, SAUCE GRUYERE FAITE MAISON.',
    priceSeul: 9.0,
    priceMenu: 13.0,
    image: '/images/roule_maison_photo_1784775731078.jpg',
    tags: ['Pâte à Pizza', 'Spécialité Maison'],
    isPopular: true,
    options: {
      meatsCount: 1,
      allowGratinage: true
    }
  },
  {
    id: 'roule-royal',
    name: 'Roulé Royal',
    category: 'roules',
    description: 'PÂTE A PIZZA, UNE VIANDE AU CHOIX, SAUCE, CRUDITES, FRITES, SAUCE GRUYERE FAITE MAISON SUPPLÉMENT CHEDDAR ET OEUF.',
    priceSeul: 11.0,
    priceMenu: 15.0,
    image: '/images/roule_royal_photo_1784775744532.jpg',
    tags: ['Cheddar & Œuf', 'Gourmand'],
    isPopular: true,
    options: {
      meatsCount: 1,
      allowGratinage: true
    }
  },
  {
    id: 'roule-maxi-royal',
    name: 'Roulé Maxi Royal',
    category: 'roules',
    description: 'PÂTE A PIZZA, 2 VIANDE AU CHOIX, SAUCE, CRUDITES, FRITES, SAUCE GRUYERE FAITE MAISON SUPPLÉMENT CHEDDAR ET OEUF.',
    priceSeul: 13.0,
    priceMenu: 17.0,
    image: '/images/roule_maxi_photo_1784775755095.jpg',
    tags: ['Maxi Royal', '2 Viandes'],
    isNew: true,
    options: {
      meatsCount: 2,
      allowGratinage: true
    }
  },

  // ASSIETTES
  {
    id: 'assiette-une-viande',
    name: 'Assiette Une Viande',
    category: 'assiettes',
    description: 'UNE VIANDE AU CHOIX, CRUDITES, SAUCE SALADE, FRITES, SAUCE, PAIN.',
    priceSeul: 11.0,
    image: '/images/assiette_une_viande_1784776235382.jpg',
    tags: ['Assiette Généreuse', 'Pain & Crudités'],
    isPopular: true,
    options: {
      meatsCount: 1
    }
  },
  {
    id: 'assiette-double-viande',
    name: 'Assiette Double Viande',
    category: 'assiettes',
    description: 'DEUX VIANDES AU CHOIX, CRUDITES, SAUCE SALADE, FRITES, SAUCE, PAIN.',
    priceSeul: 14.0,
    image: '/images/assiette_double_viande_1784776249609.jpg',
    tags: ['Double Viande', 'Super Copieux'],
    options: {
      meatsCount: 2
    }
  },

  // BURGERS
  {
    id: 'burger-cheese',
    name: 'Le Cheese',
    category: 'burgers',
    description: 'STEAK, CHEDDAR.',
    priceSeul: 3.5,
    priceMenu: 7.0,
    image: '/images/burger_cheese_photo_1784812984852.jpg',
    tags: ['Classique', 'Prix Doux'],
    isPopular: true
  },
  {
    id: 'burger-double-cheese',
    name: 'Le Double Cheese',
    category: 'burgers',
    description: 'DOUBLE VIANDE, CHEDDAR.',
    priceSeul: 5.5,
    priceMenu: 9.5,
    image: '/images/burger_double_cheese_photo_1784812997191.jpg',
    tags: ['Double Viande', 'Double Cheddar'],
    isPopular: true
  },
  {
    id: 'burger-maxi',
    name: 'Le Maxi Burger',
    category: 'burgers',
    description: 'STEAK, POULET OU POISSON + CHEDDAR.',
    priceSeul: 5.5,
    priceMenu: 9.5,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    tags: ['Steak / Poulet / Poisson']
  },
  {
    id: 'burger-algerien',
    name: "L'Algérien",
    category: 'burgers',
    description: 'PAIN SUÉDOIS, STEAK GÉANT.',
    priceSeul: 7.5,
    priceMenu: 11.5,
    image: '/images/burger_algerien_photo_1784813008885.jpg',
    tags: ['Pain Suédois', 'Steak Géant'],
    isPopular: true
  },
  {
    id: 'burger-big-bang',
    name: 'Le Big Bang',
    category: 'burgers',
    description: 'SPÉCIAL MAXI PAIN, STEAK GÉANT + CHEDDAR.',
    priceSeul: 7.5,
    priceMenu: 11.5,
    image: '/images/burger_big_bang_photo_1784813020343.jpg',
    tags: ['Spécial Maxi Pain', 'Steak Géant'],
    isPopular: true
  },

  // GRATINAGES
  {
    id: 'gratinage-chevre-miel',
    name: 'Gratinage Chèvre Miel',
    category: 'gratinages',
    description: 'FROMAGE DE CHÈVRE, CRÈME FRAÎCHE, MIEL.',
    priceSeul: 3.0,
    image: '/images/gratinage_chevre_miel_1784836549033.jpg',
    tags: ['Gratiné au Four', 'Chèvre & Miel (+3€)'],
    isPopular: true
  },
  {
    id: 'gratinage-mozza-provencale',
    name: 'Gratinage Mozza Provençale',
    category: 'gratinages',
    description: 'HERBES DE PROVENCE, SAUCE TOMATE OU CRÈME FRAÎCHE, MOZZARELLA.',
    priceSeul: 3.0,
    image: '/images/gratinage_mozza_provencale_1784836847907.jpg',
    tags: ['Gratiné au Four', 'Mozza & Herbes (+3€)'],
    isPopular: true
  },
  {
    id: 'gratinage-cheddar-bbq',
    name: 'Gratinage Cheddar Barbecue',
    category: 'gratinages',
    description: 'CHEDDAR, CRÈME FRAÎCHE, SAUCE BARBECUE.',
    priceSeul: 3.0,
    image: '/images/gratinage_cheddar_bbq_1784837061615.jpg',
    tags: ['Gratiné au Four', 'Cheddar & BBQ (+3€)'],
    isPopular: true
  },
  {
    id: 'gratinage-raclette',
    name: 'Gratinage Raclette',
    category: 'gratinages',
    description: 'FROMAGE À RACLETTE, CRÈME FRAÎCHE.',
    priceSeul: 3.0,
    image: '/images/gratinage_raclette_photo_1784837246216.jpg',
    tags: ['Gratiné au Four', 'Raclette Fondante (+3€)'],
    isPopular: true
  },

  // TEX-MEX
  {
    id: 'frites-barquette-normale',
    name: 'Barquette de Frites Normale',
    category: 'texmex',
    description: 'Frites croustillantes et dorées en portion normale.',
    priceSeul: 3.0,
    image: '/images/barquette_frites_croustillantes_1784838584396.jpg',
    tags: ['Portion Normale (3,00€)'],
    isPopular: true
  },
  {
    id: 'frites-barquette-grande',
    name: 'Grande Barquette de Frites',
    category: 'texmex',
    description: 'Grande portion de frites croustillantes et dorées.',
    priceSeul: 4.5,
    image: '/images/barquette_frites_croustillantes_1784838584396.jpg',
    tags: ['Grande Portion (4,50€)'],
    isPopular: true
  },
  {
    id: 'texmex-wings',
    name: 'Wings x4',
    category: 'texmex',
    description: 'Ailerons de poulet mariné croustillants et dorés au panure ultra-savoureuse.',
    priceSeul: 4.5,
    image: '/images/wings_poulet_croustillants_1784838782133.jpg',
    tags: ['Ultra Croustillant', 'Panure Dorée'],
    isPopular: true
  },
  {
    id: 'texmex-nuggets',
    name: "Nugget's x6",
    category: 'texmex',
    description: 'Nuggets de poulet croustillants et dorés.',
    priceSeul: 4.5,
    image: '/images/nuggets_poulet_doris_1784839058480.jpg',
    tags: ['Poulet Croustillant'],
    isPopular: true
  },
  {
    id: 'texmex-tenders',
    name: 'Tenders x3',
    category: 'texmex',
    description: 'Aiguillettes de poulet 100% filet, tendres et croustillantes.',
    priceSeul: 4.5,
    image: '/images/tenders_poulet_croustillants_1784839300273.jpg',
    tags: ['100% Filet', 'Tendre & Croustillant'],
    isPopular: true
  },
  {
    id: 'menu-texmex-complet',
    name: 'Menu Tex-Mex (Tenders x3 / Wings x4 / Nuggets x6)',
    category: 'texmex',
    description: 'Au choix : Tenders x3, Wings x4 ou Nuggets x6 + Frites + Boisson au choix.',
    priceSeul: 9.0,
    image: '/images/menu_texmex_combo_1784839485744.jpg',
    tags: ['Menu Complet 9€', 'Frites + Boisson Incluses'],
    isPopular: true
  },

  // PIZZAS & FORMULES PROMOS
  {
    id: 'promo-2-pizzas-senior',
    name: 'Offre Duo 2 Pizzas Senior (33cm)',
    category: 'pizzas_promos',
    description: '2 Pizzas Senior 33cm au choix + 1 Bouteille 1.5L offerte !',
    priceSeul: 12.0,
    image: '/images/duo_pizzas_side_by_side_1784837697258.jpg',
    tags: ['Super Promo 12€', 'Pizzas + Boisson 1.5L'],
    isPopular: true
  },
  {
    id: 'promo-2-pizzas-familiales',
    name: 'Offre Duo 2 Pizzas Familiales (40cm)',
    category: 'pizzas_promos',
    description: '2 Pizzas Familiales 40cm au choix + 1 Bouteille 1.5L offerte !',
    priceSeul: 20.0,
    image: '/images/duo_pizzas_side_by_side_1784837697258.jpg',
    tags: ['Offre Familiale 20€']
  },
  {
    id: 'promo-3-pizzas-familiales',
    name: 'Offre Trio 3 Pizzas Familiales (40cm)',
    category: 'pizzas_promos',
    description: '3 Pizzas Familiales 40cm au choix + 1 Bouteille 1.5L offerte !',
    priceSeul: 29.0,
    image: '/images/trio_pizzas_side_by_side_1784837837025.jpg',
    tags: ['Trio Soirée 29€'],
    isPopular: true
  },
  {
    id: 'promo-2-pizzas-geantes',
    name: 'Offre XL 2 Pizzas Géantes (50cm)',
    category: 'pizzas_promos',
    description: '2 Pizzas Géantes 50cm au choix + 1 Bouteille 1.5L offerte !',
    priceSeul: 30.0,
    image: '/images/duo_pizzas_geantes_1784837914896.jpg',
    tags: ['Format Géant 50cm'],
    isPopular: true
  },
  {
    id: 'sandwich-le-passager',
    name: 'Sandwich Le Passager',
    category: 'pizzas_promos',
    description: 'Spécialité du chef, garniture généreuse, sauces & frites.',
    priceSeul: 6.5,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    tags: ['Nouveau 6.50€']
  },
  {
    id: 'formule-4-tacos',
    name: 'Pack 4 Tacos + 2 Frites + Nuggets x8',
    category: 'pizzas_promos',
    description: '4 Tacos au choix + 2 Portions de frites XL + 8 Nuggets de poulet.',
    priceSeul: 24.0,
    image: '/images/pack_quatre_tacos_1784838172103.jpg',
    tags: ['Pack Soirée 24€'],
    isPopular: true
  },
  {
    id: 'formule-5-tacos',
    name: 'Mega Pack 5 Tacos + Nuggets x6 + Bouteille 1.5L',
    category: 'pizzas_promos',
    description: '5 Tacos au choix + 6 Nuggets croustillants + 1 Bouteille 1.5L offerte.',
    priceSeul: 29.0,
    image: '/images/pack_cinq_tacos_1784838183373.jpg',
    tags: ['Mega Pack 29€'],
    isPopular: true
  },

  // MENU ENFANT
  {
    id: 'menu-enfant',
    name: 'Menu Enfant Complet',
    category: 'enfants',
    description: 'Au choix: Cheese Burger OU Tenders x3 OU Nugget\'s x4 + Portion de frites + Boisson enfant.',
    priceSeul: 7.0,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80',
    tags: ['Spécial Enfant 7€']
  },

  // DESSERTS
  {
    id: 'dessert-tiramisu',
    name: 'Tiramisu Maison',
    category: 'desserts',
    description: 'Délicieux tiramisu en verrine. 3 parfums au choix : Chocolat, Caramel ou Daim.',
    priceSeul: 3.5,
    image: '/images/tiramisu_coupe_glace_1784840048509.jpg',
    tags: ['Chocolat / Caramel / Daim', 'Artisanal'],
    isPopular: true
  },
  {
    id: 'dessert-tarte-daim',
    name: 'Tarte au Daim',
    category: 'desserts',
    description: 'Délicieuse part de tarte croustillante au Daim. 2 parfums au choix : Chocolat ou Caramel.',
    priceSeul: 3.5,
    image: '/images/tarte_au_daim_slice_1784839777622.jpg',
    tags: ['Chocolat / Caramel au choix', 'Croquant Daim'],
    isPopular: true
  }
];
