// Catalogue source du site : chaque objet represente un produit exploitable partout.
const products = [
  {
    id: "arachide-caramelisee",
    name: "Arachide caramélisée",
    category: "Épicerie",
    priceValue: 7,
    unitMode: "count",
    unitLabel: "pièce",
    image: "images/arachide-caramelisee.webp",
    description: "Arachides croquantes enrobées d'un caramel doré, parfaites pour une pause gourmande.",
    origin: "Spécialité maison du chef",
    availability: "Disponible selon le stock en boutique.",
    orderNote: "Produit vendu en bouteille.",
    tip: "Ideal a offrir, a partager ou a servir avec une boisson chaude."
  },
  {
    id: "avocat",
    name: "Avocat",
    category: "Fruits",
    priceValue: 7,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/avocat.jfif",
    description: "Avocat fondant, pratique pour salades, tartines, sauces et plats maison.",
    origin: " Mexique",
    storage: "A conserver à temperature ambiante.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo.",
    tip: "Parfait pour un guacamole, une salade ou un accompagnement frais."
  },
  {
    id: "banane-plantin-martinique",
    name: "Banane plantain Martinique",
    category: "Fruits",
    priceValue: 6.5,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/banane plantin martinique.webp",
    description: "Banane plantain savoureuse, idéale pour les cuissons poelées, frites ou mijotées.",
    origin: "Martinique.",
    storage: "A conserver à temperature ambiante jusqu'à utilisation.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo.",
    tip: "Se cuisine aussi bien en version salée qu'en accompagnement."
  },
  {
    id: "mangue",
    name: "Mangue",
    category: "Fruits",
    priceValue: 8,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/mangue togo.webp",
    description: "Mangue parfumée et juteuse, agreable à déguster nature ou en dessert.",
    origin: "Togo.",
    storage: "A laisser murir à température ambiante puis à garder au frais.",
    availability: "Disponible selon saison.",
    orderNote: "Produit vendu au kilo.",
    tip: "Très bonne en smoothie, salade de fruits ou coulis maison."
  },
  {
    id: "banane-plantain-colombie",
    name: "Banane plantain Colombie",
    category: "Fruits",
    priceValue: 2.89,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/plantin colombie.jpg",
    description: "Plantain de Colombie, apprecié pour sa tenue à la cuisson et son goût généreux.",
    origin: "Colombie.",
    storage: "A conserver à temperature ambiante.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaité avant l'ajout au panier.",
    tip: "Très pratique pour alloco, purée ou accompagnement."
  },
  {
    id: "Mini-bananes",
    name: "Mini-bananes",
    category: "Fruits",
    priceValue: 4.5,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/Mini bananes.webp",
    description: "Mini-bananes douces et savoureuses, faciles à déguster nature ou en dessert.",
    origin: "Colombie.",
    storage: "A conserver à temperature ambiante jusqu'à maturation, puis au frais.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaité avant l'ajout au panier.",
    tip: "Très agréables au petit-déjeuner, en collation ou dans une salade de fruits."
  },
  {
    id: "gingembre-frais",
    name: "Gingembre frais",
    category: "Épices",
    priceValue: 7.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/gingembre.webp",
    description: "Gingembre frais au goût puissant, utile en jus, infusion, marinade ou cuisine.",
    origin: "Pérou.",
    storage: "A conserver au frais pour prolonger la fraîcheur.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo.",
    tip: "Peut être rapé, infusé ou mixé selon l'usage."
  },
  {
    id: "aubergine-blanc",
    name: "Aubergine blanche",
    category: "Légumes",
    priceValue: 6.5,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/aubergine-blanc.jfif",
    description: "Aubergine blanche douce, ideale dans les sauces, les gratins et les plats mijotes.",
    origin: "Sénégal.",
    storage: "A conserver dans le bac a legumes du refrigerateur.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Sa texture souple convient très bien aux cuissons lentes."
  },
  {
    id: "aubergine-gros",
    name: "Aubergine gros",
    category: "Légumes",
    priceValue: 4,
    unitMode: "count",
    unitLabel: "sachet",
    image: "images/aubergine gros.jpg",
    description: "Aubergines en sachet, pratiques pour préparer rapidement un repas familial.",
    origin: "Sénégal.",
    storage: "A conserver au frais et a cuisiner rapidement.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu au sachet. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Convient bien aux sauces, purées ou preparations maison."
  },
  {
    id: "baton-de-manioc",
    name: "Bâton de manioc",
    category: "Épicerie",
    priceValue: 1.2,
    unitMode: "count",
    unitLabel: "bâton",
    image: "images/baton de magnioc.webp",
    description: "Baton de manioc traditionnel, ideal en accompagnement de sauces et plats cuisines.",
    origin: "Cameroun.",
    storage: "A conserver au frais et a consommer rapidement après achat.",
    availability: "Disponible selon le stock en boutique.",
    orderNote: "Produit vendu à l'unité.",
    tip: "Très utile pour accompagner poisson, viande ou sauce pimentee."
  },
  {
    id: "patate-douce-blanche",
    name: "Patate douce blanche",
    category: "Tubercules",
    priceValue: 4.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/patate douce blanche.jpg",
    description: "Patate douce blanche nourrissante, facile à cuire au four, a la vapeur ou en purée.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver dans un endroit sec, frais et ventile.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très bonne en accompagnement ou en plat complet."
  },
  {
    id: "igname-ghana",
    name: "Igname Ghana",
    category: "Tubercules",
    priceValue: 3.29,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/igname ghana.webp",
    description: "Igname du Ghana, incontournable pour de nombreux plats consistants et traditionnels.",
    origin: "Ghana.",
    storage: "A conserver dans un endroit sec et bien aere.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très pratique pour bouillir, frire ou transformer en purée."
  },
  {
    id: "manioc",
    name: "Manioc",
    category: "Tubercules",
    priceValue: 4.5,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/magnioc.jfif",
    description: "Manioc frais polyvalent, utilise dans de nombreuses recettes traditionnelles.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais si possible et a utiliser rapidement.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo.",
    tip: "A cuire ou transformer selon votre recette."
  },
  {
    id: "gombo-frais",
    name: "Gombo frais",
    category: "Légumes",
    priceValue: 8.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/Gombo.jfif",
    description: "Gombo frais, apprécié pour épaissir les sauces et apporter une texture specifique.",
    origin: "Togo.",
    storage: "A conserver au frais et a consommer rapidement.",
    availability: "Disponible selon saison.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Peut être cuit entier, coupe ou mixe selon la recette."
  },
  {
    id: "piment-antillais",
    name: "Piment antillais",
    category: "Épices",
    priceValue: 22,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/piment-fort-antillais.jpg",
    description: "Piment antillais très parfumé,très demandé du grand public.",
    origin: "Martinique.",
    storage: "A conserver au frais ou au sec selon l'état du produit.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo.",
    tip: "Apporte beaucoup de caractère a une sauce ou une marinade."
  },
  {
    id: "canne-a-sucre",
    name: "Canne à sucre",
    category: "Fruits",
    priceValue: 5,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/Canne à sucre.jpg",
    description: "Canne à sucre fraîche, naturellement sucrée, agréable à mâcher ou à presser.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver dans un endroit frais.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Peut être coupée en morceaux pour une dégustation simple."
  },
  {
    id: "christophine-blanche",
    name: "Christophine blanche",
    category: "Légumes",
    priceValue: 3.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/christophine blanche.jpg",
    description: "Christophine blanche tendre, facile a intégrer dans des gratins ou accompagnements.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais ou dans un endroit tempéré.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très appréciée pour les recettes douces et légumes farcis."
  },
  {
    id: "ail",
    name: "Ail",
    category: "Épices",
    priceValue: 1.5,
    unitMode: "count",
    unitLabel: "paquet",
    image: "images/ail.webp",
    description: "Ail parfumé, utile pour relever sauces, viandes, legumes et marinades.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver dans un endroit sec et aere.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu au paquet.",
    tip: "Base très utile pour une cuisine quotidienne."
  },
  {
    id: "citron-vert",
    name: "Citron vert",
    category: "Fruits",
    priceValue: 3.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/citron vert.webp",
    description: "Citron vert frais, ideal pour jus, marinades, desserts et boissons.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais pour garder la fraicheur.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Apporte une touche vive aux plats et boissons maison."
  },
  {
    id: "christophine-vert",
    name: "Christophine verte",
    category: "Légumes",
    priceValue: 3,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/christophine vert.jpg",
    description: "Christophine verte au goût délicat, appréciée en gratin ou cuisson douce.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver dans un endroit frais.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Se marie bien avec herbes et sauce cremeuse."
  },
  {
    id: "ananas",
    name: "Ananas",
    category: "Fruits",
    priceValue: 4,
    unitMode: "count",
    unitLabel: "pièce",
    image: "images/Ananas du bénin.webp",
    description: "Ananas parfumé, sucre et genereux, agréable nature, en jus ou en dessert.",
    origin: "Bénin.",
    storage: "A temperature ambiante puis au frais apres decoupe.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu a la piece. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Très apprécié pour les jus frais et salades de fruits."
  },
  {
    id: "citronnelle",
    name: "Citronnelle",
    category: "Épices",
    priceValue: 10,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/citronnelle.webp",
    description: "Citronnelle fraiche, utile pour infusions, bouillons et plats parfumes.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais ou a congeler en petite quantite.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Parfaite pour les infusions et les recettes parfumees."
  },
  {
    id: "papaye",
    name: "Papaye",
    category: "Fruits",
    priceValue: 5.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/papaye.webp",
    description: "Papaye douce et fondante, agréable nature, en smoothie ou en dessert.",
    origin: "Afrique de l'Ouest.",
    storage: "A temperature ambiante jusqu'a maturation, puis au frais.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Peut etre servie fraiche ou mixee."
  },
  {
    id: "cives",
    name: "Cives",
    category: "Épices",
    priceValue: 1.9,
    unitMode: "count",
    unitLabel: "pièce",
    image: "images/cives.jpg",
    description: "Cives fraiches, tres utiles pour assaisonner sauces, legumes et grillades.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais dans un linge legerement humide.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu a la piece. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Ajoute une note fraiche et parfume la cuisine du quotidien."
  },
  {
    id: "curcuma",
    name: "Curcuma",
    category: "Épices",
    priceValue: 12,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/Curcuma.webp",
    description: "Curcuma parfumé, apprécié pour sa couleur et sa profondeur en cuisine.",
    origin: "Inde.",
    storage: "A conserver au sec et à l'abri de l'humidité.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très utile pour assaisonner riz, sauces et marinades."
  },
  {
    id: "huile-de-palme",
    name: "Huile de palme",
    category: "Épicerie",
    priceValue: 7.9,
    unitMode: "count",
    unitLabel: "bouteille",
    image: "images/Huile de palme.webp",
    description: "Huile de palme pour recettes traditionnelles, sauces et plats familiaux.",
    origin: "Cameroun.",
    storage: "A conserver à l'abri de la chaleur et de la lumière.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu à la bouteille. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Base utile pour plusieurs recettes africaines."
  },
  {
    id: "piment-vegetarien",
    name: "Piment végétarien",
    category: "Épices",
    priceValue: 32,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/piment végétarien.webp",
    description: "Piment végétarien très parfumé, utile pour donner du goût sans force excessive.",
    origin: "Martinique.",
    storage: "A conserver au frais.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Idéal pour parfumer sauces et plats mijotés."
  },
  {
    id: "poudre-de-baobab",
    name: "Poudre de baobab",
    category: "Épicerie",
    priceValue: 6,
    unitMode: "count",
    unitLabel: "boîte",
    image: "images/poudre de baobab.webp",
    description: "Poudre acidulée pour jus, desserts, smoothies et préparations maison.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au sec et bien fermée.",
    availability: "Disponible selon le stock du jour.",
    orderNote: "Produit vendu à la boîte. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Peut être ajoutée à l'eau, au yaourt ou à une boisson maison."
  },
  
  {
    id: "comcombreamere",
    name: "Concombre amer",
    category: "Légumes",
    priceValue: 2,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/comcombreamere.webp",
    description: "Légume exotique au goût marqué, recherché pour certaines recettes traditionnelles.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Son profil affirme le rend très spécifique en cuisine."
  },
  {
    id: "dachine",
    name: "Dachine",
    category: "Tubercules",
    priceValue: 5.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/DACHINE.webp",
    description: "Tubercule nourrissant, pratique pour les sauces, plats cuisines et accompagnements.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver dans un endroit sec et tempéré.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très utile pour les recettes traditionnelles."
  },
  {
    id: "fruit-de-la-passion",
    name: "Fruit de la passion",
    category: "Fruits",
    priceValue: 2,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/fruit de la passion.jfif",
    description: "Fruit parfumé et acidulé, idéal en jus, dessert ou coulis.",
    origin: "Réunion.",
    storage: "A conserver au frais apres maturation.",
    availability: "Disponible selon saison.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Excellent pour parfumer un yaourt, un dessert ou une boisson."
  },
  {
    id: "gari",
    name: "Gari",
    category: "Épicerie",
    priceValue: 3.5,
    unitMode: "count",
    unitLabel: "paquet",
    image: "images/Gari-du-Togo-semoule-de-manioc-.jpg",
    description: "Semoule de manioc très pratique, utile au quotidien dans plusieurs preparations.",
    origin: "Togo.",
    storage: "A conserver au sec et bien refermé.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au paquet. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Peut être servi seul, hydrate ou accompagne d'une sauce."
  },
  {
    id: "harang",
    name: "Harang",
    category: "Poissonnerie",
    priceValue: 2,
    unitMode: "count",
    unitLabel: "pièce",
    image: "images/harang.jpg",
    description: "Poisson au goût prononcé, pratique pour sauces et recettes traditionnelles.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au frais.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu à la pièce. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Donne du caractère à de nombreux plats."
  },
  {
    id: "haricot",
    name: "Haricot",
    category: "Épicerie",
    priceValue: 5,
    unitMode: "count",
    unitLabel: "paquet",
    image: "images/haricots-blancs-secs.jpg",
    description: "Haricots secs pour sauces, plats mijotes et accompagnements nourrissants.",
    origin: "Togo.",
    storage: "A conserver au sec.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au paquet. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Base simple et utile dans beaucoup de cuisines."
  },
  {
    id: "igname-cameroun",
    name: "Igname Cameroun",
    category: "Tubercules",
    priceValue: 4,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/igname cameroun.jpg",
    description: "Igname du Cameroun, savoureuse et pratique pour des plats consistants.",
    origin: "Cameroun.",
    storage: "A conserver dans un endroit sec.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Peut être bouillie, frite ou transformée selon l'envie."
  },
  {
    id: "jus-de-gingembre",
    name: "Jus de gingembre",
    category: "Boissons",
    priceValue: 7,
    unitMode: "count",
    unitLabel: "bouteille",
    image: "images/jus de gingembre.webp",
    description: "Boisson tonique et parfumée, pratique à servir fraîche.",
    origin: "Spécialité maison du chef",
    storage: "A conserver au frais.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu à la bouteille. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "A servir très frais."
  },
  {
    id: "kombava",
    name: "Kombava",
    category: "Fruits",
    priceValue: 2,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/kombava.webp",
    description: "Agrume très parfumé, utile pour relever sauces, plats et desserts.",
    origin: "Inde.",
    storage: "A conserver au frais.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Son zeste et son parfum sont très recherchés."
  },
  {
    id: "macabo-cameroun",
    name: "Macabo Cameroun",
    origin: "Cameroun.",
    category: "Tubercules",
    priceValue: 5.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/macabo cameroun.webp",
    description: "Tubercule apprécié en accompagnement ou dans les plats mijotés.",
    storage: "A conserver dans un endroit sec et tempéré.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très utile pour diversifier les accompagnements."
  },
  {
    id: "morrue",
    name: "Morrue",
    category: "Poissonnerie",
    priceValue: 19.9,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/morrue portugal.jfif",
    description: "Morrue savoureuse pour accras, sauces, gratins et plats cuisines.",
    origin: "Portugal.",
    storage: "A conserver au frais.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo.",
    tip: "A déssaler ou préparer selon votre recette."
  },
  {
    id: "pate-arachide",
    name: "Pâte arachide",
    category: "Épicerie",
    priceValue: 6.9,
    unitMode: "count",
    unitLabel: "pot",
    image: "images/pate 🥜.webp",
    description: "Pâte onctueuse, idéale pour sauces, mafes et recettes gourmandes.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver bien fermée, au sec ou au frais après ouverture.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au pot. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Texture pratique et riche en goût."
  },
  {
    id: "patate-douce-rose",
    name: "Patate douce rose",
    category: "Tubercules",
    priceValue: 2.99,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/patet douce rose.jfif",
    description: "Patate douce rose légèrement sucré, très bonne au four, a la vapeur ou en purée.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver dans un endroit sec.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo.",
    tip: "Donne une texture douce et généreuse."
  },
  {
    id: "piment-oiseau",
    name: "Piment oiseau",
    category: "Épices",
    priceValue: 12,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/PIMENT_OISEAU.webp",
    description: "Petit piment très puissant pour relever les plats avec intensité.",
    origin: "Egypte.",
    storage: "A conserver au frais ou à faire sécher.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "A utiliser en petite quantité."
  },
  {
    id: "plantin-vert-colombie",
    name: "Plantain vert Colombie",
    category: "Fruits",
    priceValue: 2.5,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/plantin vert colombie.png",
    description: "Plantain vert de Colombie, apprécié pour fritures, chips ou accompagnements.",
    origin: "Colombie.",
    storage: "A conserver à temperature ambiante.",
    availability: "Disponible selon arrivage.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très pratique en cuisson salée."
  },
  {
    id: "sauce-graine",
    name: "Sauce graine",
    category: "Épicerie",
    priceValue: 7,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/sauce graine.webp",
    description: "Base savoureuse pour préparer une sauce graine riche et traditionnelle.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver selon l'état du produit, au frais si nécessaire.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très pratique pour gagner du temps en cuisine."
  },
  {
    id: "goussi",
    name: "Goussi",
    category: "Épicerie",
    priceValue: 8,
    unitMode: "count",
    unitLabel: "sachet",
    image: "images\\IMG-Goussi.jpg",
    description: "Goussi pratique pour préparer des sauces et recettes traditionnelles riches en goût.",
    origin: "Togo.",
    storage: "A conserver au sec, dans un contenant bien ferme.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au sachet. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Très utile pour les sauces maison et certaines preparations traditionnelles."
  },
  {
    id: "clou-de-girofle",
    name: "Clou de girofle",
    category: "Épices",
    priceValue: 8,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/clou de girofle.webp",
    description: "Epice puissante, utile pour infusions, marinades et plats epices.",
    origin: "Madagascar.",
    storage: "A conserver dans un endroit sec.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Son parfum est très marque."
  },
  {
    id: "baton-de-cannelle",
    name: "Bâton de cannelle",
    category: "Épices",
    priceValue: 6,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/cannelle.webp",
    description: "Cannelle en baton pour infusions, desserts, plats mijotés et boissons.",
    origin: "Sri Lanka.",
    storage: "A conserver au sec.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très utile pour les boissons et desserts maison."
  },
  {
    id: "baobab-poudre",
    name: "Baobab poudre",
    category: "Épicerie",
    priceValue: 10,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/poudre de baobab.webp",
    description: "Poudre de baobab pour boissons, smoothies et preparations acidulées.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au sec, bien refermee.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Peut être ajoutée à une boisson ou à une recette maison."
  },
  {
    id: "moringa",
    name: "Moringa",
    category: "Épicerie",
    priceValue: 9,
    unitMode: "count",
    unitLabel: "sachet",
    image: "images/feuille de moringa.webp",
    description: "Moringa appréciée dans certaines boissons et preparations maison.",
    origin: "Afrique de l'Ouest.",
    storage: "A conserver au sec.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "A utiliser selon vos habitudes de consommation."
  },
  {
    id: "attieke",
    name: "Attieke",
    category: "Épicerie",
    priceValue: 5,
    unitMode: "count",
    unitLabel: "boule",
    image: "images/attiéké.webp",
    description: "Semoule de manioc ivoirienne, legère et pratique en accompagnement.",
    origin: "Côte d'Ivoire.",
    storage: "A conserver au frais si nécessaire.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu a la boule. Choisissez le nombre souhaite avant l'ajout au panier.",
    tip: "Très bonne avec poisson, viande ou légumes."
  },
  {
    id: "Fruit à pain",
    name: "Fruit à pain",
    category: "Fruits",
    priceValue: 6,
    unitMode: "weight",
    unitLabel: "kg",
    image: "images/Fruit à pain.webp",
    description: "Fruit exotique de Martinique, idéal pour les desserts et les smoothies.",
    origin : "martinique.",
    storage: "A conserver au frais si nécessaire.",
    availability: "Disponible selon stock.",
    orderNote: "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.",
    tip: "Très utile pour les desserts et smoothies."
  },
  
];

