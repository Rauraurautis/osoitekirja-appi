import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';

export default function MapScreen({ route, navigation }) {
    const [deltas, setDeltas] = useState({ latitudeDelta: 0.0922, longitudeDelta: 0.0421 })


    let { address, longitude, latitude } = route.params;
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)

    const zoom = () => {
        deltas.latitudeDelta > 0.0010 && deltas.longitudeDelta > 0.0010 ? setDeltas({ latitudeDelta: 0.0010, longitudeDelta: 0.0010 }) : setDeltas({ latitudeDelta: 0.0922, longitudeDelta: 0.0421 })

    }

    return (
        <View>
            <MapView
                style={styles.map}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: deltas.latitudeDelta,
                    longitudeDelta: deltas.longitudeDelta,
                }}
            >
                <Marker
                    key={1}
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={address}
                />
            </MapView>
            <TouchableOpacity style={styles.button} onPress={() => zoom()}>
                <Text style={styles.buttontext}>SHOW</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get("window").width,
        height: "90%"
    }, button: {
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'steelblue',
        color: "white",
        fontSize: 40,
        borderRadius: 5
    }, buttontext: {
        color: "white",
        fontSize: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
});
