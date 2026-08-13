// Diagnostic initial du projet. Les coches modifiées par l'utilisateur sont ensuite conservées dans le navigateur.
const trackerTasks = [
  { id: "front-01", domain: "Front-end", section: "Structure", title: "Structure HTML sémantique", detail: "Conserver un seul contenu principal, des sections identifiables et une hiérarchie logique sur chaque page.", priority: "Haute", done: true },
  { id: "front-02", domain: "Front-end", section: "Navigation", title: "Menu principal sur toutes les pages", detail: "Vérifier que Produits, Suivi, À propos, Contact, Panier et Connexion mènent toujours au bon endroit.", priority: "Critique", done: true },
  { id: "front-03", domain: "Front-end", section: "Navigation", title: "Menu mobile hamburger", detail: "Tester l'ouverture, la fermeture, la hauteur disponible et l'absence de débordement sur les petits écrans.", priority: "Haute", done: true },
  { id: "front-04", domain: "Front-end", section: "Navigation", title: "Page active dans le menu", detail: "Afficher clairement la page actuelle avec aria-current et un style cohérent.", priority: "Moyenne", done: true },
  { id: "front-05", domain: "Front-end", section: "Navigation", title: "Retour vers le haut", detail: "Conserver un bouton accessible qui apparaît après le défilement des longues pages.", priority: "Moyenne", done: true },
  { id: "front-06", domain: "Front-end", section: "Composants", title: "Header et footer uniformes", detail: "Utiliser la même structure, les mêmes liens et les mêmes espacements sur toutes les pages.", priority: "Haute", done: true },
  { id: "front-07", domain: "Front-end", section: "Responsive", title: "Mise en page tablette", detail: "Contrôler les grilles, formulaires, fiches produit, panier et tableaux entre 721 et 1120 pixels.", priority: "Haute", done: false },
  { id: "front-08", domain: "Front-end", section: "Responsive", title: "Mise en page mobile", detail: "Vérifier chaque page entre 320 et 720 pixels sans texte coupé, chevauchement ni défilement horizontal.", priority: "Critique", done: false },
  { id: "front-09", domain: "Front-end", section: "Erreurs", title: "Page 404 personnalisée", detail: "Créer une page introuvable avec un lien clair vers l'accueil et le catalogue.", priority: "Moyenne", done: false },
  { id: "front-10", domain: "Front-end", section: "Compatibilité", title: "Navigation sans JavaScript", detail: "Prévoir au minimum des contenus et liens compréhensibles lorsque JavaScript est indisponible.", priority: "Basse", done: false },

  { id: "content-01", domain: "Contenus", section: "Accueil", title: "Titre principal clair", detail: "Conserver un H1 unique qui explique immédiatement l'offre de produits exotiques du stand.", priority: "Haute", done: true },
  { id: "content-02", domain: "Contenus", section: "Accueil", title: "Introduction courte", detail: "Présenter Capri Exo, le catalogue et les deux marchés en deux ou trois phrases maximum.", priority: "Haute", done: true },
  { id: "content-03", domain: "Contenus", section: "Accueil", title: "Accès direct au catalogue", detail: "Laisser le catalogue visible rapidement et conserver un bouton d'accès dans la première zone de la page.", priority: "Critique", done: true },
  { id: "content-04", domain: "Contenus", section: "Accueil", title: "Nouveautés réellement à jour", detail: "Définir une règle claire pour choisir les produits affichés dans la section nouveautés.", priority: "Moyenne", done: false },
  { id: "content-05", domain: "Contenus", section: "Entreprise", title: "Histoire définitive de Capri Exo", detail: "Remplacer les textes provisoires par l'origine réelle du projet, ses valeurs et son lien avec le marché.", priority: "Haute", done: false },
  { id: "content-06", domain: "Contenus", section: "Marchés", title: "Texte réel pour Cergy", detail: "Valider l'adresse, les jours, les horaires, le repère du stand et les possibilités de retrait.", priority: "Critique", done: false },
  { id: "content-07", domain: "Contenus", section: "Marchés", title: "Texte réel pour Mantes-la-Jolie", detail: "Valider l'adresse, les jours, les horaires, le repère du stand et les possibilités de retrait.", priority: "Critique", done: false },
  { id: "content-08", domain: "Contenus", section: "Ton éditorial", title: "Uniformiser le vocabulaire", detail: "Employer partout les mêmes termes pour sachet, pièce, kilo, disponibilité, retrait et commande.", priority: "Moyenne", done: false },
  { id: "content-09", domain: "Contenus", section: "Orthographe", title: "Relecture générale", detail: "Corriger les accents, accords, majuscules, apostrophes et formulations de toutes les pages et fiches produit.", priority: "Haute", done: false },
  { id: "content-10", domain: "Contenus", section: "Informations pratiques", title: "Coordonnées définitives", detail: "Renseigner le vrai téléphone, l'email professionnel, WhatsApp et les horaires de réponse.", priority: "Critique", done: false },

  { id: "product-01", domain: "Produits", section: "Catalogue", title: "Catalogue centralisé", detail: "Conserver toutes les données produit dans une source unique afin d'éviter les fiches HTML en double.", priority: "Critique", done: true },
  { id: "product-02", domain: "Produits", section: "Catalogue", title: "Identifiants uniques", detail: "Vérifier qu'aucun produit ne partage le même id et que les liens de fiche restent stables.", priority: "Critique", done: true },
  { id: "product-03", domain: "Produits", section: "Catalogue", title: "Cartes produit lisibles", detail: "Afficher clairement le nom, le prix, l'unité, la disponibilité et l'accès à la fiche.", priority: "Haute", done: true },
  { id: "product-04", domain: "Produits", section: "Recherche", title: "Recherche instantanée", detail: "Retrouver les produits par nom sans saut de page ni comportement inattendu du clavier.", priority: "Haute", done: true },
  { id: "product-05", domain: "Produits", section: "Filtres", title: "Filtre par catégorie", detail: "Permettre de combiner une catégorie avec le texte recherché et le tri choisi.", priority: "Moyenne", done: true },
  { id: "product-06", domain: "Produits", section: "Filtres", title: "Filtre par disponibilité", detail: "Distinguer disponible, limité, sur commande et rupture avec des données fiables.", priority: "Haute", done: true },
  { id: "product-07", domain: "Produits", section: "Filtres", title: "Filtre par type de vente", detail: "Séparer correctement les produits au kilo, à la pièce, au sachet, au pot et au litre.", priority: "Moyenne", done: true },
  { id: "product-08", domain: "Produits", section: "Tri", title: "Tri du catalogue", detail: "Conserver les tris par nom, prix et nouveautés sans perturber les autres filtres.", priority: "Moyenne", done: true },
  { id: "product-09", domain: "Produits", section: "Fiches", title: "Fiche dynamique unique", detail: "Ouvrir produit.html avec l'identifiant demandé et afficher les bonnes données sans créer une page par produit.", priority: "Critique", done: true },
  { id: "product-10", domain: "Produits", section: "Fiches", title: "Informations détaillées complètes", detail: "Renseigner description, origine, conservation, disponibilité, format, conseil et éventuel niveau de piquant.", priority: "Haute", done: false },
  { id: "product-11", domain: "Produits", section: "Prix", title: "Validation de tous les prix", detail: "Faire relire chaque tarif et chaque unité de vente avant l'ouverture des commandes réelles.", priority: "Critique", done: false },
  { id: "product-12", domain: "Produits", section: "Prix", title: "Calcul des produits au kilo", detail: "Afficher immédiatement le prix de 250 g, 500 g, 1 kg, 2 kg et des poids personnalisés.", priority: "Critique", done: true },
  { id: "product-13", domain: "Produits", section: "Quantités", title: "Produits à la pièce ou au sachet", detail: "Ne jamais proposer de poids pour les références vendues à l'unité.", priority: "Critique", done: true },
  { id: "product-14", domain: "Produits", section: "Suggestions", title: "Produits similaires", detail: "Afficher des suggestions cohérentes selon la catégorie ou les associations culinaires.", priority: "Moyenne", done: true },
  { id: "product-15", domain: "Produits", section: "Favoris", title: "Favoris locaux", detail: "Permettre d'ajouter et retirer un produit des favoris dans le navigateur.", priority: "Moyenne", done: true },
  { id: "product-16", domain: "Produits", section: "Favoris", title: "Favoris liés au compte", detail: "Sauvegarder les favoris dans la base de données après connexion du client.", priority: "Moyenne", done: false },
  { id: "product-17", domain: "Produits", section: "Stock", title: "Quantités de stock réelles", detail: "Utiliser une quantité fiable par produit et empêcher les commandes supérieures au stock disponible.", priority: "Critique", done: false },
  { id: "product-18", domain: "Produits", section: "Administration", title: "Modification simple des produits", detail: "Permettre au responsable de modifier prix, stock, photo et disponibilité sans éditer JavaScript.", priority: "Critique", done: false },

  { id: "photo-01", domain: "Photos", section: "Produits", title: "Une vraie photo par produit", detail: "Remplacer toutes les images provisoires, génériques ou manquantes par une photo correspondant à la référence vendue.", priority: "Critique", done: false },
  { id: "photo-02", domain: "Photos", section: "Produits", title: "Noms de fichiers web propres", detail: "Utiliser uniquement des noms courts sans espace, accent, emoji ni antislash.", priority: "Haute", done: false },
  { id: "photo-03", domain: "Photos", section: "Optimisation", title: "Compression des images", detail: "Réduire le poids des photos et privilégier WebP ou AVIF sans perte visible de qualité.", priority: "Critique", done: false },
  { id: "photo-04", domain: "Photos", section: "Affichage", title: "Cadrage uniforme du catalogue", detail: "Conserver un ratio stable, un rendu net et aucune déformation sur mobile ou ordinateur.", priority: "Haute", done: true },
  { id: "photo-05", domain: "Photos", section: "Affichage", title: "Image entière sur la fiche", detail: "Afficher le produit complet dans la page détaillée avec des bords cohérents.", priority: "Haute", done: true },
  { id: "photo-06", domain: "Photos", section: "Accessibilité", title: "Textes alternatifs descriptifs", detail: "Décrire utilement chaque image sans répéter inutilement le mot image.", priority: "Haute", done: true },
  { id: "photo-07", domain: "Photos", section: "Marchés", title: "Photo réelle du stand de Cergy", detail: "Ajouter une image récente, lumineuse et correctement cadrée de l'emplacement réel.", priority: "Haute", done: false },
  { id: "photo-08", domain: "Photos", section: "Marchés", title: "Photo réelle du stand de Mantes", detail: "Ajouter une image récente, lumineuse et correctement cadrée de l'emplacement réel.", priority: "Haute", done: false },
  { id: "photo-09", domain: "Photos", section: "Entreprise", title: "Galerie À propos", detail: "Ajouter des photos du stand, de l'équipe et de la sélection sans conserver de faux emplacements.", priority: "Moyenne", done: false },
  { id: "photo-10", domain: "Photos", section: "Droits", title: "Droits d'utilisation vérifiés", detail: "Conserver la preuve que chaque photo et chaque logo peuvent légalement être publiés.", priority: "Critique", done: false },

  { id: "cart-01", domain: "Panier et commande", section: "Panier", title: "Ajouter au panier", detail: "Ajouter la bonne référence avec le prix, l'image, l'unité, la quantité ou le poids choisis.", priority: "Critique", done: true },
  { id: "cart-02", domain: "Panier et commande", section: "Panier", title: "Modifier les quantités", detail: "Recalculer chaque ligne immédiatement lorsque le nombre d'articles change.", priority: "Critique", done: true },
  { id: "cart-03", domain: "Panier et commande", section: "Panier", title: "Modifier le poids", detail: "Recalculer le prix d'un produit au kilo sans proposer ce contrôle aux produits à l'unité.", priority: "Critique", done: true },
  { id: "cart-04", domain: "Panier et commande", section: "Panier", title: "Supprimer une ligne", detail: "Retirer proprement un article et mettre à jour le total et le badge du panier.", priority: "Critique", done: true },
  { id: "cart-05", domain: "Panier et commande", section: "Panier", title: "Vider le panier", detail: "Demander confirmation puis remettre le panier et les totaux à zéro.", priority: "Haute", done: true },
  { id: "cart-06", domain: "Panier et commande", section: "Panier", title: "Total détaillé", detail: "Afficher sous-total, éventuels frais, remises et total final avec une hiérarchie claire.", priority: "Critique", done: false },
  { id: "cart-07", domain: "Panier et commande", section: "Parcours", title: "Continuer les achats", detail: "Permettre de revenir directement au catalogue sans perdre le panier.", priority: "Moyenne", done: true },
  { id: "cart-08", domain: "Panier et commande", section: "Retrait", title: "Choix du marché de retrait", detail: "Proposer Cergy ou Mantes-la-Jolie et enregistrer ce choix avec la commande.", priority: "Critique", done: true },
  { id: "cart-09", domain: "Panier et commande", section: "Retrait", title: "Créneaux de retrait réels", detail: "Proposer uniquement les jours et horaires réellement disponibles pour chaque marché.", priority: "Critique", done: false },
  { id: "cart-10", domain: "Panier et commande", section: "Client", title: "Formulaire d'informations client", detail: "Collecter nom, email, téléphone et informations nécessaires avant confirmation.", priority: "Critique", done: true },
  { id: "cart-11", domain: "Panier et commande", section: "Client", title: "Validation des coordonnées", detail: "Contrôler les formats, afficher les erreurs près des champs et empêcher les données incomplètes.", priority: "Critique", done: false },
  { id: "cart-12", domain: "Panier et commande", section: "Confirmation", title: "Enregistrement serveur", detail: "Créer une vraie commande en base et retourner un numéro stable au client.", priority: "Critique", done: false },
  { id: "cart-13", domain: "Panier et commande", section: "Confirmation", title: "Email de confirmation", detail: "Envoyer automatiquement le récapitulatif, le numéro de commande et le point de retrait.", priority: "Critique", done: false },
  { id: "cart-14", domain: "Panier et commande", section: "WhatsApp", title: "Commande WhatsApp", detail: "Générer un message lisible avec lignes, poids, total, client et lieu de retrait.", priority: "Haute", done: true },
  { id: "cart-15", domain: "Panier et commande", section: "Paiement", title: "Paiement en ligne réel", detail: "Connecter un prestataire sécurisé, gérer succès, échec, annulation et remboursement.", priority: "Critique", done: false },
  { id: "cart-16", domain: "Panier et commande", section: "Historique", title: "Historique client", detail: "Afficher les commandes passées et leurs statuts dans l'espace connecté.", priority: "Moyenne", done: false },

  { id: "contact-01", domain: "Contact et avis", section: "Contact", title: "Formulaire de contact visible", detail: "Collecter les informations nécessaires avec des libellés clairs et des champs adaptés.", priority: "Haute", done: true },
  { id: "contact-02", domain: "Contact et avis", section: "Contact", title: "Message enregistré en base", detail: "Transmettre chaque demande au back-end et permettre son suivi depuis l'administration.", priority: "Haute", done: true },
  { id: "contact-03", domain: "Contact et avis", section: "Contact", title: "Notification au responsable", detail: "Envoyer un email ou une notification lors de la réception d'un nouveau message.", priority: "Haute", done: false },
  { id: "contact-04", domain: "Contact et avis", section: "Avis", title: "Formulaire avec note sur cinq", detail: "Collecter nom, email, marché, commentaire et note avec un retour visuel compréhensible.", priority: "Haute", done: true },
  { id: "contact-05", domain: "Contact et avis", section: "Avis", title: "Modération des avis", detail: "Ne publier un avis qu'après validation depuis l'administration.", priority: "Critique", done: true },
  { id: "contact-06", domain: "Contact et avis", section: "Avis", title: "Afficher les avis publiés du serveur", detail: "Charger les avis approuvés depuis l'API au lieu de dépendre uniquement du navigateur.", priority: "Haute", done: false },
  { id: "contact-07", domain: "Contact et avis", section: "Protection", title: "Protection anti-spam", detail: "Ajouter limitation de fréquence, champ piège ou CAPTCHA si les abus apparaissent.", priority: "Haute", done: false },
  { id: "contact-08", domain: "Contact et avis", section: "Confidentialité", title: "Ne pas afficher l'email des auteurs", detail: "Masquer les coordonnées personnelles dans les avis visibles publiquement.", priority: "Critique", done: false },

  { id: "back-01", domain: "Back-end", section: "Architecture", title: "Projet Django initialisé", detail: "Conserver une configuration claire avec application métier, paramètres et routes API séparés.", priority: "Critique", done: true },
  { id: "back-02", domain: "Back-end", section: "Base de données", title: "Modèle Produit", detail: "Stocker nom, identifiant, catégorie, prix, unité, description, image, disponibilité et dates.", priority: "Critique", done: true },
  { id: "back-03", domain: "Back-end", section: "Base de données", title: "Modèles Avis et Contact", detail: "Conserver les messages, notes, statuts de modération et dates de traitement.", priority: "Haute", done: true },
  { id: "back-04", domain: "Back-end", section: "Base de données", title: "Modèle Commande", detail: "Conserver le client, le retrait, le paiement, le total, le statut et les dates.", priority: "Critique", done: true },
  { id: "back-05", domain: "Back-end", section: "Base de données", title: "Lignes de commande normalisées", detail: "Créer un modèle OrderItem plutôt qu'un simple champ JSON afin de fiabiliser prix et quantités.", priority: "Haute", done: false },
  { id: "back-06", domain: "Back-end", section: "Base de données", title: "PostgreSQL en production", detail: "Remplacer SQLite pour l'hébergement réel et documenter les sauvegardes et migrations.", priority: "Critique", done: false },
  { id: "back-07", domain: "Back-end", section: "API", title: "Endpoints principaux", detail: "Exposer produits, avis, contacts et demandes de commande avec sérialiseurs et validations.", priority: "Critique", done: true },
  { id: "back-08", domain: "Back-end", section: "API", title: "Catalogue chargé depuis l'API", detail: "Faire de la base de données la source officielle et conserver un mode de secours cohérent.", priority: "Critique", done: false },
  { id: "back-09", domain: "Back-end", section: "API", title: "Gestion des erreurs API", detail: "Afficher un message utile, journaliser l'erreur et éviter toute perte de panier.", priority: "Haute", done: false },
  { id: "back-10", domain: "Back-end", section: "Administration", title: "Administration Django", detail: "Gérer produits, stock, commandes, contacts et avis depuis un espace protégé.", priority: "Critique", done: true },
  { id: "back-11", domain: "Back-end", section: "Comptes", title: "Création de compte client", detail: "Créer un compte avec email unique, mot de passe sécurisé et validation des données.", priority: "Haute", done: false },
  { id: "back-12", domain: "Back-end", section: "Comptes", title: "Connexion et déconnexion réelles", detail: "Relier connexion.html à une authentification sécurisée avec session ou jeton adapté.", priority: "Critique", done: false },
  { id: "back-13", domain: "Back-end", section: "Comptes", title: "Réinitialisation du mot de passe", detail: "Envoyer un lien temporaire et sécurisé à l'adresse du client.", priority: "Haute", done: false },
  { id: "back-14", domain: "Back-end", section: "Comptes", title: "Profil client", detail: "Permettre la modification des coordonnées et la consultation des commandes et favoris.", priority: "Moyenne", done: false },
  { id: "back-15", domain: "Back-end", section: "Stock", title: "Décrémentation atomique du stock", detail: "Réserver ou retirer le stock sans risque de vente simultanée au-delà de la quantité disponible.", priority: "Critique", done: false },
  { id: "back-16", domain: "Back-end", section: "Stock", title: "Stock adapté aux unités", detail: "Gérer séparément pièces, sachets, kilogrammes, litres et produits à poids variable.", priority: "Critique", done: false },
  { id: "back-17", domain: "Back-end", section: "Paiement", title: "Intégration du prestataire", detail: "Créer les paiements côté serveur sans faire confiance au prix envoyé par le navigateur.", priority: "Critique", done: false },
  { id: "back-18", domain: "Back-end", section: "Paiement", title: "Webhooks de paiement", detail: "Mettre à jour la commande après confirmation signée du prestataire de paiement.", priority: "Critique", done: false },
  { id: "back-19", domain: "Back-end", section: "Emails", title: "Service d'envoi d'emails", detail: "Configurer un expéditeur professionnel pour confirmations, réinitialisations et notifications.", priority: "Critique", done: false },
  { id: "back-20", domain: "Back-end", section: "Production", title: "Variables d'environnement", detail: "Sortir secret Django, mots de passe, clés API et paramètres sensibles du code source.", priority: "Critique", done: false },
  { id: "back-21", domain: "Back-end", section: "Production", title: "Fichiers médias en production", detail: "Choisir un stockage durable pour les photos produit et définir les règles de redimensionnement.", priority: "Haute", done: false },
  { id: "back-22", domain: "Back-end", section: "Production", title: "Sauvegardes automatiques", detail: "Sauvegarder la base et les médias, chiffrer les copies et tester une restauration.", priority: "Critique", done: false },

  { id: "legal-01", domain: "Légal et sécurité", section: "Mentions", title: "Modèle de mentions légales", detail: "Conserver la structure actuelle comme base de travail avant personnalisation.", priority: "Haute", done: true },
  { id: "legal-02", domain: "Légal et sécurité", section: "Mentions", title: "Identité réelle de l'éditeur", detail: "Renseigner nom ou société, forme juridique, adresse, email, téléphone et responsable de publication.", priority: "Critique", done: false },
  { id: "legal-03", domain: "Légal et sécurité", section: "Mentions", title: "SIREN, SIRET et immatriculation", detail: "Ajouter les identifiants applicables à l'activité après validation par le responsable.", priority: "Critique", done: false },
  { id: "legal-04", domain: "Légal et sécurité", section: "Vente", title: "Conditions générales de vente", detail: "Décrire commande, prix, paiement, retrait, livraison, réclamation, annulation et remboursement.", priority: "Critique", done: false },
  { id: "legal-05", domain: "Légal et sécurité", section: "Données", title: "Politique de confidentialité", detail: "Expliquer les données collectées, finalités, bases légales, durées, destinataires et droits.", priority: "Critique", done: false },
  { id: "legal-06", domain: "Légal et sécurité", section: "Données", title: "Consentement des formulaires", detail: "Ajouter les mentions nécessaires et recueillir un accord lorsqu'il est juridiquement requis.", priority: "Critique", done: false },
  { id: "legal-07", domain: "Légal et sécurité", section: "Cookies", title: "Choix relatif aux cookies", detail: "Lister les traceurs et ajouter un bandeau uniquement lorsque des cookies non essentiels sont utilisés.", priority: "Haute", done: false },
  { id: "legal-08", domain: "Légal et sécurité", section: "Sécurité", title: "HTTPS obligatoire", detail: "Servir le front-end, le back-end et les médias uniquement via des connexions chiffrées.", priority: "Critique", done: false },
  { id: "legal-09", domain: "Légal et sécurité", section: "Sécurité", title: "Protection CSRF et CORS", detail: "Limiter les origines autorisées et protéger chaque action sensible en production.", priority: "Critique", done: false },
  { id: "legal-10", domain: "Légal et sécurité", section: "Sécurité", title: "Limitation des requêtes", detail: "Bloquer les tentatives abusives sur connexion, avis, contact et commande.", priority: "Haute", done: false },
  { id: "legal-11", domain: "Légal et sécurité", section: "Données", title: "Suppression et durée de conservation", detail: "Définir quand supprimer comptes, paniers, messages, avis et commandes, puis automatiser ce cycle.", priority: "Haute", done: false },

  { id: "quality-01", domain: "SEO et qualité", section: "Référencement", title: "Titres et descriptions uniques", detail: "Conserver un title et une meta description spécifiques sur chaque page publique.", priority: "Haute", done: true },
  { id: "quality-02", domain: "SEO et qualité", section: "Référencement", title: "Un seul H1 par page", detail: "Maintenir une hiérarchie H1, H2 et H3 compréhensible sans utiliser les titres uniquement pour leur taille.", priority: "Haute", done: true },
  { id: "quality-03", domain: "SEO et qualité", section: "Référencement", title: "Données structurées Product", detail: "Ajouter JSON-LD avec nom, image, prix, devise, disponibilité et vendeur pour chaque fiche.", priority: "Moyenne", done: false },
  { id: "quality-04", domain: "SEO et qualité", section: "Référencement", title: "Sitemap et robots.txt", detail: "Créer, publier et déclarer les URL indexables tout en excluant les zones privées.", priority: "Haute", done: false },
  { id: "quality-05", domain: "SEO et qualité", section: "Partage", title: "Aperçus Open Graph", detail: "Définir titre, description et image pour les partages WhatsApp, Facebook et autres réseaux.", priority: "Moyenne", done: false },
  { id: "quality-06", domain: "SEO et qualité", section: "Performance", title: "Chargement différé des images", detail: "Charger en priorité le premier écran et différer les images situées plus bas dans la page.", priority: "Haute", done: true },
  { id: "quality-07", domain: "SEO et qualité", section: "Performance", title: "Audit Lighthouse", detail: "Atteindre des résultats satisfaisants en performance, accessibilité, bonnes pratiques et SEO.", priority: "Haute", done: false },
  { id: "quality-08", domain: "SEO et qualité", section: "Performance", title: "Réduire CSS et JavaScript inutiles", detail: "Supprimer les règles et fonctions inutilisées puis charger seulement les scripts nécessaires à chaque page.", priority: "Moyenne", done: false },
  { id: "quality-09", domain: "SEO et qualité", section: "Accessibilité", title: "Navigation complète au clavier", detail: "Atteindre tous les liens, boutons, filtres, formulaires, modales et cases sans souris.", priority: "Critique", done: false },
  { id: "quality-10", domain: "SEO et qualité", section: "Accessibilité", title: "Focus visible", detail: "Afficher un contour clair sur chaque contrôle interactif pendant la navigation au clavier.", priority: "Critique", done: false },
  { id: "quality-11", domain: "SEO et qualité", section: "Accessibilité", title: "Contrastes vérifiés", detail: "Contrôler textes, boutons, badges, erreurs et états désactivés selon WCAG.", priority: "Haute", done: false },
  { id: "quality-12", domain: "SEO et qualité", section: "Accessibilité", title: "Messages annoncés", detail: "Utiliser des zones aria-live pour confirmations, erreurs, panier et résultats filtrés.", priority: "Moyenne", done: false },

  { id: "launch-01", domain: "Tests et lancement", section: "Tests", title: "Scénario complet de commande", detail: "Tester recherche, fiche, poids, quantité, panier, coordonnées, retrait, paiement et confirmation.", priority: "Critique", done: false },
  { id: "launch-02", domain: "Tests et lancement", section: "Tests", title: "Tests automatisés du back-end", detail: "Tester modèles, permissions, validation des prix, stock, commandes, avis et erreurs API.", priority: "Critique", done: false },
  { id: "launch-03", domain: "Tests et lancement", section: "Tests", title: "Tests du front-end", detail: "Automatiser les parcours essentiels avec plusieurs tailles d'écran et jeux de données.", priority: "Haute", done: false },
  { id: "launch-04", domain: "Tests et lancement", section: "Navigateurs", title: "Chrome, Safari, Firefox et Edge", detail: "Contrôler les fonctionnalités, formulaires, animations et images dans les navigateurs récents.", priority: "Critique", done: false },
  { id: "launch-05", domain: "Tests et lancement", section: "Appareils", title: "Tests sur vrais téléphones", detail: "Tester au minimum un iPhone, un téléphone Android et une tablette avec réseau mobile.", priority: "Critique", done: false },
  { id: "launch-06", domain: "Tests et lancement", section: "Liens", title: "Aucun lien ni média cassé", detail: "Scanner toutes les pages, ancres, scripts, feuilles de style et images avant publication.", priority: "Critique", done: false },
  { id: "launch-07", domain: "Tests et lancement", section: "Hébergement", title: "Front-end publié", detail: "Maintenir la version publique sur GitHub Pages ou migrer vers un hébergement adapté au domaine.", priority: "Haute", done: true },
  { id: "launch-08", domain: "Tests et lancement", section: "Hébergement", title: "Back-end publié", detail: "Déployer Django, PostgreSQL, médias, variables d'environnement et HTTPS sur un service fiable.", priority: "Critique", done: false },
  { id: "launch-09", domain: "Tests et lancement", section: "Domaine", title: "Nom de domaine professionnel", detail: "Choisir le domaine, configurer DNS, HTTPS, redirections et adresse email professionnelle.", priority: "Haute", done: false },
  { id: "launch-10", domain: "Tests et lancement", section: "Supervision", title: "Journalisation des erreurs", detail: "Centraliser les erreurs front-end et back-end sans enregistrer de données sensibles.", priority: "Haute", done: false },
  { id: "launch-11", domain: "Tests et lancement", section: "Supervision", title: "Surveillance de disponibilité", detail: "Recevoir une alerte si le site, l'API, la base ou le paiement deviennent indisponibles.", priority: "Haute", done: false },
  { id: "launch-12", domain: "Tests et lancement", section: "Exploitation", title: "Procédure de mise à jour du stock", detail: "Définir qui actualise les quantités, quand et comment gérer les écarts avec le stand.", priority: "Critique", done: false },
  { id: "launch-13", domain: "Tests et lancement", section: "Exploitation", title: "Procédure de préparation des commandes", detail: "Définir réception, validation, préparation, contact client, retrait et clôture.", priority: "Critique", done: false },
  { id: "launch-14", domain: "Tests et lancement", section: "Exploitation", title: "Modes de paiement confirmés", detail: "Indiquer clairement les paiements réellement acceptés au stand, à la livraison et en ligne.", priority: "Critique", done: false },
  { id: "launch-15", domain: "Tests et lancement", section: "Exploitation", title: "Responsable du site formé", detail: "Savoir ajouter un produit, modifier un prix, gérer le stock, traiter une commande et restaurer une sauvegarde.", priority: "Haute", done: false },
  { id: "launch-16", domain: "Tests et lancement", section: "Lancement", title: "Validation finale par Capri Exo", detail: "Faire relire contenus, prix, photos, règles commerciales et parcours complet avant l'ouverture officielle.", priority: "Critique", done: false },
  { id: "launch-17", domain: "Tests et lancement", section: "Lancement", title: "Protéger ou retirer la page Suivi", detail: "Avant l'ouverture au public, réserver cette checklist à l'administration ou supprimer son lien du menu client.", priority: "Critique", done: false }
];