// Construit l'URL de la fiche detaillee a partir de l'identifiant produit.
function productUrl(product) {
  return `produit.html?id=${encodeURIComponent(product.id)}`;
}
// Informations globales du site et cles de stockage du navigateur.
const siteInfo = {
  brand: "Capri Exo",
  whatsappNumber: "33600000000",
  keys: {
    favorites: "capriExoFavoris",
    favoritesIndex: "capriExoFavorisIndex",
    cart: "capriExoPanier",
    client: "capriExoClient",
    clients: "capriExoClients",
    reviews: "capriExoAvis",
    messages: "capriExoMessages",
    orders: "capriExoCommandes",
    orderDraft: "capriExoCommandeBrouillon",
    productCatalog: "capriExoProduits",
    inventory: "capriExoInventaire"
  },
  backend: {
    enabled: true,
    baseUrl: "http://127.0.0.1:8000/api",
    mode: "local-first",
    version: "prep-v2",
    resources: ["products", "inventory", "clients", "favorites", "orders", "reviews", "messages"]
  }
};

const markets = [
  {
    id: "cergy",
    name: "Marché de Cergy",
    city: "Cergy-Saint-Christophe",
    stand: "Allée centrale, côté fruits et légumes",
    schedule: "Mercredi et Samedi de 8h à 13h30",
    image: "images/marche-cergy.jpg",
    imageTitle: "Stand Capri Exo au marché de Cergy",
    summary: "Un marché de matinée pratique pour retrouver une sélection de produits exotiques, de fruits, de légumes et d'épicerie dans une ambiance vivante et familiale.",
    note: "Point de repère conseillé : repérez le stand près des arrivages frais et des produits du quotidien. Cet emplacement est idéal pour un passage rapide en semaine ou le samedi matin."
  },
  {
    id: "mantes-la-jolie",
    name: "Marché du Val Fourré",
    city: "Mantes-la-Jolie",
    stand: "Zone commerçante principale, à proximité des stands d'épicerie",
    schedule: "Mardi et Vendredi de 11h à 18h30",
    image: "images/marche-mantes-la-jolie.jpg",
    imageTitle: "Ajoute ici une photo du stand de Mantes-la-Jolie",
    summary: "Un deuxième point de présence pensé pour les clients qui souhaitent retrouver Capri Exo plus tard dans la journée, avec une sélection adaptée aux achats du quotidien.",
    note: "Ce marché permet de passer après la matinée, de poser une question sur un produit et de retrouver plus facilement certains articles selon les arrivages."
  },
];

// Etat UI partage entre les differentes pages.
let currentCategoryFilter = "all";
let currentFavoritesOnly = false;
let currentSortOption = "default";
let currentAvailabilityFilter = "all";
let currentUnitModeFilter = "all";
let currentTagFilter = "all";
let pageTransitionRunning = false;
let toastTimer = 0;
let revealObserver = null;

