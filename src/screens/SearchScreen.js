import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef(null);

  // recherche avec debounce
  const searchMusic = (text) => {
    setQuery(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (!text) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${text}&entity=song`
        );

        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  // rendu d’un résultat
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Détails", { track: item })}
      style={{
        flexDirection: "row",
        padding: 12,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
      }}
    >
      {/* image */}
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={{
          width: 55,
          height: 55,
          borderRadius: 8,
        }}
      />

      {/* infos */}
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
          {item.trackName}
        </Text>

        <Text style={{ color: "#666" }} numberOfLines={1}>
          {item.artistName}
        </Text>
      </View>

      {/* icône navigation */}
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      
      {/* barre de recherche */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Ionicons name="search" size={18} color="#999" />

        <TextInput
          placeholder="Rechercher une chanson ou un artiste..."
          value={query}
          onChangeText={searchMusic}
          style={{
            flex: 1,
            padding: 10,
          }}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => searchMusic("")}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* loading */}
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center", marginTop: 10, color: "#666" }}>
            Recherche en cours...
          </Text>
        </View>
      )}

      {/* état vide */}
      {!loading && query.length > 0 && results.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          Aucun résultat trouvé
        </Text>
      )}

      {/* suggestion initiale */}
      {!query && (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          Tape un nom d’artiste ou une chanson
        </Text>
      )}

      {/* liste résultats */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId?.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}