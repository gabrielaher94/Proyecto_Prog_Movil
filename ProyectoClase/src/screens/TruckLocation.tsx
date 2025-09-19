import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

export default function TruckLocation() {
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const pointA: LatLng = { latitude: 14.0818, longitude: -87.2068 };
  const pointB: LatLng = { latitude: 14.0790, longitude: -87.2090 };

  // Función para decodificar polyline de Google
  const decodePolyline = (t: string): LatLng[] => {
    let points: LatLng[] = [];
    let index = 0, len = t.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  // Función para obtener la ruta desde Google Maps
  const fetchRoute = async () => {
    const apiKey = 'AIzaSyDXv4jsXd3sBYDaJfQrIxlYVQgBMufT-Tc'; // Cambia por tu API Key
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pointA.latitude},${pointA.longitude}&destination=${pointB.latitude},${pointB.longitude}&key=${apiKey}`;
    
    try {
      const res = await axios.get(url);
      if (res.data.routes?.length > 0) {
        const points = decodePolyline(res.data.routes[0].overview_polyline.points);
        setRouteCoords(points);
        return res.data.routes[0].overview_polyline.points;
      } else {
        Alert.alert("No se encontró ruta");
        return null;
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error al obtener la ruta");
      return null;
    }
  };

  // Función para guardar la ruta en Firestore
  const saveRoute = async () => {
    const polyline = await fetchRoute();
    if (!polyline) return;

    try {
      await firestore().collection('routes').add({
        from: pointA,
        to: pointB,
        polyline,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert("Ruta guardada ✅");
    } catch (err) {
      console.error(err);
      Alert.alert("Error al guardar la ruta ❌");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: pointA.latitude,
          longitude: pointA.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={pointA} title="Punto A" />
        <Marker coordinate={pointB} title="Punto B" />
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>
      <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <Button title="Guardar Ruta" onPress={saveRoute} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }, 
});