// Transforme un nombre en prix au format francais.
function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

// Lit une valeur dans le localStorage et retourne un fallback si besoin.
function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

// Ecrit une valeur dans le localStorage.
function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateRecordId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function prepareProductsForBackend() {
  products.forEach((product, index) => {
    const stockUnit = product.unitMode === "weight" ? "kg" : "unit";
    const normalizedTags = Array.isArray(product.tags) ? product.tags : [];

    Object.assign(product, {
      sku: product.sku ?? `CAPRI-${String(index + 1).padStart(4, "0")}`,
      tags: normalizedTags,
      stockUnit: product.stockUnit ?? stockUnit,
      stockQuantity: product.stockQuantity ?? null,
      stockReserved: Number(product.stockReserved ?? 0),
      stockStatus: product.stockStatus ?? "available",
      featuredRank: Number(product.featuredRank ?? index + 1),
      productStatus: product.productStatus ?? "active",
      reviewEnabled: product.reviewEnabled ?? true,
      updatedAt: product.updatedAt ?? new Date().toISOString()
    });
  });
}

function productCatalogDefaults() {
  return products.reduce((collection, product) => {
    collection[product.id] = {
      id: product.id,
      sku: product.sku,
      slug: product.slug ?? product.id,
      name: product.name,
      category: product.category,
      unitMode: product.unitMode,
      unitLabel: product.unitLabel,
      priceValue: product.priceValue,
      priceLabel: product.priceLabel,
      image: product.image,
      tags: [...product.tags],
      productStatus: product.productStatus,
      reviewEnabled: product.reviewEnabled,
      featuredRank: product.featuredRank,
      updatedAt: product.updatedAt
    };
    return collection;
  }, {});
}

function getProductCatalog() {
  const stored = readStore(siteInfo.keys.productCatalog, null);
  return stored && typeof stored === "object" ? stored : productCatalogDefaults();
}

function saveProductCatalog(catalog) {
  writeStore(siteInfo.keys.productCatalog, catalog);
}

function rawClientSession() {
  return readStore(siteInfo.keys.client, null);
}

function normalizeClientRecord(client) {
  if (!client) {
    return null;
  }

  return {
    id: client.id ?? client.clientId ?? generateRecordId("client"),
    name: client.name ?? client.nom ?? "",
    email: client.email ?? "",
    phone: client.phone ?? client.telephone ?? "",
    address: client.address ?? client.adresse ?? "",
    city: client.city ?? client.ville ?? "",
    postalCode: client.postalCode ?? client.codePostal ?? "",
    role: client.role ?? "customer",
    status: client.status ?? "active",
    createdAt: client.createdAt ?? client.dateInscription ?? new Date().toISOString(),
    updatedAt: client.updatedAt ?? client.createdAt ?? client.dateInscription ?? new Date().toISOString()
  };
}

function getClients() {
  return readStore(siteInfo.keys.clients, []).map((client) => normalizeClientRecord(client)).filter(Boolean);
}

function saveClients(clients) {
  writeStore(siteInfo.keys.clients, clients);
}

function upsertClientRecord(clientInput) {
  const client = normalizeClientRecord(clientInput);
  const clients = getClients();
  const emailKey = normalizeEmail(client.email);
  const index = clients.findIndex((entry) => normalizeEmail(entry.email) === emailKey && emailKey);
  const now = new Date().toISOString();

  if (index >= 0) {
    const merged = {
      ...clients[index],
      ...client,
      id: clients[index].id,
      updatedAt: now
    };
    clients[index] = merged;
    saveClients(clients);
    return merged;
  }

  const created = {
    ...client,
    id: client.id || generateRecordId("client"),
    createdAt: client.createdAt || now,
    updatedAt: now
  };
  clients.push(created);
  saveClients(clients);
  return created;
}

function inventoryDefaults() {
  return products.reduce((collection, product) => {
    collection[product.id] = {
      productId: product.id,
      sku: product.sku,
      stockUnit: product.stockUnit,
      stockQuantity: product.stockQuantity,
      stockReserved: product.stockReserved,
      stockStatus: product.stockStatus,
      updatedAt: product.updatedAt
    };
    return collection;
  }, {});
}

function getInventoryMap() {
  const stored = readStore(siteInfo.keys.inventory, null);
  return stored && typeof stored === "object" ? stored : inventoryDefaults();
}

function saveInventoryMap(inventory) {
  writeStore(siteInfo.keys.inventory, inventory);
}

function stockStatusFromInventory(record, fallbackStatus = "available") {
  if (!record) {
    return fallbackStatus;
  }

  const rawQuantity = record.stockQuantity;
  if (rawQuantity === null || rawQuantity === undefined || rawQuantity === "") {
    return record.stockStatus || fallbackStatus;
  }

  const quantity = Number(rawQuantity);
  if (!Number.isFinite(quantity)) {
    return record.stockStatus || fallbackStatus;
  }

  if (quantity <= 0) {
    return "unavailable";
  }

  const lowThreshold = record.stockUnit === "kg" ? 1 : 5;
  return quantity <= lowThreshold ? "limited" : "available";
}

function reserveInventoryForOrder(order) {
  const inventory = getInventoryMap();
  let hasChanged = false;

  order.items.forEach((item) => {
    const record = inventory[item.id];
    if (!record) {
      return;
    }

    const rawQuantity = record.stockQuantity;
    if (rawQuantity === null || rawQuantity === undefined || rawQuantity === "") {
      return;
    }

    const currentQuantity = Number(rawQuantity);
    if (!Number.isFinite(currentQuantity)) {
      return;
    }

    const reservedAmount = item.unitMode === "weight"
      ? Number(item.weight || 0)
      : Number(item.quantity || 0);

    record.stockQuantity = Math.max(0, currentQuantity - reservedAmount);
    record.stockReserved = Number(record.stockReserved || 0) + reservedAmount;
    record.stockStatus = stockStatusFromInventory(record, record.stockStatus);
    record.updatedAt = new Date().toISOString();
    hasChanged = true;
  });

  if (hasChanged) {
    saveInventoryMap(inventory);
  }
}

function favoriteOwnerKey() {
  const client = normalizeClientRecord(rawClientSession());
  return client?.id ? `client:${client.id}` : "guest";
}

function getFavoritesIndex() {
  const existing = readStore(siteInfo.keys.favoritesIndex, null);
  if (existing && typeof existing === "object") {
    return existing;
  }

  const legacyFavorites = readStore(siteInfo.keys.favorites, []);
  const migrated = {
    guest: Array.isArray(legacyFavorites) ? [...new Set(legacyFavorites)] : []
  };

  writeStore(siteInfo.keys.favoritesIndex, migrated);
  return migrated;
}

function saveFavoritesIndex(index) {
  writeStore(siteInfo.keys.favoritesIndex, index);
}

function getScopedFavorites() {
  const index = getFavoritesIndex();
  return index[favoriteOwnerKey()] || [];
}

function saveScopedFavorites(favorites) {
  const index = getFavoritesIndex();
  index[favoriteOwnerKey()] = [...new Set(favorites)];
  saveFavoritesIndex(index);
  writeStore(siteInfo.keys.favorites, index[favoriteOwnerKey()]);
}

function backendEnabled() {
  return Boolean(siteInfo.backend?.enabled && siteInfo.backend?.baseUrl);
}

function apiBaseUrl() {
  return String(siteInfo.backend?.baseUrl || "").replace(/\/+$/, "");
}

function isUsableApiImage(url) {
  return Boolean(url) && !/example\.com/i.test(String(url));
}

function normalizeProductKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function backendCategoryLabel(category) {
  const labels = {
    fruits: "Fruits",
    legumes: "Légumes",
    epices: "Épices",
    epicerie: "Épicerie",
    poissonnerie: "Poissonnerie",
    boissons: "Boissons",
    traiteur: "Traiteur"
  };

  return labels[String(category || "").toLowerCase()] || category || "Produits";
}

function buildApiAvailability(apiProduct, localProduct) {
  const stockQuantity = Number(apiProduct.stock_qty ?? localProduct?.stockQuantity ?? 0);

  if (apiProduct.in_stock === false || stockQuantity <= 0) {
    return "Indisponible pour le moment.";
  }

  if (Number.isFinite(stockQuantity) && stockQuantity > 0 && stockQuantity <= 5) {
    return `Stock limité : ${stockQuantity} ${apiProduct.unit || localProduct?.unitLabel || "article(s)"} disponible(s).`;
  }

  if (Number.isFinite(stockQuantity) && stockQuantity > 0) {
    return `Disponible actuellement : ${stockQuantity} ${apiProduct.unit || localProduct?.unitLabel || "article(s)"} en stock.`;
  }

  return localProduct?.availability || "Disponible actuellement.";
}

function buildApiOrderNote(unitMode, unitLabel) {
  if (unitMode === "weight") {
    return "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.";
  }

  return "Produit vendu a l'unite. Choisissez le nombre souhaite avant l'ajout au panier.";
}

function localCatalogMatch(apiProduct) {
  const apiKeys = [
    normalizeProductKey(apiProduct.slug),
    normalizeProductKey(apiProduct.name)
  ].filter(Boolean);

  return products.find((product) => {
    const productKeys = [normalizeProductKey(product.id), normalizeProductKey(product.name)];
    return apiKeys.some((key) => productKeys.some((productKey) => (
      productKey === key
      || productKey.includes(key)
      || key.includes(productKey)
    )));
  }) || null;
}

function mapApiProductToFront(apiProduct) {
  const localProduct = localCatalogMatch(apiProduct);
  const unitMode = String(apiProduct.unit || "").toLowerCase() === "kg" ? "weight" : "count";
  const stockQuantity = apiProduct.stock_qty === null || apiProduct.stock_qty === undefined
    ? localProduct?.stockQuantity ?? null
    : Number(apiProduct.stock_qty);

  const stockStatus = apiProduct.in_stock === false || Number(stockQuantity || 0) <= 0
    ? "unavailable"
    : Number(stockQuantity || 0) <= (unitMode === "weight" ? 1 : 5)
      ? "limited"
      : "available";

  return {
    ...(localProduct || {}),
    id: localProduct?.id || apiProduct.slug || normalizeProductKey(apiProduct.name),
    name: apiProduct.name || localProduct?.name || "Produit",
    category: backendCategoryLabel(apiProduct.category || localProduct?.category),
    priceValue: Number(apiProduct.price_eur ?? localProduct?.priceValue ?? 0),
    unitMode,
    unitLabel: apiProduct.unit || localProduct?.unitLabel || "pièce",
    image: isUsableApiImage(apiProduct.image_url) ? apiProduct.image_url : (localProduct?.image || ""),
    description: apiProduct.description || localProduct?.description || "",
    storage: localProduct?.storage || "Informations de conservation a completer.",
    availability: buildApiAvailability(apiProduct, localProduct),
    orderNote: localProduct?.orderNote || buildApiOrderNote(unitMode, apiProduct.unit || localProduct?.unitLabel || "pièce"),
    tip: localProduct?.tip || "Informations complementaires a completer.",
    slug: apiProduct.slug || localProduct?.id || normalizeProductKey(apiProduct.name),
    stockQuantity,
    stockStatus,
    backendId: apiProduct.id,
    backendSlug: apiProduct.slug || "",
    source: "api"
  };
}

function refreshPreparedCatalogState() {
  prepareProductsForBackend();
  saveProductCatalog({ ...getProductCatalog(), ...productCatalogDefaults() });
  saveInventoryMap({ ...getInventoryMap(), ...inventoryDefaults() });
}

