import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { db } from "../firebaseConfig";

const CabDetail = ({ route }) => {
  const { cab } = route.params;
  const [isBooking, setIsBooking] = useState(false);

  const bookCab = async () => {
    setIsBooking(true);
    try {
      const userBookings = await db
        .collection("bookings")
        .where("userId", "==", "currentUserId")
        .get();

      if (userBookings.docs.length >= 2) {
        Alert.alert("Error", "You cannot book more than 2 cabs at a time.");
        setIsBooking(false);
        return;
      }

      await db.collection("bookings").add({
        userId: "currentUserId",
        cabId: cab.id,
        bookedAt: new Date(),
      });

      Alert.alert("Success", "Cab booked successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to book the cab. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.detailRow}>
        <MaterialIcons name="local-taxi" size={24} color="#007bff" />
        <Text style={styles.detailText}>Company: {cab.company}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="directions-car" size={24} color="#007bff" />
        <Text style={styles.detailText}>Model: {cab.model}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="people-outline" size={24} color="#007bff" />
        <Text style={styles.detailText}>Passengers: {cab.passengers}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="star-outline" size={24} color="#007bff" />
        <Text style={styles.detailText}>Rating: {cab.rating}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="attach-money" size={24} color="#007bff" />
        <Text style={styles.detailText}>Cost: ${cab.cost}/hour</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, isBooking && styles.buttonDisabled]}
        onPress={bookCab}
        disabled={isBooking}
      >
        <Ionicons
          name={isBooking ? "hourglass" : "checkmark-circle"}
          size={24}
          color="#fff"
        />
        <Text style={styles.buttonText}>
          {isBooking ? "Booking..." : "Book Cab"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginVertical: 10,
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
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
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
  buttonDisabled: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default CabDetail;
