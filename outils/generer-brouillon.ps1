param(
  [Parameter(Mandatory = $true)]
  [string]$Source,

  [Parameter(Mandatory = $true)]
  [string]$Destination
)

$utf8 = New-Object System.Text.UTF8Encoding($false)

function Get-HtmlExplanation {
  param([string]$Line)

  $text = $Line.Trim()
  if ($text -match '^<!DOCTYPE') { return "Déclare un document HTML5." }
  if ($text -match '^<html') { return "Ouvre le document HTML et indique sa langue." }
  if ($text -eq '</html>') { return "Ferme le document HTML." }
  if ($text -eq '<head>') { return "Ouvre les informations techniques de la page." }
  if ($text -eq '</head>') { return "Ferme les informations techniques de la page." }
  if ($text -match '^<meta charset') { return "Définit l'encodage UTF-8 pour les accents." }
  if ($text -match '^<meta name="viewport"') { return "Adapte la page aux écrans mobiles." }
  if ($text -match '^<meta name="description"') { return "Décrit la page pour les moteurs de recherche." }
  if ($text -match '^<title>') { return "Définit le titre affiché dans l'onglet." }
  if ($text -match '^<link rel="stylesheet"') { return "Charge la feuille de style du site." }
  if ($text -match '^<link rel="icon"') { return "Définit l'icône de l'onglet." }
  if ($text -match '^<link rel="canonical"') { return "Indique l'adresse principale de cette page." }
  if ($text -match '^<script') { return "Charge un fichier JavaScript sans bloquer la page." }
  if ($text -match '^<body') { return "Ouvre le contenu visible de la page." }
  if ($text -eq '</body>') { return "Ferme le contenu visible de la page." }
  if ($text -match '^<nav') { return "Ouvre la navigation principale." }
  if ($text -eq '</nav>') { return "Ferme la navigation principale." }
  if ($text -match '^<main') { return "Ouvre le contenu principal." }
  if ($text -eq '</main>') { return "Ferme le contenu principal." }
  if ($text -match '^<footer') { return "Ouvre le pied de page." }
  if ($text -eq '</footer>') { return "Ferme le pied de page." }
  if ($text -match '^<section') { return "Ouvre une section thématique." }
  if ($text -eq '</section>') { return "Ferme la section." }
  if ($text -match '^<article') { return "Ouvre un contenu autonome." }
  if ($text -eq '</article>') { return "Ferme ce contenu autonome." }
  if ($text -match '^<form') { return "Ouvre un formulaire interactif." }
  if ($text -eq '</form>') { return "Ferme le formulaire." }
  if ($text -match '^<a\b') { return "Crée un lien cliquable." }
  if ($text -eq '</a>') { return "Ferme le lien." }
  if ($text -match '^<button') { return "Crée un bouton d'action." }
  if ($text -eq '</button>') { return "Ferme le bouton." }
  if ($text -match '^<img') { return "Affiche une image avec un texte alternatif." }
  if ($text -match '^<input') { return "Crée un champ de saisie." }
  if ($text -match '^<textarea') { return "Crée une zone de texte multiligne." }
  if ($text -match '^<select') { return "Crée une liste de choix." }
  if ($text -match '^<option') { return "Déclare une option de la liste." }
  if ($text -match '^<label') { return "Associe un libellé à un champ." }
  if ($text -match '^<h1') { return "Affiche le titre principal de la page." }
  if ($text -match '^<h2') { return "Affiche un titre de section." }
  if ($text -match '^<h3') { return "Affiche un sous-titre." }
  if ($text -match '^<p') { return "Ouvre un paragraphe." }
  if ($text -eq '</p>') { return "Ferme le paragraphe." }
  if ($text -match '^<ul') { return "Ouvre une liste non numérotée." }
  if ($text -eq '</ul>') { return "Ferme la liste." }
  if ($text -match '^<li') { return "Ajoute un élément à la liste." }
  if ($text -match '^<div') { return "Ouvre un conteneur de mise en page." }
  if ($text -eq '</div>') { return "Ferme le conteneur." }
  if ($text -match '^<span') { return "Ajoute un petit élément de texte ou d'interface." }
  if ($text -match '^</') { return "Ferme l'élément HTML ouvert précédemment." }
  if ($text -match '^<') { return "Déclare un élément HTML de la page." }
  return "Ajoute le contenu textuel affiché dans cet élément."
}

