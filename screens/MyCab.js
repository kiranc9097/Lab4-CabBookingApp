import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { db } from "../firebaseConfig";

const MyCab = () => {
  const [bookedCabs, setBookedCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = "currentUserId";

  const fetchBookedCabs = useCallback(async () => {
    try {
      console.log("Fetching bookings for user:", userId);
      const userBookings = await db
        .collection("bookings")
        .where("userId", "==", userId)
        .get();

      console.log("Bookings fetched:", userBookings.docs.length);

      const cabsList = [];
      for (const doc of userBookings.docs) {
        const cabDoc = await db
          .collection("cabs")
          .where("id", "==", doc.data().cabId)
          .get();

        if (cabDoc.docs.length != 0) {
          cabsList.push({
            id: cabDoc.id,
            ...cabDoc.docs[0].data(),
            bookingId: doc.id,
          });
        } else {
          console.log("Cab document does not exist for ID:", doc.data().cabId);
        }
      }

      setBookedCabs(cabsList);
    } catch (error) {
      console.log("Error fetching booked cabs:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBookedCabs();
    }, [fetchBookedCabs])
  );

  const cancelBooking = async (bookingId) => {
    try {
      await db.collection("bookings").doc(bookingId).delete();
      setBookedCabs((prev) =>
        prev.filter((cab) => cab.bookingId !== bookingId)
      );
      Alert.alert("Success", "Booking cancelled successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to cancel the booking. Please try again.");
      console.log("Error canceling booking:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (bookedCabs.length === 0) {
    return (
      <View style={styles.noCabText}>
        <Text>No booked cabs for now</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookedCabs}
        keyExtractor={(item) => item.bookingId}
        renderItem={({ item }) => (
          <View style={styles.tile}>
            <View style={styles.detailRow}>
              <MaterialIcons name="local-taxi" size={24} color="#007bff" />
              <Text style={styles.cabText}>{item.company}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="directions-car" size={24} color="#007bff" />
              <Text style={styles.subtitle}>{item.model}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => cancelBooking(item.bookingId)}
            >
              <Ionicons name="trash-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginLeft: 10,
  },
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  tile: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cabText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default MyCab;
