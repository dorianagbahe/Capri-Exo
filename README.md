# Capri Exo

Site vitrine, catalogue et préparation de commande de Capri Exo.

## Structure du projet

Les pages HTML restent à la racine du projet afin que les liens et GitHub Pages fonctionnent simplement.

- `index.html` : accueil et catalogue
- `produit.html` : fiche détaillée d'un produit
- `panier.html` : panier et préparation de commande
- `contact.html` : contact et avis clients
- `apropos.html` : présentation de Capri Exo
- `connexion.html` : espace de connexion
- `mentionlegales.html` : mentions légales
- `suivi.html` : liste de suivi du projet
- `produits.html` : redirection vers le catalogue de l'accueil

## Où modifier le CSS

Les styles sont séparés dans le dossier `css/`.

- `css/base.css` : couleurs, variables et styles généraux
- `css/header.css` : logo, navigation et menu mobile
- `css/components.css` : boutons, formulaires et blocs communs
- `css/home.css` : page d'accueil
- `css/products.css` : catalogue et fiches produit
- `css/cart.css` : panier et commande
- `css/pages.css` : contact, à propos, connexion et mentions légales
- `css/footer.css` : pied de page
- `css/animations.css` : transitions et animations
- `css/responsive.css` : adaptations pour téléphone et tablette
- `css/suivi.css` : page de suivi

`css/responsive.css` doit rester chargé en dernier dans les pages HTML.

## Où modifier le JavaScript

- `js/data.js` : produits, prix, images, origines et disponibilités
- `js/core.js` : fonctions communes et stockage local
- `js/search.js` : recherche, filtres et cartes produit
- `js/products.js` : catalogue et fiche détaillée
- `js/cart.js` : panier et commande
- `js/contact.js` : formulaires de contact et avis
- `js/main.js` : démarrage du site et interactions générales
- `js/suivi.js` : fonctionnement de la page de suivi

## Modifier un produit

Ouvrez `js/data.js`, puis recherchez le nom ou l'identifiant du produit. Toutes ses informations principales se trouvent dans le même objet : nom, prix, unité, image, origine, disponibilité et description.

Les images sont placées dans `images/`. Le chemin enregistré dans `js/data.js` doit correspondre exactement au nom du fichier, accents et extension compris.

## Tester le site

Lancez un serveur local depuis la racine du projet, puis ouvrez `index.html`. Évitez de déplacer les pages HTML dans un sous-dossier sans adapter tous les chemins vers `css/`, `js/` et `images/`.