function Get-CssExplanation {
  param([string]$Line)

  $text = $Line.Trim()
  if ($text -match '^@media\s*\((.+)\)') {
    return "Media query : applique les règles suivantes seulement quand la condition d'écran '$($Matches[1])' est vraie."
  }
  if ($text -match '^@keyframes\s+([\w-]+)') {
    return "Crée l'animation '$($Matches[1])' en décrivant ses différentes étapes."
  }
  if ($text -match '^(from|to|\d+%)\s*\{') {
    return "Ouvre l'étape '$($Matches[1])' de l'animation : from correspond au début, to à la fin et un pourcentage à un moment précis."
  }
  if ($text -eq '}') { return "Ferme le bloc CSS ouvert précédemment." }
  if ($text -match '^--([\w-]+)\s*:\s*(.+);?$') {
    return "Crée la variable CSS --$($Matches[1]) avec la valeur '$($Matches[2].TrimEnd(';'))'. Une variable évite de répéter la même valeur partout."
  }
  if ($text -match '^([\w-]+)\s*:\s*(.*?);?$') {
    $property = $Matches[1]
    $value = $Matches[2].TrimEnd(';')
    if ([string]::IsNullOrWhiteSpace($value)) {
      return "La propriété CSS '$property' commence ici ; sa valeur est détaillée sur les lignes suivantes."
    }
    switch ($property) {
      'display' { return "display choisit la méthode de mise en page. '$value' indique comment les éléments enfants doivent être organisés." }
      'position' { return "position définit la façon de placer l'élément. '$value' détermine s'il suit la page ou s'il est positionné par rapport à un repère." }
      'top' { return "top règle la distance entre l'élément positionné et le bord supérieur : $value." }
      'right' { return "right règle la distance entre l'élément positionné et le bord droit : $value." }
      'bottom' { return "bottom règle la distance entre l'élément positionné et le bord inférieur : $value." }
      'left' { return "left règle la distance entre l'élément positionné et le bord gauche : $value." }
      'width' { return "width définit la largeur de l'élément : $value." }
      'min-width' { return "min-width empêche la largeur de descendre sous $value." }
      'max-width' { return "max-width empêche la largeur de dépasser $value, ce qui améliore le responsive." }
      'height' { return "height définit la hauteur de l'élément : $value." }
      'min-height' { return "min-height garantit une hauteur minimale de $value." }
      'max-height' { return "max-height limite la hauteur à $value." }
      'margin' { return "margin crée un espace à l'extérieur de l'élément : $value." }
      'margin-top' { return "margin-top ajoute un espace extérieur au-dessus : $value." }
      'margin-right' { return "margin-right ajoute un espace extérieur à droite : $value." }
      'margin-bottom' { return "margin-bottom ajoute un espace extérieur en dessous : $value." }
      'margin-left' { return "margin-left ajoute un espace extérieur à gauche : $value." }
      'padding' { return "padding crée un espace à l'intérieur de l'élément, entre son contenu et sa bordure : $value." }
      'padding-top' { return "padding-top ajoute un espace intérieur en haut : $value." }
      'padding-right' { return "padding-right ajoute un espace intérieur à droite : $value." }
      'padding-bottom' { return "padding-bottom ajoute un espace intérieur en bas : $value." }
      'padding-left' { return "padding-left ajoute un espace intérieur à gauche : $value." }
      'gap' { return "gap crée un espacement de $value entre les éléments d'une grille ou d'un conteneur flex." }
      'color' { return "color définit la couleur du texte : $value." }
      'background' { return "background définit le fond de l'élément : couleur, image ou combinaison indiquée par '$value'." }
      'background-color' { return "background-color définit uniquement la couleur de fond : $value." }
      'border' { return "border dessine la bordure avec son épaisseur, son style et sa couleur : $value." }
      'border-radius' { return "border-radius arrondit les angles de l'élément avec un rayon de $value." }
      'box-shadow' { return "box-shadow ajoute une ombre autour de l'élément. La valeur '$value' règle le décalage, le flou et la couleur." }
      'font-family' { return "font-family choisit la police utilisée pour le texte : $value." }
      'font-size' { return "font-size règle la taille du texte : $value." }
      'font-weight' { return "font-weight règle l'épaisseur des lettres : $value." }
      'line-height' { return "line-height règle l'espace vertical entre les lignes de texte : $value." }
      'text-align' { return "text-align aligne le texte dans son conteneur : $value." }
      'text-decoration' { return "text-decoration ajoute ou retire une décoration du texte, comme le soulignement : $value." }
      'align-items' { return "align-items aligne les éléments sur l'axe secondaire du conteneur flex ou grid : $value." }
      'justify-content' { return "justify-content répartit les éléments sur l'axe principal du conteneur : $value." }
      'flex-direction' { return "flex-direction choisit le sens d'organisation des éléments flex : $value." }
      'flex-wrap' { return "flex-wrap indique si les éléments flex peuvent passer à la ligne : $value." }
      'flex' { return "flex règle la capacité de l'élément à grandir, rétrécir et occuper l'espace disponible : $value." }
      'grid-template-columns' { return "grid-template-columns définit le nombre et la largeur des colonnes de la grille : $value." }
      'grid-template-areas' { return "grid-template-areas nomme les zones de la grille pour faciliter le placement : $value." }
      'object-fit' { return "object-fit indique comment une image remplit son cadre. '$value' contrôle si elle est recadrée ou entièrement visible." }
      'overflow' { return "overflow décide quoi faire du contenu qui dépasse du cadre : $value." }
      'opacity' { return "opacity règle la transparence : 0 est invisible, 1 est totalement visible. Valeur utilisée : $value." }
      'z-index' { return "z-index règle l'ordre de superposition. Une valeur plus grande place généralement l'élément au-dessus : $value." }
      'cursor' { return "cursor choisit la forme du pointeur de souris au survol : $value." }
      'transition' { return "transition rend un changement de style progressif. '$value' précise les propriétés, la durée et le rythme." }
      'transform' { return "transform déplace, agrandit, réduit ou fait pivoter l'élément sans modifier la place réservée autour : $value." }
      'animation' { return "animation lance une animation définie avec @keyframes. '$value' précise son nom, sa durée et son comportement." }
      'content' { return "content insère un contenu généré dans ::before ou ::after : $value." }
      'box-sizing' { return "box-sizing indique si le padding et la bordure sont inclus dans la largeur calculée : $value." }
      default { return "La propriété CSS '$property' reçoit la valeur '$value' pour modifier l'apparence ou la mise en page." }
    }
  }
  if ($text -match '\{$') {
    $selector = $text.TrimEnd('{').Trim()
    if ($selector -match ':hover') { return "Le sélecteur '$selector' cible un élément pendant le survol de la souris et ouvre ses règles." }
    if ($selector -match ':focus') { return "Le sélecteur '$selector' cible un champ ou bouton qui reçoit le focus clavier et ouvre ses règles." }
    if ($selector -match '::(before|after)') { return "Le sélecteur '$selector' crée un pseudo-élément décoratif avant ou après le contenu réel." }
    if ($selector -match '^\.') { return "Le sélecteur de classe '$selector' cible tous les éléments HTML possédant cette classe." }
    if ($selector -match '^#') { return "Le sélecteur d'identifiant '$selector' cible l'élément HTML portant cet id unique." }
    return "Le sélecteur '$selector' indique quels éléments HTML recevront les règles qui suivent."
  }
  if ($text -match '^var\(') { return "var(...) lit la valeur d'une variable CSS déclarée dans :root." }
  return "Cette ligne continue une valeur CSS écrite sur plusieurs lignes."
}

