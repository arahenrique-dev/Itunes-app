import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailsScreen from "../screens/DetailsScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// STACK RECHERCHE
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recherche"
        component={SearchScreen}
        options={{ title: "Recherche" }} // titre affiché en haut
      />
      <Stack.Screen
        name="Détails"
        component={DetailsScreen}
        options={{ title: "Détails" }}
      />
    </Stack.Navigator>
  );
}

// STACK BIBLIOTHÈQUE
function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bibliothèque"
        component={LibraryScreen}
        options={{ title: "Bibliothèque" }}
      />
      <Stack.Screen
        name="Détails"
        component={DetailsScreen}
        options={{ title: "Détails" }}
      />
    </Stack.Navigator>
  );
}

// NAVIGATION PRINCIPALE (TAB BAR)
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // on utilise les headers des stacks

          // icônes du bas
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Recherche") {
              iconName = "search";
            } else if (route.name === "Bibliothèque") {
              iconName = "library";
            }

            return (
              <Ionicons name={iconName} size={size} color={color} />
            );
          },

          tabBarActiveTintColor: "#000", // couleur active
          tabBarInactiveTintColor: "#999",
        })}
      >
        {/* Onglet recherche */}
        <Tab.Screen
          name="Recherche"
          component={SearchStack}
        />

        {/* Onglet bibliothèque */}
        <Tab.Screen
          name="Bibliothèque"
          component={LibraryStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}