import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,TextInput} from 'react-native';
import Screen from '../../Constants/Screen';
import Header from '../../Constants/Header';
import MapView, { Marker, Callout,Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_KEY} from '../../Constants/googleMapKey';
import routes from '../routes';

export default function MapNavigation({navigation}) {

    const [location,setLocation] = useState(null);
    const [errMsg,setErrMsg] = useState(null);

    const [pin,setPin] = useState(null);

    const [ state,setState] = useState({

        pickupCords: {
            latitude: 11.1391576,
            longitude: 78.5949528,
            latitudeDelta: 0.0922,
             longitudeDelta: 0.0421
        },

        dropCords: {
            latitude: 11.14964,
            longitude: 78.59477,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },

    })

    const onPressLocation = () => {
        navigation.navigate(routes.CHOOSELOCATION, {getCordinates: fetchValues})
    }

    const fetchValues = (data) => {
        setState({
            pickupCords: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude
            },
            dropCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude
            }
        })
        console.log("data>>>>",data)
    }

    // const GOOGLE_MAPS_KEY = "AIzaSyCAp3pSIZTH2v9BiY6lGlf8qJWOgTbDL04";

    const { pickupCords, dropCords } = state;

    const mapRef = useRef();
 
    return (
        <Screen>
        <Header/>
        <View style={{flex:1}}>
            <MapView
                ref={mapRef}
                initialRegion={pickupCords}
                style={StyleSheet.absoluteFill}
            >
                <MapViewDirections
                    origin={pickupCords}
                    destination={dropCords}
                    apikey={GOOGLE_MAP_KEY}
                    strokeWidth={5}
                    strokeColor="red"
                    optimizeWaypoints={true}
                    onReady={result => {
                        mapRef.current.fitToCoordinates(result.coordinates,{
                            edgePadding: {
                                right: 30,
                                bottom: 300,
                                left: 30, 
                                top: 100
                            }
                        })
                    }}
                />

                <Marker
                    coordinate={pickupCords}
                />
                <Marker
                    coordinate={dropCords}
                />
            </MapView>     
        </View>
        <View style={styles.BottomSheet}>
            <Text>Where are u going....?</Text>
            <TouchableOpacity style={styles.ChooseBtn} onPress={onPressLocation}>
                <Text>Choose the location</Text>
            </TouchableOpacity>
        </View>
        </Screen>
    )
}

const styles = StyleSheet.create({

    MapView: {
        flex:1,
    },
    containerStyle: {
        backgroundColor:'white',
        flex:1
    },
    textInputStyle: {
        height:48,
        color:'black',
        fontSize:18,
        backgroundColor:'#F3F3F3'
    },
    BottomSheet: {
        width:'100%',
        padding:30,
        borderTopEndRadius:24,
        borderTopStartRadius:24,
        backgroundColor:'white'
    },
    ChooseBtn: {
        borderWidth:1,
        alignItems:'center',
        height:48,
        justifyContent:'center',
        borderRadius:4,
        backgroundColor:'white',
        marginTop:'2%'
    }

})