function Get-JsExplanation {
  param([string]$Line)

  $text = $Line.Trim()
  if ($text -match '^const\s+([\w$]+)\s*=\s*(.+)') {
    $name = $Matches[1]
    $expression = $Matches[2]
    if ($expression -match 'document\.getElementById') { return "Crée la constante '$name' qui mémorise l'élément HTML trouvé grâce à son attribut id." }
    if ($expression -match 'document\.querySelectorAll') { return "Crée la constante '$name' contenant tous les éléments HTML qui correspondent au sélecteur CSS demandé." }
    if ($expression -match 'document\.querySelector') { return "Crée la constante '$name' contenant le premier élément HTML qui correspond au sélecteur CSS demandé." }
    if ($expression -match 'localStorage\.getItem') { return "Crée la constante '$name' avec une donnée relue dans localStorage, la mémoire durable du navigateur." }
    if ($expression -match 'JSON\.parse') { return "Crée la constante '$name' avec le résultat de JSON.parse, qui transforme un texte JSON en données JavaScript utilisables." }
    if ($expression -match '\bawait\s+fetch') { return "Crée la constante '$name' avec la réponse reçue du back-end ; await attend la fin de la requête fetch." }
    if ($expression -match 'URLSearchParams') { return "Crée la constante '$name' pour lire les paramètres présents dans l'adresse de la page." }
    if ($expression -match 'new\s+Date') { return "Crée la constante '$name' contenant la date et l'heure actuelles ou celles fournies." }
    if ($expression -match '\.filter\s*\(') { return "Crée la constante '$name' avec un nouveau tableau filtré selon une condition." }
    if ($expression -match '\.map\s*\(') { return "Crée la constante '$name' avec un nouveau tableau produit en transformant chaque élément avec map." }
    if ($expression -match '\.find\s*\(') { return "Crée la constante '$name' avec le premier élément trouvé par la méthode find." }
    if ($expression -match '\.reduce\s*\(') { return "Crée la constante '$name' avec la valeur unique calculée par reduce, souvent un total." }
    if ($expression -match '\[\]') { return "Crée la constante '$name' contenant un tableau, c'est-à-dire une liste ordonnée de valeurs." }
    if ($expression -match '^\{') { return "Crée la constante '$name' contenant un objet, c'est-à-dire un groupe de propriétés nommées." }
    return "Crée la constante '$name'. const signifie que cette référence ne pourra pas être remplacée plus tard."
  }
  if ($text -match '^let\s+([\w$]+)') { return "Crée la variable '$($Matches[1])'. let est utilisé car sa valeur pourra être remplacée plus tard." }
  if ($text -match '^(async\s+)?function\s+([\w$]+)\s*\((.*?)\)') {
    $asyncText = if ($Matches[1]) { ' asynchrone, donc capable d''attendre une opération longue avec await,' } else { '' }
    return "Déclare la fonction '$($Matches[2])'$asyncText avec les paramètres '$($Matches[3])'. Une fonction regroupe des instructions réutilisables."
  }
  if ($text -match '^if\s*\((.+)\)') { return "if vérifie la condition '$($Matches[1])'. Le bloc s'exécute uniquement si elle est vraie." }
  if ($text -match '^else\s+if\s*\((.+)\)') { return "else if teste une nouvelle condition, '$($Matches[1])', lorsque les tests précédents sont faux." }
  if ($text -match '^else\b') { return "else exécute ce bloc lorsque la condition if précédente est fausse." }
  if ($text -match '^switch\s*\((.+)\)') { return "switch compare la valeur '$($Matches[1])' à plusieurs cas possibles." }
  if ($text -match '^case\s+(.+):') { return "case exécute ce bloc lorsque la valeur comparée correspond à $($Matches[1])." }
  if ($text -match '^for\b') { return "for crée une boucle : les instructions sont répétées jusqu'à ce que sa condition devienne fausse." }
  if ($text -match '^while\b') { return "while répète le bloc tant que la condition indiquée reste vraie." }
  if ($text -match '\.forEach\s*\(') { return "forEach parcourt chaque élément d'un tableau pour exécuter une action, sans créer un nouveau tableau." }
  if ($text -match '\.map\s*\(') { return "map parcourt un tableau et crée un nouveau tableau avec le résultat produit pour chaque élément." }
  if ($text -match '\.filter\s*\(') { return "filter crée un nouveau tableau contenant uniquement les éléments qui respectent la condition." }
  if ($text -match '\.find\s*\(') { return "find recherche et renvoie le premier élément du tableau qui respecte la condition." }
  if ($text -match '\.some\s*\(') { return "some renvoie true si au moins un élément du tableau respecte la condition." }
  if ($text -match '\.reduce\s*\(') { return "reduce combine tous les éléments d'un tableau pour produire une seule valeur, souvent un total." }
  if ($text -match '\.sort\s*\(') { return "sort classe les éléments du tableau selon la règle fournie." }
  if ($text -match '\.includes\s*\(') { return "includes vérifie si une chaîne ou un tableau contient la valeur recherchée." }
  if ($text -match 'addEventListener\s*\(\s*["'']([^"'']+)') { return "addEventListener écoute l'événement '$($Matches[1])' puis lance une fonction quand cet événement se produit." }
  if ($text -match 'localStorage\.getItem') { return "localStorage.getItem lit une information enregistrée durablement dans le navigateur." }
  if ($text -match 'localStorage\.setItem') { return "localStorage.setItem enregistre une information dans le navigateur pour la retrouver après un rechargement." }
  if ($text -match 'JSON\.parse') { return "JSON.parse transforme un texte JSON enregistré en véritable objet ou tableau JavaScript." }
  if ($text -match 'JSON\.stringify') { return "JSON.stringify transforme un objet ou tableau JavaScript en texte JSON enregistrable." }
  if ($text -match '\bfetch\s*\(') { return "fetch envoie une requête HTTP vers une adresse, généralement pour communiquer avec le back-end." }
  if ($text -match '\bawait\b') { return "await met cette fonction asynchrone en pause jusqu'à la fin de l'opération demandée." }
  if ($text -match '\.innerHTML\s*=') { return "innerHTML remplace le contenu HTML situé à l'intérieur de l'élément." }
  if ($text -match '\.textContent\s*=') { return "textContent remplace uniquement le texte de l'élément, sans interpréter de balises HTML." }
  if ($text -match '\.classList\.') { return "classList ajoute, retire ou bascule une classe CSS afin de changer l'apparence ou l'état de l'élément." }
  if ($text -match '\.dataset\.') { return "dataset lit ou modifie une valeur data-* stockée directement dans la balise HTML." }
  if ($text -match '\.setAttribute\s*\(') { return "setAttribute ajoute ou modifie un attribut dans une balise HTML." }
  if ($text -match 'URLSearchParams') { return "URLSearchParams permet de lire les paramètres placés après le point d'interrogation dans l'adresse de la page." }
  if ($text -match 'new\s+Date\s*\(') { return "new Date crée une valeur représentant une date et une heure." }
  if ($text -match '=>') { return "La flèche => déclare une fonction courte, souvent utilisée comme fonction de rappel appelée plus tard." }
  if ($text -match '\?\.') { return "L'opérateur ?. accède à une propriété seulement si la valeur située avant existe, ce qui évite une erreur." }
  if ($text -match '\?\?') { return "L'opérateur ?? utilise la valeur située à droite uniquement si celle de gauche vaut null ou undefined." }
  if ($text -match '^return\b') { return "return arrête la fonction et renvoie la valeur indiquée au code qui l'a appelée." }
  if ($text -match '^throw\b') { return "throw interrompt le traitement et crée une erreur avec le message indiqué." }
  if ($text -match '^try\s*\{') { return "try tente d'exécuter une opération susceptible de produire une erreur." }
  if ($text -match '^catch\b') { return "catch récupère l'erreur produite dans try afin de la traiter proprement." }
  if ($text -match '^\}') { return "Cette accolade ferme le bloc de fonction, de condition, de boucle ou d'objet ouvert précédemment." }
  if ($text -match '^\{') { return "Cette accolade ouvre un bloc d'instructions ou un objet JavaScript." }
  if ($text -match '^([\w$]+)\s*:') {
    $propertyName = $Matches[1]
    switch ($propertyName) {
      'id' { return "La propriété id contient l'identifiant unique utilisé pour retrouver cet élément." }
      'name' { return "La propriété name contient le nom affiché à l'utilisateur." }
      'priceValue' { return "La propriété priceValue contient le prix sous forme de nombre pour permettre les calculs." }
      'unitMode' { return "La propriété unitMode indique si le produit est vendu au poids ou à la pièce." }
      'unitLabel' { return "La propriété unitLabel contient le nom de l'unité affichée, par exemple kg, pièce ou sachet." }
      'image' { return "La propriété image contient le chemin du fichier image à afficher." }
      'description' { return "La propriété description contient le texte de présentation du produit." }
      'origin' { return "La propriété origin indique le pays ou la région de provenance du produit." }
      'category' { return "La propriété category sert à regrouper et filtrer les produits du même type." }
      'stockStatus' { return "La propriété stockStatus décrit l'état du stock, par exemple disponible, limité ou sur commande." }
      'available' { return "La propriété available indique avec true ou false si le produit peut actuellement être commandé." }
      default { return "La propriété '$propertyName' associe un nom à une valeur dans cet objet JavaScript." }
    }
  }
  if ($text -match '^document\.') { return "document représente la page HTML ; cette instruction recherche ou modifie un de ses éléments." }
  if ($text -match '^window\.') { return "window représente la fenêtre du navigateur et donne accès aux fonctions générales de la page." }
  if ($text -match '[^=!<>]=[^=>]') { return "Le signe = affecte la valeur située à droite à la variable ou propriété située à gauche." }
  return "Cette instruction poursuit le traitement JavaScript commencé dans ce bloc."
}