async function apiRequest(path, options = {}) {
  if (!backendEnabled()) {
    return null;
  }

  const requestHeaders = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: options.method || "GET",
    headers: requestHeaders,
    body: options.body,
    mode: "cors"
  });

  if (!response.ok) {
    throw new Error(`API ${response.status} sur ${path}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function mergeCatalogWithApi(apiProducts) {
  const mappedProducts = apiProducts.map((apiProduct) => mapApiProductToFront(apiProduct));
  const apiIds = new Set(mappedProducts.map((product) => product.id));
  const fallbackProducts = products
    .filter((product) => !apiIds.has(product.id))
    .map((product) => ({ ...product, source: product.source || "local" }));

  products.splice(0, products.length, ...mappedProducts, ...fallbackProducts);
  refreshPreparedCatalogState();
}

async function hydrateCatalogFromApi() {
  if (!backendEnabled()) {
    return;
  }

  try {
    const apiProducts = await apiRequest("/products/");

    if (Array.isArray(apiProducts) && apiProducts.length) {
      mergeCatalogWithApi(apiProducts);
    }
  } catch (error) {
    console.warn("Capri Exo API produits indisponible :", error);
  }
}

function orderApiPayload(order) {
  return {
    customer_name: order.client?.name || "",
    customer_email: order.client?.email || "",
    customer_phone: order.client?.phone || "",
    customer_address: [order.client?.address || "", order.client?.postalCode || "", order.client?.city || ""].filter(Boolean).join(", "),
    frontend_order_number: order.number,
    frontend_client_id: order.clientId || "",
    delivery_mode: order.deliveryMode,
    pickup_market: order.pickupMarket,
    pickup_slot: order.timeSlot,
    payment_mode: order.paymentMode,
    payment_status: order.paymentStatus,
    items: order.items.map((item) => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      weight: item.weight,
      unit_mode: item.unitMode,
      stock_unit: item.stockUnit,
      amount: item.amount
    })),
    total_estimated: Number(order.total || 0).toFixed(2),
    notes: [
      order.note || "",
      `Source: ${order.source || "website"}`,
      `Retrait: ${order.pickupMarket || ""}`,
      `Confirmation: ${order.confirmationStatus || ""}`
    ].filter(Boolean).join("\n")
  };
}

async function syncOrderToApi(order) {
  try {
    return await apiRequest("/order-requests/", {
      method: "POST",
      body: JSON.stringify(orderApiPayload(order))
    });
  } catch (error) {
    console.warn("Capri Exo API commande indisponible :", error);
    return null;
  }
}

async function syncContactMessageToApi(message) {
  try {
    return await apiRequest("/contact-messages/", {
      method: "POST",
      body: JSON.stringify({
        name: message.name,
        email: message.email,
        phone: message.phone || "",
        market_code: message.marketId || "",
        subject: `Demande depuis ${findMarket(message.marketId).name}`,
        message: message.text,
        status: message.status || "received"
      })
    });
  } catch (error) {
    console.warn("Capri Exo API contact indisponible :", error);
    return null;
  }
}

async function syncReviewToApi(review) {
  try {
    return await apiRequest("/reviews/", {
      method: "POST",
      body: JSON.stringify({
        author_name: review.name,
        author_email: review.email,
        market_code: review.marketId || "",
        rating: review.rating,
        comment: review.text
      })
    });
  } catch (error) {
    console.warn("Capri Exo API avis indisponible :", error);
    return null;
  }
}

prepareProductsForBackend();
saveProductCatalog({ ...productCatalogDefaults(), ...getProductCatalog() });
saveInventoryMap({ ...inventoryDefaults(), ...getInventoryMap() });

// Nettoie un texte avant de l'inserer dans du HTML genere en JavaScript.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function findMarket(marketId) {
  return markets.find((market) => market.id === marketId) || markets[0];
}

function marketNamesSummary() {
  return markets.map((market) => market.city).join(" et ");
}

function marketPickupSummary() {
  return `Retrait possible sur nos marchés de ${marketNamesSummary()}.`;
}

function pickupMarketLabel(marketId) {
  return findMarket(marketId).name;
}

function marketWhatsAppUrl(market) {
  const cleanNumber = String(siteInfo.whatsappNumber || "").replace(/\D/g, "");
  const message = encodeURIComponent(`Bonjour ${siteInfo.brand}, je souhaite un renseignement sur votre présence au ${market.name}.`);
  return cleanNumber ? `https://wa.me/${cleanNumber}?text=${message}` : "#";
}

function marketCardMarkup(market, options = {}) {
  const showContactButton = options.showContactButton !== false;
  const marketVisual = market.image
    ? `
      <img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.imageTitle || market.name)}">
    `
    : `
      <div class="photo-placeholder">
        <span class="photo-placeholder-kicker">${escapeHtml(market.city)}</span>
        <strong>${escapeHtml(market.imageTitle)}</strong>
      </div>
    `;

  return `
    <article class="market-location-card">
      <div class="photo-frame photo-frame-medium">
        ${marketVisual}
      </div>
      <div class="market-location-content">
        <h3>${escapeHtml(market.name)}</h3>
        <p class="market-location-summary">${escapeHtml(market.summary)}</p>
        <ul class="market-location-meta">
          <li><strong>Ville :</strong> ${escapeHtml(market.city)}</li>
          <li><strong>Emplacement :</strong> ${escapeHtml(market.stand)}</li>
          <li><strong>Horaires :</strong> ${escapeHtml(market.schedule)}</li>
        </ul>
        <p class="market-location-note">${escapeHtml(market.note)}</p>
        ${showContactButton ? `<a class="button button-secondary" href="${marketWhatsAppUrl(market)}" target="_blank" rel="noopener noreferrer">Contacter pour ${escapeHtml(market.city)}</a>` : ""}
      </div>
    </article>
  `;
}

function renderMarketGrid(targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  const showContactButton = !["marketLocationsGrid", "aboutMarketsGrid"].includes(targetId);
  target.innerHTML = markets.map((market) => marketCardMarkup(market, { showContactButton })).join("");
}

function renderFooterMarkets() {
  document.querySelectorAll(".footer-brand").forEach((block) => {
    let footerMarkets = block.querySelector(".footer-markets");
    if (!footerMarkets) {
      footerMarkets = document.createElement("p");
      footerMarkets.className = "footer-markets";
      block.appendChild(footerMarkets);
    }

    footerMarkets.textContent = `Présent sur les marchés de ${marketNamesSummary()}.`;
  });
}

function setupBackToTopButton() {
  const button = document.getElementById("backToTopProducts");

  if (!button) {
    return;
  }

  const syncVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 380);
  };

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", syncVisibility, { passive: true });
  syncVisibility();
}

function closeResponsiveNav() {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) {
    return;
  }

  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Ouvrir le menu");
  document.body.classList.remove("nav-open");
}