const trackerStorageKey = "capriExoProjectTrackerV1";
let trackerStatusFilter = "all";

function trackerInitialState() {
  return Object.fromEntries(trackerTasks.map((task) => [task.id, task.done]));
}

function trackerLoadState() {
  const initialState = trackerInitialState();

  try {
    const savedState = JSON.parse(localStorage.getItem(trackerStorageKey) || "{}");
    return { ...initialState, ...savedState };
  } catch (error) {
    console.warn("Suivi Capri Exo illisible, diagnostic initial restauré.", error);
    return initialState;
  }
}

let trackerState = trackerLoadState();

function trackerSaveState() {
  localStorage.setItem(trackerStorageKey, JSON.stringify(trackerState));
}

function trackerEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function trackerSearchValue(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function trackerPriorityClass(priority) {
  return trackerSearchValue(priority).replaceAll(" ", "-");
}

function trackerFilteredTasks() {
  const search = trackerSearchValue(document.getElementById("trackerSearch")?.value || "");
  const domain = document.getElementById("trackerDomainFilter")?.value || "all";

  return trackerTasks.filter((task) => {
    const isDone = Boolean(trackerState[task.id]);
    const searchableText = trackerSearchValue(`${task.domain} ${task.section} ${task.title} ${task.detail} ${task.priority}`);
    const matchesSearch = !search || searchableText.includes(search);
    const matchesDomain = domain === "all" || task.domain === domain;
    const matchesStatus = trackerStatusFilter === "all" || (trackerStatusFilter === "done" ? isDone : !isDone);
    return matchesSearch && matchesDomain && matchesStatus;
  });
}

function trackerRenderProgress() {
  const completed = trackerTasks.filter((task) => trackerState[task.id]).length;
  const total = trackerTasks.length;
  const remaining = total - completed;
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  const progress = document.getElementById("trackerProgress");

  if (progress) {
    progress.value = percentage;
    progress.textContent = `${percentage} %`;
  }

  document.getElementById("trackerProgressText").textContent = `${percentage} % terminé`;
  document.getElementById("trackerCompletedCount").textContent = completed;
  document.getElementById("trackerRemainingCount").textContent = remaining;
  document.getElementById("trackerTotalCount").textContent = total;
}

function trackerRenderTable() {
  const target = document.getElementById("trackerTableBody");
  const emptyState = document.getElementById("trackerEmptyState");
  const visibleTasks = trackerFilteredTasks();

  target.innerHTML = visibleTasks.map((task) => {
    const isDone = Boolean(trackerState[task.id]);
    const stateLabel = isDone ? "Terminé" : "À faire";

    return `
      <tr class="${isDone ? "is-complete" : ""}">
        <td data-label="Fait" class="tracker-check-cell">
          <input
            type="checkbox"
            id="tracker-${trackerEscape(task.id)}"
            data-tracker-id="${trackerEscape(task.id)}"
            aria-label="Marquer ${trackerEscape(task.title)} comme terminé"
            ${isDone ? "checked" : ""}
          >
        </td>
        <td data-label="Domaine">
          <span class="tracker-domain">${trackerEscape(task.domain)}</span>
          <small>${trackerEscape(task.section)}</small>
        </td>
        <td data-label="Élément"><strong>${trackerEscape(task.title)}</strong></td>
        <td data-label="Travail détaillé">${trackerEscape(task.detail)}</td>
        <td data-label="Priorité"><span class="tracker-priority tracker-priority-${trackerPriorityClass(task.priority)}">${trackerEscape(task.priority)}</span></td>
        <td data-label="État"><span class="tracker-state ${isDone ? "is-done" : "is-todo"}">${stateLabel}</span></td>
      </tr>
    `;
  }).join("");

  emptyState.hidden = visibleTasks.length > 0;
  document.getElementById("trackerVisibleCount").textContent = `${visibleTasks.length} tâche${visibleTasks.length > 1 ? "s" : ""} affichée${visibleTasks.length > 1 ? "s" : ""}`;
  trackerRenderProgress();
}

function trackerPopulateDomains() {
  const select = document.getElementById("trackerDomainFilter");
  const domains = [...new Set(trackerTasks.map((task) => task.domain))];

  select.insertAdjacentHTML("beforeend", domains.map((domain) => (
    `<option value="${trackerEscape(domain)}">${trackerEscape(domain)}</option>`
  )).join(""));
}

function trackerSetStatusFilter(value) {
  trackerStatusFilter = value;

  document.querySelectorAll("[data-tracker-status]").forEach((button) => {
    const isActive = button.dataset.trackerStatus === value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  trackerRenderTable();
}

function initTrackerPage() {
  const table = document.getElementById("trackerTableBody");

  if (!table) {
    return;
  }

  trackerPopulateDomains();
  trackerRenderTable();

  table.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-tracker-id]");

    if (!checkbox) {
      return;
    }

    trackerState[checkbox.dataset.trackerId] = checkbox.checked;
    trackerSaveState();
    trackerRenderTable();
  });

  document.getElementById("trackerSearch").addEventListener("input", trackerRenderTable);
  document.getElementById("trackerDomainFilter").addEventListener("change", trackerRenderTable);

  document.querySelectorAll("[data-tracker-status]").forEach((button) => {
    button.addEventListener("click", () => trackerSetStatusFilter(button.dataset.trackerStatus));
  });

  document.getElementById("trackerPrint").addEventListener("click", () => window.print());
  document.getElementById("trackerReset").addEventListener("click", () => {
    const confirmed = window.confirm("Restaurer le diagnostic initial et effacer vos coches personnelles ?");

    if (!confirmed) {
      return;
    }

    trackerState = trackerInitialState();
    trackerSaveState();
    trackerSetStatusFilter("all");
  });
}

document.addEventListener("DOMContentLoaded", initTrackerPage);
