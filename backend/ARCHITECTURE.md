# Architecture back-end cible - Capri Exo

Ce document prepare la suite du back-end sans modifier le rendu actuel du site.
L'idee est simple : le front peut continuer a fonctionner, mais on pose ici la structure serieuse a brancher plus tard.

## 1. Objectif

Le back-end final devra gerer :

- les vrais produits
- les vraies quantites en stock
- les vrais comptes clients
- les favoris sauvegardes
- les commandes confirmees
- les avis clients
- les messages de contact
- les points de retrait du marche

Le front actuel stocke encore beaucoup de choses dans le navigateur.
Le but du back-end sera de remplacer progressivement ce stockage local par des appels API.

## 2. Structure conseillee

Le plus propre pour Capri Exo est de separer les responsabilites en plusieurs blocs :

1. `catalog`
   - produits
   - categories
   - stocks
   - disponibilites

2. `customers`
   - comptes clients
   - adresses
   - favoris

3. `orders`
   - commandes
   - lignes de commande
   - paiement
   - retrait

4. `reviews`
   - avis clients

5. `contact`
   - messages

6. `markets`
   - marches de Cergy et Mantes-la-Jolie

Si tu veux aller vite dans Django, tu peux garder une seule app `shop` au debut, puis separer plus tard.

## 3. Tables a prevoir

### 3.1 Market

Represente un lieu de retrait ou de presence physique.

Champs conseilles :

- `id`
- `name`
- `slug`
- `city`
- `address`
- `stand_label`
- `schedule_text`
- `is_active`
- `image_url`
- `created_at`
- `updated_at`

Exemples :

- Marche de Cergy
- Marche de Mantes-la-Jolie

### 3.2 Customer

Represente un vrai client.

Champs conseilles :

- `id`
- `first_name`
- `last_name`
- `full_name`
- `email` unique
- `phone`
- `password_hash` ou lien avec `django.contrib.auth.User`
- `is_active`
- `newsletter_opt_in`
- `default_market` vers `Market`
- `created_at`
- `updated_at`
- `last_login_at`

Remarque :
le mieux dans Django est souvent d'utiliser le systeme utilisateur natif ou un modele utilisateur personnalise.

### 3.3 CustomerAddress

Permet de stocker une ou plusieurs adresses.

Champs conseilles :

- `id`
- `customer` vers `Customer`
- `label`
- `address_line_1`
- `address_line_2`
- `postal_code`
- `city`
- `country`
- `is_default`
- `created_at`
- `updated_at`

### 3.4 ProductCategory

Pour classer les produits proprement.

Champs conseilles :

- `id`
- `name`
- `slug`
- `description`
- `sort_order`
- `is_active`

### 3.5 Product

C'est la table centrale du catalogue.

Champs conseilles :

- `id`
- `sku` unique
- `slug` unique
- `name`
- `category` vers `ProductCategory`
- `short_description`
- `description`
- `origin_country`
- `spice_level` nullable
- `conservation_text`
- `preparation_tip`
- `advice_text`
- `price_value`
- `sale_mode`
- `unit_label`
- `minimum_weight_kg`
- `step_weight_kg`
- `minimum_quantity`
- `image_url`
- `secondary_image_url`
- `is_active`
- `is_featured`
- `available_for_order`
- `product_status`
- `created_at`
- `updated_at`

Valeurs utiles pour `sale_mode` :

- `weight`
- `unit`
- `packet`
- `pot`
- `bottle`
- `portion`
- `box`

Valeurs utiles pour `product_status` :

- `available`
- `limited`
- `on_request`
- `unavailable`

### 3.6 ProductTag

Si tu veux des badges ou filtres plus souples.

Champs conseilles :

- `id`
- `name`
- `slug`
- `color_code`

### 3.7 ProductTagLink

Table de liaison entre produit et tags.

Champs conseilles :

- `id`
- `product`
- `tag`

### 3.8 Inventory

Table tres importante pour la vraie gestion de stock.

Champs conseilles :