function Add-HtmlComments {
  param([string]$Path)

  $lines = [System.IO.File]::ReadAllLines($Path, [System.Text.Encoding]::UTF8)
  $result = New-Object System.Collections.Generic.List[string]
  $insideTag = $false
  $insideComment = $false

  foreach ($line in $lines) {
    $trimmed = $line.Trim()
    if ($trimmed.Length -eq 0) {
      $result.Add($line)
      continue
    }

    if ($insideComment) {
      $result.Add($line)
      if ($trimmed -match '-->') { $insideComment = $false }
      continue
    }

    if ($trimmed -match '^<!--') {
      $result.Add($line)
      if ($trimmed -notmatch '-->') { $insideComment = $true }
      continue
    }

    if (-not $insideTag) {
      $indent = $line.Substring(0, $line.Length - $line.TrimStart().Length)
      if ($trimmed -match '^<!DOCTYPE') {
        $result.Add($line)
        $result.Add("$indent<!-- La ligne précédente déclare un document HTML5. -->")
      } else {
        $result.Add("$indent<!-- $(Get-HtmlExplanation $line) -->")
        $result.Add($line)
      }
    } else {
      $result.Add($line)
    }

    if (-not $insideTag -and $trimmed -match '^<' -and $trimmed -notmatch '>') {
      $insideTag = $true
    }
    if ($insideTag -and $trimmed -match '>') {
      $insideTag = $false
    }
  }

  [System.IO.File]::WriteAllLines($Path, $result, $utf8)
}

