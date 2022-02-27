import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import { getLocation } from './LocationService';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';


const db = SQLite.openDatabase("addressDatabase.db")

export default function AddressBook({ navigation }) {
    const [address, setAddress] = useState("")
    const [addressList, setAddressList] = useState([])

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("create table if not exists Address (id integer primary key not null, Name text, Latitude text, Longitude text);")
        }, error => console.log(error))
        updateList()
    }, [])


    const createAddress = (name, lat, long) => {
        db.transaction(tx => {
            tx.executeSql('insert into Address (Name, Latitude, Longitude) values (?, ?, ?)', [name, lat, long])
        }, error => console.log(error), updateList)
    }

    const deleteAddress = (id) => {
        db.transaction(tx => {
            tx.executeSql("delete from Address where id = ?;", [id])
        }, error => console.log(error), updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from Address;', [], (_, { rows: { _array } }) => {
                setAddressList(_array)
            })
        })
    }

    const saveAddress = async () => {
        const latLng = await getLocation(address)
        createAddress(address, JSON.stringify(latLng.latitude), JSON.stringify(latLng.longitude))
        setAddress("")
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider onPress={() => navigation.navigate("Map", { address: item.Name, longitude: item.Longitude, latitude: item.Latitude })} onLongPress={() => deleteAddress(item.id)}>
                <ListItem.Content>
                    <ListItem.Title>{item.Name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                    <Text style={{ color: "grey" }}>Show on map</Text>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }


    return (
        <View style={styles.container}>
            <View style={{marginTop: 5, width: "100%"}}>
            <Input style={{marginTop: 5}}placeholder="Type address here" label="PLACEFINDER" value={address} onChangeText={text => setAddress(text)} />
            </View>
            <Button containerStyle={styles.button} raised icon={{ type: "material", name: "save", color: "#fff" }} onPress={() => saveAddress()} title="SAVE" />
            <View style={{ width: "100%", flex: 1, marginTop: 10 }}>
                <FlatList
                    data={addressList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
       
        width: "80%"
        
    }
});