- `id`
- `product` vers `Product`
- `market` vers `Market` nullable si stock global
- `stock_unit`
- `quantity_available`
- `quantity_reserved`
- `low_stock_threshold`
- `last_manual_update_at`
- `updated_at`

Exemple :

- Avocat : `quantity_available = 25`
- Gingembre : `quantity_available = 14.5`

Si un produit est vendu au kilo :
- `stock_unit = kg`

Si un produit est vendu a la piece :
- `stock_unit = unit`

### 3.9 Favorite

Permet de sauvegarder les favoris par client.

Champs conseilles :

- `id`
- `customer` vers `Customer`
- `product` vers `Product`
- `created_at`

Contrainte utile :

- un client ne peut pas ajouter deux fois le meme produit en favori

### 3.10 Cart

Optionnel si tu veux sauvegarder un panier serveur.

Champs conseilles :

- `id`
- `customer` vers `Customer` nullable
- `session_key`
- `status`
- `created_at`
- `updated_at`

Valeurs utiles pour `status` :

- `active`
- `converted`
- `abandoned`

### 3.11 CartItem

Champs conseilles :

- `id`
- `cart` vers `Cart`
- `product` vers `Product`
- `quantity`
- `weight_kg`
- `unit_price`
- `estimated_amount`
- `created_at`
- `updated_at`

### 3.12 Order

Table principale de commande.

Champs conseilles :

- `id`
- `order_number` unique
- `customer` vers `Customer` nullable
- `customer_name`
- `customer_email`
- `customer_phone`
- `delivery_mode`
- `pickup_market` vers `Market` nullable
- `pickup_slot`
- `payment_mode`
- `payment_status`
- `fulfillment_status`
- `confirmation_status`
- `subtotal_amount`
- `discount_amount`
- `total_amount`
- `notes`
- `source`
- `created_at`
- `updated_at`

Valeurs utiles pour `delivery_mode` :

- `pickup`
- `delivery`

Valeurs utiles pour `payment_mode` :

- `shop`
- `delivery`
- `online`

Valeurs utiles pour `payment_status` :

- `pending`
- `paid`
- `failed`
- `refunded`

Valeurs utiles pour `fulfillment_status` :

- `new`
- `confirmed`
- `preparing`
- `ready`
- `completed`
- `cancelled`

Valeurs utiles pour `confirmation_status` :

- `manual-only`
- `ready-to-send`
- `sent`

### 3.13 OrderItem

Chaque produit commande est stocke ici.

Champs conseilles :

- `id`
- `order` vers `Order`
- `product` vers `Product`
- `product_name_snapshot`
- `product_sku_snapshot`
- `sale_mode_snapshot`
- `unit_label_snapshot`
- `quantity`
- `weight_kg`
- `unit_price`
- `line_total`
- `created_at`

### 3.14 Review

Pour les avis publics.

Champs conseilles :

- `id`
- `product` vers `Product` nullable si avis global
- `customer` vers `Customer` nullable
- `author_name`
- `author_email`
- `rating`
- `comment`
- `status`
- `verified_order`
- `created_at`
- `updated_at`

Valeurs utiles pour `status` :

- `pending`
- `published`
- `rejected`

### 3.15 ContactMessage

Champs conseilles :

- `id`
- `name`
- `email`
- `phone`
- `market` vers `Market` nullable
- `subject`
- `message`
- `status`
- `created_at`
- `updated_at`

Valeurs utiles pour `status` :

- `received`
- `handled`
- `archived`

## 4. API a prevoir

### Catalogue

- `GET /api/products/`
- `GET /api/products/{slug}/`
- `GET /api/categories/`
- `GET /api/products/featured/`
- `GET /api/products/?search=`
- `GET /api/products/?category=`
- `GET /api/products/?status=available`
- `GET /api/products/?sale_mode=weight`

### Stocks

- `GET /api/inventory/`
- `GET /api/inventory/?product=`
- `GET /api/inventory/?market=`