function setupResponsiveNav() {
  const nav = document.querySelector(".site-nav");
  const navLinks = nav ? nav.querySelector(".nav-links") : null;

  if (!nav || !navLinks) {
    return;
  }

  nav.classList.add("has-toggle");

  if (!navLinks.id) {
    navLinks.id = "site-nav-links";
  }

  let toggle = nav.querySelector(".nav-toggle");

  if (!toggle) {
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", navLinks.id);
    toggle.innerHTML = `
      <span class="nav-toggle-bars" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;

    nav.appendChild(toggle);
  }

  const syncNavState = () => {
    const mobileMode = window.innerWidth <= 920;

    if (!mobileMode) {
      closeResponsiveNav();
      toggle.setAttribute("aria-hidden", "true");
      return;
    }

    toggle.setAttribute("aria-hidden", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("nav-open", open);
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 920) {
      return;
    }

    if (!nav.contains(event.target)) {
      closeResponsiveNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeResponsiveNav();
    }
  });

  window.addEventListener("resize", syncNavState);
  syncNavState();
}

function syncCurrentNavigation() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = currentFile === "produit.html" ? "produits.html" : currentFile;

  document.querySelectorAll('.site-nav .nav-links a[aria-current="page"], .footer-links a[aria-current="page"], .nav-login-link[aria-current="page"]').forEach((link) => {
    link.removeAttribute("aria-current");
  });

  document.querySelectorAll(`.site-nav .nav-links a[href="${currentPage}"], .footer-links a[href="${currentPage}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });

  const loginLink = document.querySelector('.nav-login-link[href="connexion.html"]');
  if (currentPage === "connexion.html" && loginLink) {
    loginLink.setAttribute("aria-current", "page");
  }
}

function setupRevealAnimations() {
  const selectors = [
    ".page-banner",
    ".content-card",
    ".feature-card",
    ".photo-frame",
    ".market-location-card",
    ".review-card",
    ".summary-card",
    ".product-card",
    ".cart-item",
    ".product-detail"
  ];

  const nodes = Array.from(document.querySelectorAll(selectors.join(",")))
    .filter((node) => !node.dataset.revealBound)
    .filter((node) => {
      if (node.classList.contains("photo-frame") && node.closest(".market-location-card, .hero-photo-panel")) {
        return false;
      }

      return true;
    });

  if (!nodes.length) {
    return;
  }

  nodes.forEach((node, index) => {
    node.classList.add("reveal-on-scroll");
    node.dataset.revealBound = "true";

    if (
      node.matches(".content-card, .feature-card, .photo-frame, .market-location-card, .review-card, .product-card, .cart-item")
    ) {
      node.classList.add("reveal-card");
    }

    node.style.setProperty("--reveal-delay", `${Math.min(index * 45, 280)}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -6% 0px"
    });
  }

  requestAnimationFrame(() => {
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");

      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
        node.classList.add("is-visible");
        return;
      }

      revealObserver.observe(node);
    });
  });
}

function getFavorites() {
  return getScopedFavorites();
}

// Relit le panier et normalise d'anciennes structures si elles existent encore.
function getCart() {
  return readStore(siteInfo.keys.cart, []).map((line) => ({
    id: line.id,
    quantity: Number(line.quantity ?? line.quantite ?? 1),
    weight: Number(line.weight ?? line.kilos ?? 0)
  }));
}

// Relit les informations du client, meme si elles viennent d'une ancienne version.
function getClient() {
  return normalizeClientRecord(rawClientSession());
}

function getReviews() {
  return readStore(siteInfo.keys.reviews, []).map((review) => ({
    id: review.id ?? generateRecordId("review"),
    name: review.name ?? review.nom ?? "Client",
    email: review.email ?? "",
    marketId: review.marketId ?? review.market ?? "cergy",
    rating: Number(review.rating ?? review.note ?? 5),
    text: review.text ?? review.texte ?? "",
    status: review.status ?? "published",
    verifiedOrder: Boolean(review.verifiedOrder ?? false),
    createdAt: review.createdAt ?? review.date ?? "",
    updatedAt: review.updatedAt ?? review.createdAt ?? review.date ?? ""
  }));
}

function getMessages() {
  return readStore(siteInfo.keys.messages, []).map((message) => ({
    id: message.id ?? generateRecordId("message"),
    name: message.name ?? message.nom ?? "",
    email: message.email ?? "",
    marketId: message.marketId ?? message.market ?? "cergy",
    text: message.text ?? message.texte ?? "",
    status: message.status ?? "received",
    createdAt: message.createdAt ?? message.date ?? "",
    updatedAt: message.updatedAt ?? message.createdAt ?? message.date ?? ""
  }));
}

function getOrders() {
  return readStore(siteInfo.keys.orders, []).map((order) => ({
    id: order.id ?? generateRecordId("order"),
    number: order.number ?? "",
    clientId: order.clientId ?? order.client?.id ?? null,
    client: order.client ?? null,
    items: Array.isArray(order.items) ? order.items.map((item) => ({
      id: item.id ?? "",
      sku: item.sku ?? "",
      name: item.name ?? item.id ?? "",
      quantity: Number(item.quantity ?? 1),
      weight: Number(item.weight ?? 0),
      unitMode: item.unitMode ?? "count",
      amount: Number(item.amount ?? 0),
      stockUnit: item.stockUnit ?? "unit"
    })) : [],
    total: Number(order.total ?? 0),
    totalItems: Number(order.totalItems ?? 0),
    deliveryMode: order.deliveryMode ?? "pickup",
    pickupMarket: order.pickupMarket ?? "cergy",
    timeSlot: order.timeSlot ?? "",
    paymentMode: order.paymentMode ?? "shop",
    paymentStatus: order.paymentStatus ?? "pending",
    fulfillmentStatus: order.fulfillmentStatus ?? "new",
    confirmationStatus: order.confirmationStatus ?? "manual-only",
    confirmationEmail: order.confirmationEmail ?? order.client?.email ?? "",
    source: order.source ?? "website",
    note: order.note ?? "",
    createdAt: order.createdAt ?? "",
    updatedAt: order.updatedAt ?? order.createdAt ?? ""
  }));
}

function defaultOrderDraft() {
  return {
    deliveryMode: "pickup",
    pickupMarket: "cergy",
    timeSlot: "",
    paymentMode: "shop",
    note: ""
  };
}

function getOrderDraft() {
  const draft = readStore(siteInfo.keys.orderDraft, defaultOrderDraft());
  return {
    deliveryMode: draft.deliveryMode ?? "pickup",
    pickupMarket: draft.pickupMarket ?? "cergy",
    timeSlot: draft.timeSlot ?? "",
    paymentMode: draft.paymentMode ?? "shop",
    note: draft.note ?? ""
  };
}

function saveOrderDraft(patch) {
  writeStore(siteInfo.keys.orderDraft, { ...getOrderDraft(), ...patch });
}

function resetOrderDraft() {
  writeStore(siteInfo.keys.orderDraft, defaultOrderDraft());
}

// Retrouve rapidement un produit a partir de son identifiant.
function findProduct(productId) {
  return products.find((product) => product.id === productId) || null;
}

function isWeightProduct(product) {
  return product.unitMode === "weight";
}

function unitDisplay(product) {
  return isWeightProduct(product) ? `/${product.unitLabel}` : `par ${product.unitLabel}`;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

function productAvailabilityMeta(product) {
  const status = productStockStatus(product);

  if (status === "unavailable") {
    return {
      label: "Indisponible",
      className: "is-unavailable",
      canOrder: false
    };
  }

  if (status === "limited") {
    return {
      label: "Arrivage limité",
      className: "is-limited",
      canOrder: true
    };
  }

  return {
    label: "Disponible",
    className: "is-available",
    canOrder: true
  };
}

function productStockStatus(product) {
  const inventory = getInventoryMap();
  return stockStatusFromInventory(inventory[product.id], product.stockStatus || "available");
}

function productCatalogOrder(product) {
  return products.findIndex((item) => item.id === product.id);
}

function availabilityBadgeMarkup(product) {
  const meta = productAvailabilityMeta(product);
  return `<span class="availability-badge ${meta.className}">${meta.label}</span>`;
}

function productTagClass(tag) {
  return `tag-${tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`;
}

function productTagMarkup(tag) {
  return `<span class="product-tag ${productTagClass(tag)}">${escapeHtml(tag)}</span>`;
}

function allProductTags() {
  return [...new Set(products.flatMap((product) => product.tags || []))];
}

function cartItemCount(cart) {
  return cart.reduce((sum, line) => {
    const product = findProduct(line.id);
    return sum + (product && isWeightProduct(product) ? 1 : Number(line.quantity || 1));
  }, 0);
}

function cartTotal(cart) {
  return cart.reduce((sum, line) => {
    const product = findProduct(line.id);
    return product ? sum + calculateAmount(product, line.quantity, line.weight) : sum;
  }, 0);
}

function productAbbr(product) {
  return product.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Construit la zone visuelle du produit.
// Si une image existe, elle est affichee dans la carte ou la fiche detaillee.
function mediaMarkup(product, detail = false) {
  const className = detail ? "detail-media" : "product-media";
  const contentClass = detail ? "detail-media-content" : "product-media-content";
  const titleClass = detail ? "detail-media-title" : "product-media-title";
  const hasImageClass = product.image ? " has-image" : "";
  const imageMarkup = product.image
    ? `<img class="product-media-image${detail ? " detail-media-image" : ""}" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`
    : "";

  return `
    <div class="${className}${hasImageClass}" data-abbr="${escapeHtml(productAbbr(product))}">
      ${imageMarkup}
      <div class="${contentClass}">
        <span class="media-category">${escapeHtml(product.category)}</span>
      </div>
    </div>
  `;
}

function cartQuantityDefault(product) {
  return isWeightProduct(product) ? 0.5 : 1;
}

// Calcule le montant estime d'un produit selon son mode de vente.
function calculateAmount(product, quantity, weight) {
  const base = isWeightProduct(product)
    ? Math.max(0.1, Number(weight || 0))
    : Math.max(1, Number(quantity || 1));

  return product.priceValue * base;
}

function formatPreview(product, quantity, weight) {
  if (isWeightProduct(product)) {
    const safeWeight = Math.max(0.1, Number(weight || 0.5));
    const grams = Math.round(safeWeight * 1000);
    return `${grams} g : ${money(calculateAmount(product, quantity, safeWeight))}`;
  }

  const safeQuantity = Math.max(1, Number(quantity || 1));
  return `${safeQuantity} article(s) : ${money(calculateAmount(product, safeQuantity, 0))}`;
}

function favoriteActive(productId) {
  return getFavorites().includes(productId);
}

// Ajoute ou retire un produit des favoris puis relance l'affichage utile.
function toggleFavorite(productId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(productId)
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];

  saveScopedFavorites(nextFavorites);
  renderCurrentPage();
}

function updateCartBadge() {
  const totalItems = cartItemCount(getCart());
  document.querySelectorAll(".badge-panier").forEach((badge) => {
    badge.textContent = totalItems;
  });
}

// Ajoute un produit au panier depuis une carte ou depuis une fiche detaillee.
function addToCart(productId, sourceElement = document) {
  const product = findProduct(productId);

  if (!product) {
    return;
  }

  if (!productAvailabilityMeta(product).canOrder) {
    showToast(`${product.name} est actuellement indisponible.`);
    return;
  }

  const scope = sourceElement.closest(".product-card, .product-detail") || document;
  const quantityInput = scope.querySelector("[data-product-quantity]");
  const weightInput = scope.querySelector("[data-product-weight]");
  const cart = getCart();
  const existingLine = cart.find((line) => line.id === productId);
  const quantity = isWeightProduct(product) ? 1 : Math.max(1, Number(quantityInput ? quantityInput.value : 1));
  const weight = isWeightProduct(product) ? Math.max(0.1, Number(weightInput ? weightInput.value : 0.5)) : 0;

  if (existingLine) {
    if (isWeightProduct(product)) {
      existingLine.weight += weight;
      existingLine.quantity = 1;
    } else {
      existingLine.quantity += quantity;
    }
  } else {
    cart.push({ id: productId, quantity, weight });
  }

  writeStore(siteInfo.keys.cart, cart);
  updateCartBadge();
  renderCartPage();
  showToast(`${product.name} a été ajouté au panier.`);
}

function updateCartLine(productId, field, value) {
  const cart = getCart();
  const line = cart.find((entry) => entry.id === productId);

  if (!line) {
    return;
  }

  if (field === "quantity") {
    line.quantity = Math.max(1, Number(value || 1));
  }

  if (field === "weight") {
    line.weight = Math.max(0.1, Number(value || 0.5));
  }

  writeStore(siteInfo.keys.cart, cart);
  updateCartBadge();
  renderCartPage();
}

function removeFromCart(productId) {
  const nextCart = getCart().filter((entry) => entry.id !== productId);
  writeStore(siteInfo.keys.cart, nextCart);
  updateCartBadge();
  renderCartPage();
}

function clearCartWithMessage(message) {
  writeStore(siteInfo.keys.cart, []);
  updateCartBadge();
  renderCartPage();
  setMessage("messageCommande", message);
}

function setMessage(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
  }
}

function ensureToast() {
  let toast = document.getElementById("siteToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "site-toast";
    document.body.appendChild(toast);
  }

  return toast;
}

function showToast(message) {
  const toast = ensureToast();
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function deliveryModeLabel(value) {
  if (value === "delivery") {
    return "Livraison";
  }

  return "Retrait sur le marché";
}

function paymentModeLabel(value) {
  if (value === "online") {
    return "Paiement en ligne";
  }

  if (value === "delivery") {
    return "Paiement à la livraison";
  }

  return "Paiement au stand";
}

function orderItemsSummary(cart) {
  return cart
    .map((line) => {
      const product = findProduct(line.id);

      if (!product) {
        return "";
      }

      return isWeightProduct(product)
        ? `- ${product.name} : ${Math.round(Number(line.weight || 0.5) * 1000)} g (${money(calculateAmount(product, line.quantity, line.weight))})`
        : `- ${product.name} : ${Math.max(1, Number(line.quantity || 1))} article(s) (${money(calculateAmount(product, line.quantity, line.weight))})`;
    })
    .filter(Boolean)
    .join("\n");
}

function detailItemMarkup(label, value) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return "";
  }

  return `
    <article>
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(value)}</span>
    </article>
  `;
}

function buildWhatsAppMessage(cart, client = null, draft = getOrderDraft()) {
  const lines = [
    `Bonjour ${siteInfo.brand},`,
    "",
    "Je souhaite passer une commande :",
    orderItemsSummary(cart),
    "",
    `Total estimé : ${money(cartTotal(cart))}`,
    `Mode de réception : ${deliveryModeLabel(draft.deliveryMode)}`,
    `Marché de retrait : ${pickupMarketLabel(draft.pickupMarket)}`,
    `Mode de paiement : ${paymentModeLabel(draft.paymentMode)}`
  ];

  if (draft.timeSlot) {
    lines.push(`Créneau souhaité : ${draft.timeSlot}`);
  }

  if (draft.note) {
    lines.push(`Note : ${draft.note}`);
  }

  if (client && client.name) {
    lines.push("", `Client : ${client.name}`);
  }

  return lines.join("\n");
}

function buildWhatsAppUrl(cart, client = null, draft = getOrderDraft()) {
  const cleanNumber = String(siteInfo.whatsappNumber || "").replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(buildWhatsAppMessage(cart, client, draft))}`;
}

function refreshCartWhatsAppLink() {
  const link = document.querySelector("[data-cart-whatsapp]");

  if (!link) {
    return;
  }

  link.href = buildWhatsAppUrl(getCart(), getClient(), getOrderDraft());
}

function createOrder(client) {
  const cart = getCart();
  const draft = getOrderDraft();
  const orders = getOrders();
  const orderNumber = `CE-${String(orders.length + 1).padStart(4, "0")}`;
  const now = new Date().toISOString();

  const order = {
    id: generateRecordId("order"),
    number: orderNumber,
    clientId: client?.id ?? null,
    client,
    items: cart.map((line) => {
      const product = findProduct(line.id);
      return {
        id: line.id,
        sku: product ? product.sku : "",
        name: product ? product.name : line.id,
        quantity: Number(line.quantity || 1),
        weight: Number(line.weight || 0),
        unitMode: product ? product.unitMode : "count",
        amount: product ? calculateAmount(product, line.quantity, line.weight) : 0,
        stockUnit: product ? product.stockUnit : "unit"
      };
    }),
    total: cartTotal(cart),
    totalItems: cartItemCount(cart),
    deliveryMode: draft.deliveryMode,
    pickupMarket: draft.pickupMarket,
    timeSlot: draft.timeSlot,
    paymentMode: draft.paymentMode,
    paymentStatus: "pending",
    fulfillmentStatus: "confirmed",
    confirmationStatus: client?.email ? "ready-to-send" : "manual-only",
    confirmationEmail: client?.email || "",
    source: "website",
    note: draft.note,
    createdAt: now,
    updatedAt: now
  };

  writeStore(siteInfo.keys.orders, [...orders, order]);
  reserveInventoryForOrder(order);
  resetOrderDraft();
  return order;
}

function selectedCategoryList() {
  return [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b));
}

// Affiche les boutons de categories visibles sur la page catalogue.
function renderCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) {
    return;
  }

  const categoryButtons = [
    `<button class="filter-button ${currentCategoryFilter === "all" ? "is-active" : ""}" type="button" data-category-filter="all">Toutes les catégories</button>`,
    ...selectedCategoryList().map((category) => `
      <button class="filter-button ${currentCategoryFilter === category ? "is-active" : ""}" type="button" data-category-filter="${escapeHtml(category)}">
        ${escapeHtml(category)}
      </button>
    `)
  ];

  container.innerHTML = categoryButtons.join("");
}

function renderTagFilters() {
  const container = document.getElementById("tagFilters");
  if (!container) {
    return;
  }

  const tagButtons = [
    `<button class="filter-button ${currentTagFilter === "all" ? "is-active" : ""}" type="button" data-tag-filter="all">Tous les badges</button>`,
    ...allProductTags().map((tag) => `
      <button class="filter-button ${currentTagFilter === tag ? "is-active" : ""}" type="button" data-tag-filter="${escapeHtml(tag)}">
        ${escapeHtml(tag)}
      </button>
    `)
  ];

  container.innerHTML = tagButtons.join("");
}

function refreshWeightShortcutSelection(productId, value) {
  const numericValue = Number(value || 0);
  document.querySelectorAll(`[data-weight-shortcut="${productId}"]`).forEach((button) => {
    const buttonValue = Number(button.dataset.weightValue || 0);
    button.classList.toggle("is-active", Math.abs(buttonValue - numericValue) < 0.001);
  });
}

function sortProductsList(list) {
  const sorted = [...list];

  if (currentSortOption === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return sorted;
  }

  if (currentSortOption === "price-asc") {
    sorted.sort((a, b) => a.priceValue - b.priceValue);
    return sorted;
  }

  if (currentSortOption === "price-desc") {
    sorted.sort((a, b) => b.priceValue - a.priceValue);
    return sorted;
  }

  if (currentSortOption === "available-first") {
    const priority = { available: 0, limited: 1, unavailable: 2 };
    sorted.sort((a, b) => {
      const diff = priority[productStockStatus(a)] - priority[productStockStatus(b)];
      return diff !== 0 ? diff : productCatalogOrder(a) - productCatalogOrder(b);
    });
    return sorted;
  }

  sorted.sort((a, b) => productCatalogOrder(a) - productCatalogOrder(b));
  return sorted;
}

function weightShortcutMarkup(productId) {
  return `
    <div class="weight-shortcuts" aria-label="Raccourcis de poids">
      <button class="weight-chip" type="button" data-weight-shortcut="${productId}" data-weight-value="0.25">250 g</button>
      <button class="weight-chip is-active" type="button" data-weight-shortcut="${productId}" data-weight-value="0.5">500 g</button>
      <button class="weight-chip" type="button" data-weight-shortcut="${productId}" data-weight-value="1">1 kg</button>
      <button class="weight-chip" type="button" data-weight-shortcut="${productId}" data-weight-value="2">2 kg</button>
    </div>
  `;
}

function productControlMarkup(product) {
  // On teste si le produit est vendu au poids.
  if (isWeightProduct(product)) {
    // Si oui, on renvoie un bloc HTML avec un champ de saisie en kilogrammes.
    return `
      <div class="quantity-control">
        <label>
          Poids souhaité (kg)
          <input type="number" min="0.1" step="0.1" value="0.5" data-product-weight="${product.id}">
        </label>
        ${weightShortcutMarkup(product.id)}
        <div class="price-preview" data-price-preview="${product.id}">${formatPreview(product, 1, 0.5)}</div>
      </div>
    `;
  }

  // Sinon, le produit est vendu à l'unité et on affiche un champ de quantité.
  return `
    <div class="quantity-control">
      <label>
        Quantité
        <input type="number" min="1" step="1" value="1" data-product-quantity="${product.id}">
      </label>
      <div class="price-preview" data-price-preview="${product.id}">${formatPreview(product, 1, 0)}</div>
    </div>
  `;
}

// Genere le HTML d'une carte produit pour la page catalogue ou la page d'accueil.
function productCardMarkup(product) {
  const favorite = favoriteActive(product.id);
  const availability = productAvailabilityMeta(product);
  const visibleTags = (product.tags || []).slice(0, 2);
  const tagsMarkup = visibleTags.length
    ? `
          <div class="product-tag-row">
            ${visibleTags.map(productTagMarkup).join("")}
          </div>
        `
    : "";

  return `
    <article class="product-card">
      <a class="product-link" href="${productUrl(product)}">
        ${mediaMarkup(product)}
      </a>

      <div class="product-card-body">
        <div class="product-meta">
          <div class="price-block">
            <span class="price-tag">${money(product.priceValue)}</span>
            <span class="unit-tag">${escapeHtml(unitDisplay(product))}</span>
          </div>
          ${availabilityBadgeMarkup(product)}
        </div>

        <div>
          <h3>${escapeHtml(product.name)}</h3>
          ${tagsMarkup}
        </div>

        ${productControlMarkup(product)}

        <div class="card-actions">
          <button class="add-button" type="button" data-add-cart="${product.id}" ${availability.canOrder ? "" : "disabled"}>
            ${availability.canOrder ? "Ajouter" : "Indisponible"}
          </button>
          <button class="icon-button ${favorite ? "is-favorite" : ""}" type="button" data-favorite="${product.id}" aria-label="Favori">
            ${favorite ? "&#9829;" : "&#9825;"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function activeSearchText() {
  const input = document.getElementById("searchInput");
  return input ? input.value.trim().toLowerCase() : "";
}

// Filtre les produits selon la recherche, la categorie et le mode favoris.
function filteredProducts() {
  const search = activeSearchText();
  const favorites = getFavorites();

  return products.filter((product) => {
    const matchesSearch = !search
      || product.name.toLowerCase().includes(search)
      || product.category.toLowerCase().includes(search);
    const matchesCategory = currentCategoryFilter === "all" || product.category === currentCategoryFilter;
    const matchesFavorites = !currentFavoritesOnly || favorites.includes(product.id);
    const matchesAvailability = currentAvailabilityFilter === "all" || productStockStatus(product) === currentAvailabilityFilter;
    const matchesUnitMode = currentUnitModeFilter === "all" || product.unitMode === currentUnitModeFilter;
    const matchesTag = currentTagFilter === "all" || (product.tags || []).includes(currentTagFilter);

    return matchesSearch && matchesCategory && matchesFavorites && matchesAvailability && matchesUnitMode && matchesTag;
  });
}

// Met a jour toute la grille de produits visible dans le catalogue.
function renderCatalogPage() {
  renderCategoryFilters();
  renderTagFilters();

  const productList = document.getElementById("listeProduits");
  const count = document.getElementById("messageRecherche");
  const favoriteButtons = document.querySelectorAll("[data-filter]");
  const sortSelect = document.getElementById("sortProducts");
  const availabilitySelect = document.getElementById("availabilityFilter");
  const unitModeSelect = document.getElementById("unitModeFilter");
  const tagButtons = document.querySelectorAll("[data-tag-filter]");

  if (!productList) {
    return;
  }

  const list = sortProductsList(filteredProducts());
  productList.innerHTML = list.length
    ? list.map(productCardMarkup).join("")
    : `
      <div class="empty-state catalog-empty">
        <h2>Aucun produit trouvé</h2>
        <p>Essayez une autre recherche, un autre filtre ou revenez à tout le catalogue.</p>
      </div>
    `;

  if (count) {
    count.textContent = `${list.length} produit(s) affiché(s)`;
  }

  if (sortSelect) {
    sortSelect.value = currentSortOption;
  }

  if (availabilitySelect) {
    availabilitySelect.value = currentAvailabilityFilter;
  }

  if (unitModeSelect) {
    unitModeSelect.value = currentUnitModeFilter;
  }

  favoriteButtons.forEach((button) => {
    const active = button.dataset.filter === "favorites" ? currentFavoritesOnly : !currentFavoritesOnly;
    button.classList.toggle("is-active", active);
  });

  tagButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tagFilter === currentTagFilter);
  });
}

function renderHomeSelection() {
  const target = document.getElementById("homeSelection");
  if (!target) {
    return;
  }

  target.innerHTML = products.slice(0, 3).map(productCardMarkup).join("");
}

function renderLatestHighlights() {
  const target = document.getElementById("latestHighlights");
  if (!target) {
    return;
  }

  const latestProducts = [...products]
    .sort((a, b) => productCatalogOrder(b) - productCatalogOrder(a))
    .slice(0, 3);

  target.innerHTML = latestProducts.map(productCardMarkup).join("");
}

function relatedProductsFor(product) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const score = (candidate) => {
        let total = 0;
        if (candidate.category === product.category) {
          total += 4;
        }
        if (candidate.unitMode === product.unitMode) {
          total += 2;
        }
        if (productStockStatus(candidate) === productStockStatus(product)) {
          total += 1;
        }
        total -= Math.abs(candidate.priceValue - product.priceValue) / 10;
        return total;
      };

      return score(b) - score(a);
    })
    .slice(0, 4);
}

// Construit la fiche detaillee d'un produit a partir de l'id present dans l'URL.
function renderProductDetail() {
  const target = document.getElementById("ficheProduit");
  const relatedTarget = document.getElementById("relatedProducts");

  if (!target) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const product = findProduct(params.get("id"));

  if (!product) {
    target.innerHTML = `
      <div class="empty-state">
        <h1>Produit introuvable</h1>
        <p>La fiche demandée n'existe pas ou n'est plus disponible.</p>
        <a class="button button-primary" href="produits.html">Retour aux produits</a>
      </div>
    `;

    if (relatedTarget) {
      relatedTarget.innerHTML = "";
    }
    return;
  }

  document.title = `Capri Exo - ${product.name}`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", `${product.name} chez Capri Exo : description, disponibilité, conservation, format recommandé et commande.`);
  }
  const availability = productAvailabilityMeta(product);
  const visibleTags = (product.tags || []).slice(0, 4);
  target.innerHTML = `
    <article class="product-detail">
      ${mediaMarkup(product, true)}

      <div class="product-info">
        <div class="product-copy-head">
          <p class="eyebrow">${escapeHtml(product.category)}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <p class="product-subtitle">${money(product.priceValue)} ${escapeHtml(unitDisplay(product))}</p>
        </div>

        <div class="detail-meta-stack">
          <div class="product-tag-row detail-tag-row">
            ${visibleTags.map(productTagMarkup).join("")}
          </div>
          <div class="detail-status-row">
            ${availabilityBadgeMarkup(product)}
            <span class="detail-availability-text">${escapeHtml(product.availability)}</span>
          </div>
        </div>

        <p class="product-description product-description-lead">${escapeHtml(product.description)}</p>

        <div class="detail-grid">
          ${detailItemMarkup("Conservation", product.storage)}
          ${detailItemMarkup("Disponibilité", product.availability)}
          ${detailItemMarkup("Commande", product.orderNote)}
          ${detailItemMarkup("Conseil", product.tip)}
          ${detailItemMarkup("Origine", product.origin)}
          ${detailItemMarkup("Niveau de piquant", product.spiceLevel)}
          ${detailItemMarkup("Produit conseillé avec", product.pairing)}
          ${detailItemMarkup("Format recommandé", product.recommendedFormat)}
          ${detailItemMarkup("Saison", product.seasonLabel)}
          ${detailItemMarkup("Retrait possible", marketPickupSummary())}
        </div>

        <div class="detail-purchase-panel">
          <p class="detail-purchase-title">Préparer ma commande</p>
          ${productControlMarkup(product)}

          <div class="detail-actions">
            <button class="button button-primary" type="button" data-add-cart="${product.id}" ${availability.canOrder ? "" : "disabled"}>
              ${availability.canOrder ? "Ajouter au panier" : "Indisponible"}
            </button>
            <button class="button button-secondary" type="button" data-favorite="${product.id}">
              ${favoriteActive(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
            <a class="button button-whatsapp" href="#" target="_blank" rel="noopener noreferrer" data-product-whatsapp="${product.id}">
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  `;

  if (relatedTarget) {
    const related = relatedProductsFor(product);

    relatedTarget.innerHTML = related.map(productCardMarkup).join("");
  }

  refreshProductWhatsAppLink(product.id);
}

function cartMedia(product) {
  const hasImageClass = product.image ? " has-image" : "";
  const imageMarkup = product.image
    ? `<img class="cart-media-image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`
    : `<span class="cart-media-fallback">${escapeHtml(productAbbr(product))}</span>`;

  return `
    <div class="cart-media${hasImageClass}" data-abbr="${escapeHtml(productAbbr(product))}">
      ${imageMarkup}
    </div>
  `;
}

function cartControlMarkup(product, line) {
  if (isWeightProduct(product)) {
    return `
      <div class="cart-control">
        <label>
          Poids (kg)
          <input type="number" min="0.1" step="0.1" value="${Number(line.weight || 0.5).toFixed(1)}" data-cart-weight="${product.id}">
        </label>
      </div>
    `;
  }

  return `
    <div class="cart-control">
      <label>
        Quantité
        <input type="number" min="1" step="1" value="${Math.max(1, Number(line.quantity || 1))}" data-cart-quantity="${product.id}">
      </label>
    </div>
  `;
}

function cartLineMarkup(line) {
  const product = findProduct(line.id);

  if (!product) {
    return "";
  }

  const amount = calculateAmount(product, line.quantity, line.weight);

  return `
    <article class="cart-item">
      ${cartMedia(product)}
      <div>
        <h2>${escapeHtml(product.name)}</h2>
        <p>${money(product.priceValue)} ${escapeHtml(unitDisplay(product))}</p>

        <div class="cart-item-footer">
          ${cartControlMarkup(product, line)}
          <div class="line-total">
            ${formatPreview(product, line.quantity, line.weight)}
          </div>
          <button class="remove-button" type="button" data-remove-cart="${product.id}">Supprimer</button>
        </div>
      </div>
    </article>
  `;
}

function cartSummaryMarkup(cart) {
  const total = cartTotal(cart);
  const totalItems = cartItemCount(cart);
  const draft = getOrderDraft();
  const client = getClient();
  const whatsappUrl = buildWhatsAppUrl(cart, client, draft);
  const recapLines = cart
    .map((line) => {
      const product = findProduct(line.id);
      if (!product) {
        return "";
      }

      const quantityText = isWeightProduct(product)
        ? `${Math.round(Number(line.weight || 0.5) * 1000)} g`
        : `${Math.max(1, Number(line.quantity || 1))} article(s)`;

      return `
        <li>
          <div>
            <span>${escapeHtml(product.name)}</span>
            <small>${escapeHtml(product.category)} - ${escapeHtml(unitDisplay(product))}</small>
          </div>
          <strong>${escapeHtml(quantityText)} - ${money(calculateAmount(product, line.quantity, line.weight))}</strong>
        </li>
      `;
    })
    .join("");

  return `
    <aside class="summary-card">
      <h2>Résumé de commande</h2>
      <div class="summary-row">
        <span>Articles</span>
        <strong>${totalItems}</strong>
      </div>
      <div class="summary-row">
        <span>Estimation</span>
        <strong>${money(total)}</strong>
      </div>
      <div class="summary-total">
        <span>Total estimé</span>
        <strong>${money(total)}</strong>
      </div>
      <div class="summary-breakdown">
        <p class="summary-breakdown-title">Récapitulatif détaillé</p>
        <ul class="summary-breakdown-list">
          ${recapLines}
        </ul>
      </div>
      <div class="summary-fields">
        <label>
          Mode de réception
          <select id="orderDeliveryMode" data-order-draft="deliveryMode">
            <option value="pickup" ${draft.deliveryMode === "pickup" ? "selected" : ""}>Retrait sur le marché</option>
            <option value="delivery" ${draft.deliveryMode === "delivery" ? "selected" : ""}>Livraison</option>
          </select>
        </label>

        <label>
          Marché de retrait
          <select id="orderPickupMarket" data-order-draft="pickupMarket">
            ${markets.map((market) => `<option value="${escapeHtml(market.id)}" ${draft.pickupMarket === market.id ? "selected" : ""}>${escapeHtml(market.name)}</option>`).join("")}
          </select>
        </label>

        <label>
          Créneau souhaité
          <input id="orderTimeSlot" type="text" value="${escapeHtml(draft.timeSlot)}" placeholder="Ex : vendredi après-midi" data-order-draft="timeSlot">
        </label>

        <label>
          Mode de paiement
          <select id="orderPaymentMode" data-order-draft="paymentMode">
            <option value="shop" ${draft.paymentMode === "shop" ? "selected" : ""}>Paiement au stand</option>
            <option value="delivery" ${draft.paymentMode === "delivery" ? "selected" : ""}>Paiement à la livraison</option>
            <option value="online" ${draft.paymentMode === "online" ? "selected" : ""}>Paiement en ligne</option>
          </select>
        </label>

        <label>
          Note pour la commande
          <textarea id="orderNote" placeholder="Une précision utile pour votre commande" data-order-draft="note">${escapeHtml(draft.note)}</textarea>
        </label>
      </div>
      <div class="summary-row">
        <span>Retrait prévu</span>
        <strong>${escapeHtml(pickupMarketLabel(draft.pickupMarket))}</strong>
      </div>
      <div class="summary-total summary-total-repeat">
        <span>Total avant validation</span>
        <strong>${money(total)}</strong>
      </div>
      <div class="summary-actions">
        <button class="button button-primary" type="button" data-finalize-order>Finaliser la commande</button>
        <a class="button button-secondary" href="produits.html">Continuer mes achats</a>
        <button class="button button-secondary" type="button" data-clear-cart>Vider le panier</button>
        <a class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" data-cart-whatsapp>Commander sur WhatsApp</a>
      </div>
      <p class="muted">${escapeHtml(marketPickupSummary())}</p>
      <p class="muted">
        ${clientRegistered() ? `Commande prête pour ${escapeHtml(client.name)}.` : "Le client peut ajuster les quantités ou le poids avant validation."}
      </p>
    </aside>
  `;
}

function renderOrderConfirmation() {
  const target = document.getElementById("confirmationCommande");
  if (!target) {
    return;
  }

  const orders = getOrders();
  const lastOrder = orders[orders.length - 1];

  if (!lastOrder) {
    target.innerHTML = "";
    return;
  }

  const whatsappUrl = buildWhatsAppUrl(
    lastOrder.items.map((item) => ({ id: item.id, quantity: item.quantity, weight: item.weight })),
    lastOrder.client,
    {
      deliveryMode: lastOrder.deliveryMode,
      timeSlot: lastOrder.timeSlot,
      paymentMode: lastOrder.paymentMode,
      note: lastOrder.note
    }
  );

  const confirmationLines = lastOrder.items
    .map((item) => {
      const quantityText = item.unitMode === "weight"
        ? `${Math.round(Number(item.weight || 0.5) * 1000)} g`
        : `${Math.max(1, Number(item.quantity || 1))} article(s)`;

      return `
        <li>
          <span>${escapeHtml(item.name)}</span>
          <strong>${escapeHtml(quantityText)} - ${money(item.amount)}</strong>
        </li>
      `;
    })
    .join("");

  target.innerHTML = `
    <article class="content-card order-confirmation-card">
      <div class="confirmation-heading">
        <p class="eyebrow">Dernière commande confirmée</p>
        <span class="confirmation-pill">Commande enregistrée</span>
      </div>
      <h2>Commande ${escapeHtml(lastOrder.number)}</h2>
      <p class="muted">
        Enregistrée le ${escapeHtml(formatDate(lastOrder.createdAt))} pour ${escapeHtml(lastOrder.client?.name || "votre compte client")}.
      </p>
      <div class="order-confirmation-grid">
        <p><strong>Réception :</strong> ${escapeHtml(deliveryModeLabel(lastOrder.deliveryMode))}</p>
        <p><strong>Marché :</strong> ${escapeHtml(pickupMarketLabel(lastOrder.pickupMarket))}</p>
        <p><strong>Paiement :</strong> ${escapeHtml(paymentModeLabel(lastOrder.paymentMode))}</p>
        <p><strong>Total estimé :</strong> ${money(lastOrder.total)}</p>
        <p><strong>Articles :</strong> ${lastOrder.totalItems}</p>
      </div>
      <div class="summary-breakdown order-confirmation-list">
        <p class="summary-breakdown-title">Contenu de la commande</p>
        <ul class="summary-breakdown-list">
          ${confirmationLines}
        </ul>
      </div>
      <a class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Envoyer cette commande sur WhatsApp</a>
    </article>
  `;
}

// Recalcule et recompose la page panier complete.
function renderCartPage() {
  const target = document.getElementById("contenuPanier");
  if (!target) {
    return;
  }

  const cart = getCart();

  if (cart.length === 0) {
    target.innerHTML = `
      <div class="empty-state">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des produits depuis le catalogue ou une fiche détaillée pour commencer.</p>
        <a class="button button-primary" href="produits.html">Voir les produits</a>
      </div>
    `;
    renderOrderConfirmation();
    return;
  }

  target.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(cartLineMarkup).join("")}
      </div>
      ${cartSummaryMarkup(cart)}
    </div>
  `;
  renderOrderConfirmation();
}

function openClientModal() {
  const modal = document.getElementById("modalClient");
  if (!modal) {
    return;
  }

  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeClientModal() {
  const modal = document.getElementById("modalClient");
  if (!modal) {
    return;
  }

  modal.classList.add("is-hidden");
  modal.setAttribute("aria-hidden", "true");
}

function clientRegistered() {
  const client = getClient();
  return Boolean(client && client.email);
}

function completeOrder(client) {
  const order = createOrder(client);
  void syncOrderToApi(order);
  closeClientModal();
  clearCartWithMessage(`Merci ${client.name}. Votre commande ${order.number} a bien été enregistrée.`);
  renderOrderConfirmation();
  showToast(`Commande ${order.number} confirmée.`);
}

// Gere la derniere etape de commande : soit le client est connu, soit on ouvre la fenetre d'informations.
function finalizeOrder() {
  const cart = getCart();
  const client = getClient();

  if (cart.length === 0) {
    setMessage("messageCommande", "Votre panier est vide. Ajoutez un produit avant de finaliser.");
    return;
  }

  if (clientRegistered()) {
    completeOrder(client);
    return;
  }

  openClientModal();
}

// Enregistre les informations du client depuis la fenetre de commande.
function registerClient(event) {
  event.preventDefault();

  const client = {
    name: document.getElementById("clientNom").value.trim(),
    email: document.getElementById("clientEmail").value.trim(),
    phone: document.getElementById("clientTelephone").value.trim(),
    address: document.getElementById("clientAdresse").value.trim(),
    city: document.getElementById("clientVille").value.trim(),
    postalCode: document.getElementById("clientCodePostal").value.trim(),
    createdAt: new Date().toISOString()
  };

  const savedClient = upsertClientRecord(client);
  writeStore(siteInfo.keys.client, savedClient);
  event.target.reset();
  completeOrder(savedClient);
}

// Affiche les avis deja enregistres dans le navigateur.
function renderReviews() {
  const target = document.getElementById("listeAvis");
  const summary = document.getElementById("reviewSummary");
  if (!target) {
    return;
  }

  const reviews = getReviews();

  if (summary) {
    if (reviews.length === 0) {
      summary.textContent = "Pas encore d'avis publié pour le moment.";
    } else {
      const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      summary.textContent = `${average.toFixed(1)}/5 sur ${reviews.length} avis`;
    }
  }

  if (reviews.length === 0) {
    target.innerHTML = `
      <div class="empty-state">
        <h2>Aucun avis pour le moment</h2>
        <p>Soyez le premier à laisser un retour sur votre expérience.</p>
      </div>
    `;
    return;
  }

  target.innerHTML = reviews
    .slice()
    .reverse()
    .map((review) => `
      <article class="review-card">
        <div class="review-card-header">
          <strong>${escapeHtml(review.name)}</strong>
          <span class="review-stars">${"&#9733;".repeat(review.rating)}${"&#9734;".repeat(5 - review.rating)}</span>
        </div>
        <p>${escapeHtml(review.text)}</p>
        <small class="muted">${escapeHtml(review.email)} - ${escapeHtml(findMarket(review.marketId).name)}${review.createdAt ? ` - ${escapeHtml(formatDate(review.createdAt))}` : ""}</small>
      </article>
    `)
    .join("");
}

function saveContactMessage(event) {
  event.preventDefault();

  const now = new Date().toISOString();
  const message = {
    id: generateRecordId("message"),
    name: document.getElementById("contactNom").value.trim(),
    email: document.getElementById("contactEmail").value.trim(),
    marketId: document.getElementById("contactMarket").value,
    text: document.getElementById("contactMessage").value.trim(),
    status: "received",
    createdAt: now,
    updatedAt: now
  };

  writeStore(siteInfo.keys.messages, [...getMessages(), message]);
  void syncContactMessageToApi(message);
  event.target.reset();
  setMessage("messageContact", `Merci ${message.name}, votre message pour ${findMarket(message.marketId).name} a bien été envoyé.`);
}

function saveReview(event) {
  event.preventDefault();

  const now = new Date().toISOString();
  const review = {
    id: generateRecordId("review"),
    name: document.getElementById("avisNom").value.trim(),
    email: document.getElementById("avisEmail").value.trim(),
    marketId: document.getElementById("avisMarket").value,
    rating: Math.max(1, Math.min(5, Number(document.getElementById("avisNote").value || 5))),
    text: document.getElementById("avisTexte").value.trim(),
    status: "published",
    verifiedOrder: false,
    createdAt: now,
    updatedAt: now
  };

  writeStore(siteInfo.keys.reviews, [...getReviews(), review]);
  void syncReviewToApi(review);
  event.target.reset();
  document.getElementById("avisNote").value = 5;
  refreshRatingPicker(5);
  setMessage("messageAvis", `Merci ${review.name}, votre avis pour ${findMarket(review.marketId).name} a été publié.`);
  renderReviews();
}

function updateCatalogSearchFromUrl() {
  const input = document.getElementById("searchInput");
  if (!input) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  input.value = params.get("recherche") || "";
}

function refreshRatingPicker(value = Number(document.getElementById("avisNote")?.value || 5)) {
  document.querySelectorAll("[data-rating-value]").forEach((button) => {
    const isActive = Number(button.dataset.ratingValue) <= Number(value);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
}

function refreshProductPreview(productId) {
  const product = findProduct(productId);
  const preview = document.querySelector(`[data-price-preview="${productId}"]`);

  if (!product || !preview) {
    return;
  }

  const scope = preview.closest(".product-card, .product-detail") || document;
  const quantityInput = scope.querySelector(`[data-product-quantity="${productId}"]`);
  const weightInput = scope.querySelector(`[data-product-weight="${productId}"]`);
  const quantity = quantityInput ? quantityInput.value : 1;
  const weight = weightInput ? weightInput.value : cartQuantityDefault(product);

  preview.textContent = formatPreview(product, quantity, weight);
}

function refreshProductWhatsAppLink(productId) {
  const product = findProduct(productId);
  const link = document.querySelector(`[data-product-whatsapp="${productId}"]`);

  if (!product || !link) {
    return;
  }

  const detail = link.closest(".product-detail") || document;
  const quantityInput = detail.querySelector(`[data-product-quantity="${productId}"]`);
  const weightInput = detail.querySelector(`[data-product-weight="${productId}"]`);
  const quantity = quantityInput ? Math.max(1, Number(quantityInput.value || 1)) : 1;
  const weight = weightInput ? Math.max(0.1, Number(weightInput.value || cartQuantityDefault(product))) : cartQuantityDefault(product);

  link.href = buildWhatsAppUrl(
    [{ id: productId, quantity, weight: isWeightProduct(product) ? weight : 0 }],
    getClient(),
    getOrderDraft()
  );
}

// Lance la petite transition de sortie avant de changer de page.
function navigateWithTransition(url) {
  if (pageTransitionRunning) {
    return;
  }

  pageTransitionRunning = true;
  document.body.classList.add("page-leaving");

  window.setTimeout(() => {
    window.location.href = url;
  }, 280);
}

function isInternalLink(link) {
  if (!link) {
    return false;
  }

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  const destination = new URL(href, window.location.href);
  const samePage = destination.pathname === window.location.pathname
    && destination.search === window.location.search;

  if (samePage && destination.hash) {
    return false;
  }

  if (window.location.protocol === "file:") {
    return destination.protocol === "file:";
  }

  return destination.origin === window.location.origin;
}

// Rafraichit uniquement les blocs utiles selon la page ouverte.
function renderCurrentPage() {
  renderHomeSelection();
  renderLatestHighlights();
  renderMarketGrid("marketLocationsGrid");
  renderMarketGrid("aboutMarketsGrid");
  renderMarketGrid("contactMarketCards");
  renderCatalogPage();
  renderProductDetail();
  renderCartPage();
  renderReviews();
  updateCartBadge();
  refreshRatingPicker();
  renderFooterMarkets();
  setupRevealAnimations();
}

// Branche tous les clics, formulaires et champs dynamiques du site.
function initGlobalActions() {
  document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    const addButton = event.target.closest("[data-add-cart]");
    const removeButton = event.target.closest("[data-remove-cart]");
    const finalizeButton = event.target.closest("[data-finalize-order]");
    const clearCartButton = event.target.closest("[data-clear-cart]");
    const closeModalButton = event.target.closest("[data-fermer-client]");
    const categoryButton = event.target.closest("[data-category-filter]");
    const filterButton = event.target.closest("[data-filter]");
    const tagButton = event.target.closest("[data-tag-filter]");
    const weightShortcutButton = event.target.closest("[data-weight-shortcut]");
    const ratingButton = event.target.closest("[data-rating-value]");
    const link = event.target.closest("a[href]");

    if (
      link
      && !event.defaultPrevented
      && event.button === 0
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
      && link.target !== "_blank"
      && !link.hasAttribute("download")
      && isInternalLink(link)
    ) {
      closeResponsiveNav();
      event.preventDefault();
      navigateWithTransition(new URL(link.getAttribute("href"), window.location.href).href);
      return;
    }

    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }

    if (addButton) {
      addToCart(addButton.dataset.addCart, addButton);
      addButton.textContent = "Ajouté";
      window.setTimeout(() => {
        addButton.textContent = "Ajouter";
      }, 900);
      return;
    }

    if (removeButton) {
      removeFromCart(removeButton.dataset.removeCart);
      return;
    }

    if (finalizeButton) {
      finalizeOrder();
      return;
    }

    if (clearCartButton) {
      clearCartWithMessage("Le panier a été vidé.");
      renderOrderConfirmation();
      showToast("Panier vidé.");
      return;
    }

    if (closeModalButton) {
      closeClientModal();
      return;
    }

    if (categoryButton) {
      currentCategoryFilter = categoryButton.dataset.categoryFilter;
      renderCatalogPage();
      return;
    }

    if (filterButton) {
      currentFavoritesOnly = filterButton.dataset.filter === "favorites";
      renderCatalogPage();
      return;
    }

    if (tagButton) {
      currentTagFilter = tagButton.dataset.tagFilter || "all";
      renderCatalogPage();
      return;
    }

    if (weightShortcutButton) {
      const productId = weightShortcutButton.dataset.weightShortcut;
      const weightValue = Number(weightShortcutButton.dataset.weightValue || 0.5);
      const scope = weightShortcutButton.closest(".product-card, .product-detail") || document;
      const weightInput = scope.querySelector(`[data-product-weight="${productId}"]`);

      if (weightInput) {
        weightInput.value = String(weightValue);
        refreshWeightShortcutSelection(productId, weightValue);
        refreshProductPreview(productId);
        refreshProductWhatsAppLink(productId);
      }
      return;
    }

    if (ratingButton) {
      const value = Number(ratingButton.dataset.ratingValue || 5);
      const ratingInput = document.getElementById("avisNote");
      if (ratingInput) {
        ratingInput.value = String(value);
      }
      refreshRatingPicker(value);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "formRecherche") {
      event.preventDefault();
      renderCatalogPage();
    }

    if (event.target.id === "formClient") {
      registerClient(event);
    }

    if (event.target.id === "formContact") {
      saveContactMessage(event);
    }

    if (event.target.id === "formAvis") {
      saveReview(event);
    }
  });

  document.addEventListener("input", (event) => {
    const quantityField = event.target.closest("[data-product-quantity]");
    const weightField = event.target.closest("[data-product-weight]");
    const cartQuantityField = event.target.closest("[data-cart-quantity]");
    const cartWeightField = event.target.closest("[data-cart-weight]");
    const searchInput = event.target.closest("#searchInput");
    const orderDraftField = event.target.closest("[data-order-draft]");
    const sortSelect = event.target.closest("#sortProducts");
    const availabilitySelect = event.target.closest("#availabilityFilter");
    const unitModeSelect = event.target.closest("#unitModeFilter");

    if (quantityField) {
      refreshProductPreview(quantityField.dataset.productQuantity);
      refreshProductWhatsAppLink(quantityField.dataset.productQuantity);
    }

    if (weightField) {
      refreshProductPreview(weightField.dataset.productWeight);
      refreshProductWhatsAppLink(weightField.dataset.productWeight);
      refreshWeightShortcutSelection(weightField.dataset.productWeight, weightField.value);
    }

    if (cartQuantityField) {
      updateCartLine(cartQuantityField.dataset.cartQuantity, "quantity", cartQuantityField.value);
    }

    if (cartWeightField) {
      updateCartLine(cartWeightField.dataset.cartWeight, "weight", cartWeightField.value);
    }

    if (searchInput) {
      renderCatalogPage();
    }

    if (orderDraftField) {
      saveOrderDraft({ [orderDraftField.dataset.orderDraft]: orderDraftField.value });
      refreshCartWhatsAppLink();
    }

    if (sortSelect) {
      currentSortOption = sortSelect.value;
      renderCatalogPage();
    }

    if (availabilitySelect) {
      currentAvailabilityFilter = availabilitySelect.value;
      renderCatalogPage();
    }

    if (unitModeSelect) {
      currentUnitModeFilter = unitModeSelect.value;
      renderCatalogPage();
    }
  });

  document.addEventListener("change", (event) => {
    const orderDraftField = event.target.closest("[data-order-draft]");
    const sortSelect = event.target.closest("#sortProducts");
    const availabilitySelect = event.target.closest("#availabilityFilter");
    const unitModeSelect = event.target.closest("#unitModeFilter");

    if (orderDraftField) {
      saveOrderDraft({ [orderDraftField.dataset.orderDraft]: orderDraftField.value });
      refreshCartWhatsAppLink();
    }

    if (sortSelect) {
      currentSortOption = sortSelect.value;
      renderCatalogPage();
    }

    if (availabilitySelect) {
      currentAvailabilityFilter = availabilitySelect.value;
      renderCatalogPage();
    }

    if (unitModeSelect) {
      currentUnitModeFilter = unitModeSelect.value;
      renderCatalogPage();
    }
  });

  window.addEventListener("pageshow", () => {
    pageTransitionRunning = false;
    document.body.classList.remove("page-leaving");
  });
}

// Point d'entree principal : on prepare la recherche, l'affichage et les interactions globales.
async function init() {
  await hydrateCatalogFromApi();
  updateCatalogSearchFromUrl();
  renderCurrentPage();
  syncCurrentNavigation();
  setupResponsiveNav();
  setupBackToTopButton();
  initGlobalActions();
}

void init();
