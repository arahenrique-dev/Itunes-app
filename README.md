# Application de recherche et gestion de bibliothèque musicale (iTunes)

Application mobile développée avec React Native (Expo) permettant de rechercher des musiques via l’API iTunes, de les sauvegarder localement, de les noter et de les organiser dans une bibliothèque personnelle.

## Fonctionnalités principales

### 1. Recherche de musiques
- Recherche de morceaux via l’API publique iTunes
- Recherche par nom de chanson ou artiste
- Affichage dynamique des résultats en temps réel
- Déclenchement de requêtes avec debounce pour limiter les appels API
- Affichage des résultats sous forme de liste cliquable

### 2. Détails d’un morceau
- Affichage des informations du morceau :
  - titre
  - artiste
  - pochette d’album
- Lecture d’un extrait audio (`previewUrl`)
- Arrêt automatique de la lecture lors du changement d’écran ou de morceau
- Possibilité d’ajouter le morceau à la bibliothèque locale

### 3. Système de notation
- Attribution d’une note de 1 à 5 étoiles
- Modification de la note à tout moment
- Sauvegarde persistante via AsyncStorage
- Tri des morceaux de la bibliothèque selon la note

### 4. Bibliothèque personnelle
- Sauvegarde des morceaux sélectionnés localement
- Affichage de la liste des morceaux enregistrés
- Suppression de morceaux de la bibliothèque
- Tri des morceaux par note (ordre croissant ou décroissant)
- Accès au détail de chaque morceau depuis la bibliothèque

### 5. Lecture audio
- Lecture d’extraits musicaux via `expo-av`
- Un seul audio peut être joué à la fois
- Arrêt automatique lors :
  - du changement d’écran
  - de la navigation vers un autre morceau
- Gestion propre des ressources audio (stop + unload)

## Architecture technique

- React Native (Expo)
- Navigation : React Navigation (Bottom Tabs + Stack Navigation)
- Stockage local : AsyncStorage
- API externe : iTunes Search API
- Lecture audio : expo-av
- Icônes : Ionicons

## Structure du projet

- SearchScreen : recherche de musiques via iTunes API
- LibraryScreen : affichage et gestion des morceaux sauvegardés
- DetailsScreen : affichage détaillé + lecture audio + notation
- Stars component : composant de notation personnalisée
- storage/library.js : gestion du stockage local (CRUD AsyncStorage)
- navigation : gestion des stacks et tabs

## Installation

### 1. Cloner le projet
```bash
git clone <repo-url>
cd itunes-app
```

### 2. Installer les dépendances et Expo CLI
```
npm install
npm install -g expo-cli
```

### 4. Lancer l’application
```
npx expo start
```

## Lancer sur téléphone
- Installer l’application Expo Go sur iOS ou Android
- Scanner le QR code affiché dans le terminal ou dans le navigateur Expo
- L’application se lance automatiquement sur l’appareil