function Add-CssComments {
  param([string]$Path)

  $lines = [System.IO.File]::ReadAllLines($Path, [System.Text.Encoding]::UTF8)
  $result = New-Object System.Collections.Generic.List[string]
  $insideComment = $false

  foreach ($line in $lines) {
    $trimmed = $line.Trim()
    if ($trimmed.Length -eq 0) {
      $result.Add($line)
      continue
    }

    if ($insideComment) {
      $result.Add($line)
      if ($trimmed -match '\*/') { $insideComment = $false }
      continue
    }

    if ($trimmed -match '^/\*') {
      $result.Add($line)
      if ($trimmed -notmatch '\*/') { $insideComment = $true }
      continue
    }

    $indent = $line.Substring(0, $line.Length - $line.TrimStart().Length)
    $result.Add("$indent/* $(Get-CssExplanation $line) */")
    $result.Add($line)
  }

  [System.IO.File]::WriteAllLines($Path, $result, $utf8)
}

function Get-UnescapedBacktickCount {
  param([string]$Line)

  $count = 0
  for ($index = 0; $index -lt $Line.Length; $index++) {
    if ($Line[$index] -ne [char]96) { continue }
    $slashes = 0
    for ($cursor = $index - 1; $cursor -ge 0 -and $Line[$cursor] -eq '\'; $cursor--) {
      $slashes++
    }
    if (($slashes % 2) -eq 0) { $count++ }
  }
  return $count
}