### Clients

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/logout/`
- `GET /api/me/`
- `PATCH /api/me/`
- `GET /api/me/addresses/`
- `POST /api/me/addresses/`

### Favoris

- `GET /api/me/favorites/`
- `POST /api/me/favorites/`
- `DELETE /api/me/favorites/{product_id}/`

### Panier

- `GET /api/cart/`
- `POST /api/cart/items/`
- `PATCH /api/cart/items/{id}/`
- `DELETE /api/cart/items/{id}/`
- `DELETE /api/cart/clear/`

### Commandes

- `POST /api/orders/`
- `GET /api/me/orders/`
- `GET /api/me/orders/{order_number}/`
- `PATCH /api/orders/{order_number}/cancel/`

### Avis

- `GET /api/reviews/`
- `POST /api/reviews/`
- `GET /api/products/{slug}/reviews/`

### Contact

- `POST /api/contact-messages/`

### Marches

- `GET /api/markets/`

## 5. Authentification conseillee

Pour un site comme Capri Exo, le plus simple au depart est :

- Django + Django REST Framework
- authentification par token

Deux options serieuses :

1. `SessionAuthentication`
   - bien si tu fais un front Django classique

2. JWT
   - bien si ton front HTML/JS appelle l'API directement

Comme ton front est en HTML/CSS/JS separe, JWT est souvent le plus pratique.

## 6. Correspondance avec ton front actuel

Ton `produit.js` prepare deja une partie de la suite :

- `products` -> futur `Product`
- `inventory` -> futur `Inventory`
- `clients` -> futur `Customer`
- `favoritesIndex` -> futur `Favorite`
- `orders` -> futurs `Order` + `OrderItem`
- `reviews` -> futur `Review`
- `messages` -> futur `ContactMessage`

Autrement dit, le travail fait dans le front n'est pas perdu.

## 7. Priorite de mise en place

L'ordre le plus intelligent est :

1. `Market`
2. `ProductCategory`
3. `Product`
4. `Inventory`
5. `Customer`
6. `Favorite`
7. `Order`
8. `OrderItem`
9. `Review`
10. `ContactMessage`

## 8. Plan de migration conseille

### Etape 1

Mettre les produits et stocks dans la base.

Objectif :
- ne plus depender du catalogue ecrit en dur dans le front

### Etape 2

Creer les comptes clients.

Objectif :
- connexion
- favoris sauvegardes
- historique

### Etape 3

Brancher les commandes.

Objectif :
- validation reelle
- numero de commande
- suivi

### Etape 4

Brancher les avis et messages.

Objectif :
- moderation
- gestion admin

## 9. Ce qu'il vaut mieux ne pas faire

Pour garder un projet propre, il vaut mieux eviter :

- une seule grosse table `OrderRequest` avec tout melange dedans
- les stocks geres seulement par un booleen `in_stock`
- les favoris uniquement en localStorage a long terme
- les avis sans statut de moderation
- les commandes sans lignes detaillees

## 10. Version minimum viable conseillee

Si tu veux une premiere vraie version back-end sans te compliquer la vie, fais :

- `Market`
- `ProductCategory`
- `Product`
- `Inventory`
- `Customer`
- `Favorite`
- `Order`
- `OrderItem`
- `Review`
- `ContactMessage`

Et pour commencer :

- pas de paiement integre
- pas de livraison complexe
- pas de promo avancee
- pas de comptes vendeurs

## 11. Recommandation concrete pour ton projet

Pour Capri Exo, je te conseille :

- garder Django
- garder DRF
- creer une vraie structure de produits et de stocks
- brancher ensuite les commandes
- utiliser les comptes clients pour les favoris et l'historique
- garder WhatsApp comme canal de confirmation en parallele au debut

Ca te donnera un site plus serieux sans tout compliquer tout de suite.

## 12. Prochaine etape ideale

La prochaine vraie etape de code serait :

1. refondre les modeles Django actuels
2. creer les migrations
3. exposer les nouvelles routes API
4. brancher `produit.js` sur l'API produits
5. brancher ensuite panier, favoris et commandes

