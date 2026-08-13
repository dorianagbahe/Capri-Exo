# Capri Exo

Site vitrine et catalogue de Capri Exo. La page d'accueil présente l'activité et affiche directement les produits disponibles.

## Organisation

- `index.html` : accueil et catalogue produits
- `produit.html` : fiche détaillée générée selon l'identifiant du produit
- `panier.html` : panier et préparation de commande
- `contact.html` : contact et avis clients
- `apropos.html` : présentation de Capri Exo
- `connexion.html` : espace de connexion
- `mentionlegales.html` : informations légales à personnaliser avant publication
- `produits.html` : redirection conservée pour les anciens liens
- `style.css` : styles communs et responsive
- `js/data.js` : produits, marchés et configuration du site
- `js/core.js` : fonctions communes et stockage local
- `js/search.js` : recherche, filtres et tri
- `js/products.js` : catalogue et fiches produits
- `js/cart.js` : panier et commande
- `js/contact.js` : formulaires de contact et d'avis
- `js/main.js` : initialisation et interactions générales
- `images/` : images du site et des produits

## Modifier un produit

Les produits sont centralisés dans `js/data.js`. Modifiez l'objet correspondant pour changer son nom, son prix, son origine, son image, sa disponibilité ou sa description.

## Lancer le site

Ouvrez le dossier avec un serveur local, puis chargez `index.html`. L'utilisation d'un serveur local est recommandée pour les appels vers le futur back-end.