function Add-JsComments {
  param([string]$Path)

  $lines = [System.IO.File]::ReadAllLines($Path, [System.Text.Encoding]::UTF8)
  $result = New-Object System.Collections.Generic.List[string]
  $insideBlockComment = $false
  $insideTemplate = $false

  foreach ($line in $lines) {
    $trimmed = $line.Trim()
    if ($trimmed.Length -eq 0) {
      $result.Add($line)
      continue
    }

    if ($insideBlockComment) {
      $result.Add($line)
      if ($trimmed -match '\*/') { $insideBlockComment = $false }
      continue
    }

    if (-not $insideTemplate -and $trimmed -match '^/\*') {
      $result.Add($line)
      if ($trimmed -notmatch '\*/') { $insideBlockComment = $true }
      continue
    }

    if (-not $insideTemplate -and $trimmed -match '^//') {
      $result.Add($line)
    } elseif (-not $insideTemplate) {
      $indent = $line.Substring(0, $line.Length - $line.TrimStart().Length)
      $result.Add("$indent// $(Get-JsExplanation $line)")
      $result.Add($line)
    } else {
      $result.Add($line)
    }

    $backticks = Get-UnescapedBacktickCount $line
    if (($backticks % 2) -eq 1) {
      $insideTemplate = -not $insideTemplate
    }
  }

  [System.IO.File]::WriteAllLines($Path, $result, $utf8)
}

