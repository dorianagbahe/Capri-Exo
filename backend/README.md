# Capri Exo - Backend API (Django)

## Lancer le projet
1. `cd "C:\Users\dagba\OneDrive\Documents\New project\capriexo_backend"`
2. `python manage.py migrate`
3. `python manage.py createsuperuser`
4. `python manage.py runserver`

API disponible sur: `http://127.0.0.1:8000/api/`
Admin: `http://127.0.0.1:8000/admin/`

## Gérer les produits depuis le navigateur
1. Créer votre compte administrateur une seule fois avec `py manage.py createsuperuser`.
2. Démarrer le serveur avec `py manage.py runserver`.
3. Ouvrir `http://127.0.0.1:8000/admin/` et vous connecter.
4. Dans **Produits**, ajouter un produit ou ouvrir un produit existant.
5. Compléter son prix, son stock, son image et les informations de sa fiche.
6. Cocher **Produit publié** pour l'afficher dans le catalogue.
7. Cocher ou décocher chaque option de la section **Informations visibles sur la fiche produit**.
8. Enregistrer : le front-end récupère ensuite ces choix depuis l'API.

L'administration Django est protégée. Ne communiquez jamais votre identifiant ni votre mot de passe administrateur.

## Modifier rapidement les prix et les stocks
La liste **Administration > Produits** permet de modifier directement, sur chaque ligne :

- le prix ;
- le type de vente (`kg`, `pièce`, `sachet`, etc.) ;
- le statut **Produit rare** ;
- la publication du produit ;
- sa disponibilité ;
- son stock réel.

Après les modifications, utilisez le bouton **Enregistrer** en bas de la liste. Un stock à `0` rend le produit indisponible. Un stock laissé vide signifie que la quantité exacte n'est pas encore suivie : le produit reste commandable si la case **Disponible** est cochée.

Lorsqu'une commande est acceptée par l'API, le stock correspondant est contrôlé puis diminué automatiquement. Le serveur refuse une commande supérieure au stock disponible.

## Importer le catalogue du site
Pour ajouter une première fois tous les produits du front-end dans l'administration :

```powershell
py manage.py import_front_catalog
```

La commande conserve les prix et stocks des produits déjà présents. L'option `--update-existing` met aussi à jour leurs textes et prix depuis le fichier d'import ; utilisez-la uniquement si cette mise à jour est volontaire.

## Endpoints principaux
- `GET /api/products/`
- `GET /api/products/{id}/`
- `GET /api/reviews/`
- `POST /api/reviews/`
- `POST /api/contact-messages/`
- `POST /api/order-requests/`

## Exemples JSON
### POST contact
```json
{
  "name": "Client Test",
  "email": "client@test.com",
  "subject": "Demande info",
  "message": "Bonjour, avez-vous du gingembre en stock ?"
}
```

### POST avis
```json
{
  "product": 1,
  "author_name": "Awa",
  "author_email": "awa@test.com",
  "rating": 5,
  "comment": "Tres bons produits"
}
```

### POST demande de commande
```json
{
  "customer_name": "M. Diallo",
  "customer_email": "diallo@test.com",
  "customer_phone": "0600000000",
  "customer_address": "Paris",
  "items": [
    {"slug": "avocat", "qty": 2, "unit": "kg"},
    {"slug": "gingembre", "qty": 1, "unit": "kg"}
  ],
  "total_estimated": "29.00",
  "notes": "Livraison vendredi"
}
```
