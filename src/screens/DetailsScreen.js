import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useCallback, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Stars from "../components/Stars";
import { saveTrack, updateRating } from "../storage/library";

export default function DetailsScreen({ route }) {
  const { track } = route.params;

  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(track.rating || 0);

  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sauvegarde du morceau 
  const handleSave = async () => {
    const formatted = {
      trackId: track.trackId,
      artistName: track.artistName,
      trackName: track.trackName,
      artworkUrl: track.artworkUrl100,
      previewUrl: track.previewUrl,
      rating,
    };

    await saveTrack(formatted);
    setSaved(true);
  };

  // Mise à jour de la note
  const handleRatingChange = async (value) => {
    setRating(value);
    await updateRating(track.trackId, value);
  };

  //Lecture audio
  const playSound = async () => {
    try {
      if (!track.previewUrl) return;

      await stopCurrentSound();

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.previewUrl },
        { shouldPlay: true }
      );

      soundRef.current = newSound;
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          stopCurrentSound();
        }
      });
    } catch (e) {
      console.log("audio error", e);
    }
  };

  // Stop audio
  const stopCurrentSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
    } catch (e) {
      console.log("stop error", e);
    }
  };

  const stopSound = async () => {
    await stopCurrentSound();
  };

  // Stop automatique quand on quitte l'écran
  useFocusEffect(
    useCallback(() => {
      return () => {
        stopCurrentSound();
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      
      {/* Image + infos principales */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{ uri: track.artworkUrl100 }}
          style={{
            width: 180,
            height: 180,
            borderRadius: 16,
            marginBottom: 15,
          }}
        />

        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
          {track.trackName}
        </Text>

        <Text style={{ color: "#666", marginTop: 4 }}>
          {track.artistName}
        </Text>
      </View>

      {/* Rating */}
      <Stars rating={rating} onChange={handleRatingChange} />

      {/* Bouton sauvegarde */}
      <TouchableOpacity
        onPress={handleSave}
        style={{
          marginTop: 20,
          padding: 14,
          backgroundColor: saved ? "#444" : "#000",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="bookmark" size={18} color="white" style={{ marginRight: 8 }} />
        <Text style={{ color: "white", fontWeight: "600" }}>
          {saved ? "Sauvegardé" : "Ajouter à la bibliothèque"}
        </Text>
      </TouchableOpacity>

      {/* Lecture audio */}
      <TouchableOpacity
        onPress={isPlaying ? stopSound : playSound}
        style={{
          marginTop: 12,
          padding: 14,
          backgroundColor: isPlaying ? "#e63946" : "#2a9d8f",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={isPlaying ? "stop-circle" : "play-circle"}
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />

        <Text style={{ color: "white", fontWeight: "600" }}>
          {isPlaying ? "Arrêter l'extrait" : "Écouter l'extrait"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}