if (-not (Test-Path -LiteralPath $Destination)) {
  New-Item -ItemType Directory -Path $Destination | Out-Null
}

# Copie uniquement les fichiers qui composent le site public.
$sourceHtmlFiles = Get-ChildItem -LiteralPath $Source -Filter '*.html' -File
$sourceHtmlNames = @($sourceHtmlFiles | ForEach-Object { $_.Name })

Get-ChildItem -LiteralPath $Destination -Filter '*.html' -File | Where-Object {
  $_.Name -notin $sourceHtmlNames
} | Remove-Item -Force

$sourceHtmlFiles | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $Destination -Force
}

@('style.css', 'README.md', '.gitignore') | ForEach-Object {
  $sourceFile = Join-Path $Source $_
  $destinationFile = Join-Path $Destination $_
  if (Test-Path -LiteralPath $sourceFile) {
    Copy-Item -LiteralPath $sourceFile -Destination $Destination -Force
  } elseif (Test-Path -LiteralPath $destinationFile) {
    Remove-Item -LiteralPath $destinationFile -Force
  }
}

@('images', 'js') | ForEach-Object {
  $sourceFolder = Join-Path $Source $_
  $destinationFolder = Join-Path $Destination $_
  if (Test-Path -LiteralPath $sourceFolder) {
    if (-not (Test-Path -LiteralPath $destinationFolder)) {
      New-Item -ItemType Directory -Path $destinationFolder | Out-Null
    }

    $sourceFiles = Get-ChildItem -LiteralPath $sourceFolder -File
    $sourceNames = @($sourceFiles | ForEach-Object { $_.Name })

    Get-ChildItem -LiteralPath $destinationFolder -File | Where-Object {
      $_.Name -notin $sourceNames
    } | Remove-Item -Force

    $sourceFiles | ForEach-Object {
      Copy-Item -LiteralPath $_.FullName -Destination $destinationFolder -Force
    }
  }
}

Get-ChildItem -LiteralPath $Destination -Filter '*.html' -File | ForEach-Object {
  Add-HtmlComments $_.FullName
}

Add-CssComments (Join-Path $Destination 'style.css')

Get-ChildItem -LiteralPath (Join-Path $Destination 'js') -Filter '*.js' -File | ForEach-Object {
  Add-JsComments $_.FullName
}

$guide = @'
# Guide de la version brouillon

Cette copie est volontairement beaucoup plus commentée que le site final. Les commentaires placés avant les lignes expliquent leur rôle sans modifier le résultat visible.

Certaines balises HTML sont écrites sur plusieurs lignes : un seul commentaire explique alors la balise complète afin de ne pas placer un commentaire au milieu de ses attributs. De la même façon, les lignes situées à l'intérieur d'une chaîne JavaScript multiligne sont expliquées par le commentaire qui précède la création de cette chaîne, car insérer du JavaScript au milieu changerait son contenu.

Pour modifier les produits, commencez par `js/data.js`. Pour comprendre l'affichage, consultez ensuite `js/products.js`, `js/search.js` et `js/cart.js`.
'@

[System.IO.File]::WriteAllText((Join-Path $Destination 'GUIDE_BROUILLON.md'), $guide.Trim() + "`r`n", $utf8)

$lexicon = @'
# Lexique CSS et JavaScript

Ce document complète les commentaires présents dans le code du brouillon.

## CSS

