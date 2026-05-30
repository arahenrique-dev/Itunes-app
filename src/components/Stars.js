import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

export default function Stars({ rating, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    // Conteneur des étoiles
    <View style={{ flexDirection: "row", marginTop: 12 }}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange(star)}
          style={{ marginRight: 6 }} // espace entre les étoiles
        >
          {/* Icône remplie ou vide selon la note */}
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={28}
            color={star <= rating ? "#f5a623" : "#999"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}