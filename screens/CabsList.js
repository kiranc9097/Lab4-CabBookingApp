import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

const CabsList = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCabs = async () => {
      const cabsCollection = await db.collection("cabs").get();
      const cabsList = cabsCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCabs(cabsList);
      setLoading(false);
    };

    fetchCabs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (cabs.length === 0) {
    return (
      <View style={styles.noCabText}>
        <Text>No cabs available for now</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.company}</Text>
            <Text style={styles.subtitle}>{item.model}</Text>
            <View style={styles.iconContainer}>
              <Ionicons name="car-sport" size={24} color="#007bff" />
              <Text style={styles.cost}>${item.cost}/hour</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Cab Detail", { cab: item })}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCabText: {
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  cost: {
    fontSize: 16,
    color: "#007bff",
    marginLeft: 10,
  },
});

export default CabsList;