- **Sélecteur** : partie placée avant `{`. Il indique quels éléments HTML seront stylisés.
- **Classe (`.nom`)** : nom réutilisable sur plusieurs éléments HTML avec l'attribut `class`.
- **Identifiant (`#nom`)** : nom normalement unique relié à l'attribut HTML `id`.
- **Propriété** : réglage CSS, par exemple `color`, `width` ou `padding`.
- **Valeur** : choix donné à une propriété, par exemple `color: black` où `black` est la valeur.
- **Cascade** : règle qui décide quel style gagne lorsque plusieurs règles ciblent le même élément.
- **Héritage** : certaines propriétés, notamment la couleur et la police, sont transmises aux éléments enfants.
- **Box model** : chaque élément est une boîte composée du contenu, du `padding`, de la bordure et de la `margin`.
- **Padding** : espace intérieur entre le contenu et la bordure.
- **Margin** : espace extérieur séparant l'élément de ses voisins.
- **Flexbox** : système de mise en page en ligne ou en colonne activé avec `display: flex`.
- **Grid** : système de mise en page en lignes et colonnes activé avec `display: grid`.
- **Responsive** : adaptation du site aux téléphones, tablettes et ordinateurs.
- **Media query (`@media`)** : règles CSS activées seulement pour certaines tailles d'écran.
- **Pseudo-classe (`:hover`, `:focus`)** : état particulier d'un élément, comme le survol ou le focus clavier.
- **Pseudo-élément (`::before`, `::after`)** : élément décoratif généré par le CSS sans ajouter de balise HTML.
- **Variable CSS (`--nom`)** : valeur enregistrée une fois puis réutilisée avec `var(--nom)`.
- **Transition** : passage progressif entre deux états visuels.
- **Transform** : déplacement, rotation ou changement d'échelle sans déplacer les éléments voisins.
- **z-index** : ordre de superposition des éléments positionnés.
- **object-fit** : façon dont une image remplit son cadre.
- **overflow** : traitement du contenu qui dépasse de son cadre.
- **clamp()** : choisit une valeur adaptable comprise entre un minimum et un maximum.

## JavaScript

- **Variable** : emplacement nommé qui conserve une valeur.
- **const** : variable dont la référence ne sera pas remplacée.
- **let** : variable dont la valeur pourra être remplacée.
- **Fonction** : groupe d'instructions réutilisable.
- **Paramètre** : nom placé dans la déclaration d'une fonction pour recevoir une valeur.
- **Argument** : valeur réellement envoyée lorsqu'une fonction est appelée.
- **return** : termine une fonction et renvoie son résultat.
- **Condition (`if`)** : exécute du code seulement lorsqu'un test est vrai.
- **Boucle** : répète plusieurs fois un groupe d'instructions.
- **Tableau (`Array`)** : liste ordonnée de valeurs.
- **Objet** : groupe de propriétés écrites sous la forme `nom: valeur`.
- **Propriété** : information stockée dans un objet.
- **Méthode** : fonction attachée à un objet, par exemple `array.filter()`.
- **DOM** : représentation JavaScript de la page HTML permettant de lire et modifier ses éléments.
- **Événement** : action détectée par la page, comme un clic, une saisie ou l'envoi d'un formulaire.
- **Callback** : fonction transmise à une autre fonction pour être exécutée plus tard.
- **Fonction fléchée (`=>`)** : écriture courte d'une fonction, très utilisée dans les callbacks.
- **Template literal (accent grave)** : chaîne de texte entre accents graves permettant d'insérer `${uneValeur}`.
- **localStorage** : petite zone du navigateur qui conserve des données après le rechargement de la page.
- **JSON** : format texte utilisé pour enregistrer ou échanger des objets et des tableaux.
- **fetch** : fonction qui communique avec une adresse HTTP, souvent une API du back-end.
- **async / await** : mots permettant d'attendre proprement une opération asynchrone comme une requête réseau.
- **forEach** : exécute une action pour chaque élément d'un tableau.
- **map** : crée un nouveau tableau en transformant chaque élément.
- **filter** : crée un nouveau tableau avec les éléments qui respectent une condition.
- **find** : récupère le premier élément qui respecte une condition.
- **Opérateur ternaire** : condition courte écrite `condition ? valeurSiVrai : valeurSiFaux`.
- **Chaînage optionnel (`?.`)** : évite une erreur lorsqu'une valeur peut être absente.
- **Coalescence nulle (`??`)** : fournit une valeur de remplacement uniquement pour `null` ou `undefined`.
'@

[System.IO.File]::WriteAllText((Join-Path $Destination 'LEXIQUE_CSS_JAVASCRIPT.md'), $lexicon.Trim() + "`r`n", $utf8)


