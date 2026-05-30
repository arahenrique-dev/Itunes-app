import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@itunes_library";

// récupère la bibliothèque complète
export const getLibrary = async () => {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.log("Erreur lecture bibliothèque", e);
    return [];
  }
};

// normalise un track pour éviter les bugs de champs différents
const normalizeTrack = (track) => ({
  trackId: track.trackId,
  artistName: track.artistName,
  trackName: track.trackName,
  artworkUrl: track.artworkUrl100 || track.artworkUrl,
  previewUrl: track.previewUrl,
  rating: track.rating ?? 0,
});

// sauvegarde un morceau
export const saveTrack = async (track) => {
  try {
    const current = await getLibrary();

    const normalized = normalizeTrack(track);

    const exists = current.find(
      (item) => item.trackId === normalized.trackId
    );

    if (exists) return current;

    const updated = [...current, normalized];

    await AsyncStorage.setItem(KEY, JSON.stringify(updated));

    return updated;
  } catch (e) {
    console.log("Erreur sauvegarde track", e);
  }
};

// suppression d’un morceau
export const removeTrack = async (trackId) => {
  try {
    const current = await getLibrary();

    const updated = current.filter(
      (item) => item.trackId !== trackId
    );

    await AsyncStorage.setItem(KEY, JSON.stringify(updated));

    return updated;
  } catch (e) {
    console.log("Erreur suppression track", e);
  }
};

// mise à jour de la note
export const updateRating = async (trackId, rating) => {
  try {
    const current = await getLibrary();

    const updated = current.map((item) =>
      item.trackId === trackId
        ? { ...item, rating }
        : item
    );

    await AsyncStorage.setItem(KEY, JSON.stringify(updated));

    return updated;
  } catch (e) {
    console.log("Erreur mise à jour rating", e);
  }
};