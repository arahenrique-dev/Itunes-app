import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { getLibrary, removeTrack } from "../storage/library";

export default function LibraryScreen({ navigation }) {
  const [library, setLibrary] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  // charge la bibliothèque depuis AsyncStorage
  const loadLibrary = async () => {
    const data = await getLibrary();
    setLibrary(data);
  };

  // tri par note
  const sortedLibrary = [...library].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;

    return sortOrder === "desc"
      ? ratingB - ratingA
      : ratingA - ratingB;
  });

  // recharge à chaque retour sur l'écran
  useFocusEffect(
    useCallback(() => {
      loadLibrary();
    }, [])
  );

  // suppression d'un morceau
  const handleDelete = async (trackId) => {
    const updated = await removeTrack(trackId);
    setLibrary(updated);
  };

  // rendu d'un item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Détails", { track: item })
      }
      style={{
        flexDirection: "row",
        padding: 12,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
      }}
    >
      {/* image + infos */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          source={{ uri: item.artworkUrl }}
          style={{ width: 55, height: 55, borderRadius: 8 }}
        />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
            {item.trackName}
          </Text>

          <Text style={{ color: "#666" }} numberOfLines={1}>
            {item.artistName}
          </Text>

          <Text style={{ marginTop: 2, color: "#444" }}>
            {item.rating
              ? "⭐".repeat(item.rating)
              : "Aucune note"}
          </Text>
        </View>
      </View>

      {/* bouton supprimer */}
      <TouchableOpacity onPress={() => handleDelete(item.trackId)}>
        <Ionicons name="trash-outline" size={22} color="#e63946" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      
      {/* bouton de tri */}
      <TouchableOpacity
        onPress={() =>
          setSortOrder(sortOrder === "desc" ? "asc" : "desc")
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          backgroundColor: "#000",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Ionicons
          name="swap-vertical"
          size={18}
          color="white"
          style={{ marginRight: 8 }}
        />

        <Text style={{ color: "white", fontWeight: "600" }}>
          Tri par note : {sortOrder === "desc" ? "haut → bas" : "bas → haut"}
        </Text>
      </TouchableOpacity>

      {/* état vide */}
      {library.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          Aucun morceau sauvegardé
        </Text>
      ) : (
        <FlatList
          data={sortedLibrary}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}