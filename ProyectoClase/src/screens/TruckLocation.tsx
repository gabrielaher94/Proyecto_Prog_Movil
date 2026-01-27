import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, LatLng, MapPressEvent } from 'react-native-maps';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

export default function TruckLocation() {
  const [pointA, setPointA] = useState<LatLng | null>(null);
  const [pointB, setPointB] = useState<LatLng | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const canSave = useMemo(() => !!pointA && !!pointB, [pointA, pointB]);

  // decodificador polyline de Google
  const decodePolyline = (t: string): LatLng[] => {
    const pts: LatLng[] = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0; result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      pts.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return pts;
  };

  // usuario toca el mapa: primero A, luego B
  const handleMapLongPress = useCallback((e: MapPressEvent) => {
    const coord = e.nativeEvent.coordinate;
    if (!pointA) {
      setPointA(coord);
      setRouteCoords([]);
      return;
    }
    if (!pointB) {
      setPointB(coord);
      setRouteCoords([]);
      return;
    }
    // si ya hay dos puntos, reemplazamos el más cercano al toque
    const distA = Math.hypot(coord.latitude - pointA.latitude, coord.longitude - pointA.longitude);
    const distB = Math.hypot(coord.latitude - pointB.latitude, coord.longitude - pointB.longitude);
    if (distA <= distB) setPointA(coord); else setPointB(coord);
    setRouteCoords([]);
  }, [pointA, pointB]);

  // pedir ruta a Google Directions usando los puntos del usuario
  const fetchRoute = useCallback(async () => {
    if (!pointA  ||!pointB) {
      Alert.alert('Seleccione los dos puntos primero');
      return null;
    }

    // Nota: no expongas tu API Key en el cliente en producción
    const apiKey = 'AIzaSyDXv4jsXd3sBYDaJfQrIxlYVQgBMufT-Tc';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pointA.latitude},${pointA.longitude}&destination=${pointB.latitude},${pointB.longitude}&key=${apiKey}`;

    try {
      const res = await axios.get(url);
      const routes = res.data?.routes || [];
      if (routes.length === 0) {
        Alert.alert('No se encontró ruta');
        return null;
      }
      const poly = routes[0].overview_polyline.points;
      const coords = decodePolyline(poly);
      setRouteCoords(coords);
      return poly;
    } catch (err) {
      console.error(err);
      Alert.alert('Error al obtener la ruta');
      return null;
    }
  }, [pointA, pointB]);

  // guardar puntos y polyline en Firestore
  const saveRoute = useCallback(async () => {
    if (!pointA || !pointB) {
      Alert.alert('Seleccione los dos puntos primero');
      return;
    }
    const polyline = await fetchRoute();
    if (!polyline) return;

    try {
      await firestore().collection('routes').add({
        from: new firestore.GeoPoint(pointA.latitude, pointA.longitude),
        to: new firestore.GeoPoint(pointB.latitude, pointB.longitude),
        fromObj: pointA, // opcional si quieres guardarlo también como objeto simple
        toObj: pointB,
        polyline,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Ruta guardada ✅');
    } catch (err) {
      console.error(err);
      Alert.alert('Error al guardar la ruta ❌');
    }
  }, [pointA, pointB, fetchRoute]);
return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 14.0818,
          longitude: -87.2068,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapLongPress}
      >
        {pointA && (
          <Marker
            coordinate={pointA}
            title='Punto A'
            draggable
            onDragEnd={e => { setPointA(e.nativeEvent.coordinate); setRouteCoords([]); }}
          />
        )}
        {pointB && (
          <Marker
            coordinate={pointB}
            title='Punto B'
            pinColor='blue'
            draggable
            onDragEnd={e => { setPointB(e.nativeEvent.coordinate); setRouteCoords([]); }}
          />
        )}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor='blue' />
        )}
      </MapView>

      <View style={styles.actions}>
        <Button title='Trazar ruta' onPress={fetchRoute} disabled={!canSave} />
        <View style={{ height: 8 }} />
        <Button title='Guardar ruta' onPress={saveRoute} disabled={!canSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  actions: { position: 'absolute', bottom: 20, left: 20, right: 20 }
});