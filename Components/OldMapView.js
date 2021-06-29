import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,TextInput} from 'react-native';
import Screen from '../Constants/Screen';
import Header from '../Constants/Header';
import MapView, { Marker, Callout,Polyline } from 'react-native-maps';
// import LoctionMarker from '../Constants/LoctionMarker';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_KEY} from '../Constants/googleMapKey';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const {width,height} = Dimensions.get("window");

export default function MapNavigation() {

    const [downBottomSheet,setDownBottomSheet] = useState(true);
    const [upBottomSheet,setUpBottomSheer] = useState(false);

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

    // const GOOGLE_MAPS_KEY = "AIzaSyCAp3pSIZTH2v9BiY6lGlf8qJWOgTbDL04";


    const DownToTop = () => {
        setDownBottomSheet(false);
        setUpBottomSheer(true);
    }
 
    const BottomSheet = () => {
        return (
            <View 
                style={{
                    height: height * 0.2,
                    width:'100%',
                    backgroundColor:'white',   
                }}
            >
                <View 
                    style={{
                        alignItems:'center',
                        flexDirection:'row',
                        justifyContent:'space-around',
                        flex:1
                    }}
                >
                
                <View style={{flex:1}}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        query={{
                            key: 'YOUR API KEY',
                            language: 'en',
                        }}
                        styles={{
                            container: styles.containerStyle,
                            listView: styles.textInputStyle
                        }}
                        
                    />
                    <TextInput
                        style={{
                            borderRadius: 5,
                            margin: 10,
                            color: '#000',
                            borderColor: '#666',
                            backgroundColor: '#FFF',
                            borderWidth: 1,
                            height: 45,
                            paddingHorizontal: 10,
                            fontSize: 18,
                        }}
                        placeholder={'Destination'}
                        placeholderTextColor={'black'}
                    />
                    

                </View>
                <View style={{width:"10%"}}>
                    <TouchableOpacity 
                        style={{height:40,backgroundColor:'#E1E4E3',borderRadius:25,justifyContent:'center',borderWidth:0.5}}
                        onPress={() => DownToTop()}
                    >
                        <Text style={{textAlign:'center'}}>Go</Text>
                    </TouchableOpacity>
                </View>
                </View>  
            </View>
        )
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted')
            {
                setErrMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            setPin({latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
        })();
    }, []);

    let text = 'waiting..';
    if (errMsg) {
        text = errMsg;
    } else if (location) {
        text = JSON.stringify(location);
        // console.log(text);
    }

    const { pickupCords, dropCords } = state;

    const mapRef = useRef();
 
    return (
        <Screen>
            {upBottomSheet && <BottomSheet/>}
        <View style={{flex:1}}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                // fetchDetails={true}
                // GooglePlacesSearchQuery={{
                //     rankby: "distance"
                // }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    // setRegion({
                    //     latitude: details.geometry.location.lat,
                    //     longitude: details.geometry.location.lng,
                    //     longitudeDelta: 0.025,
                    //     latitudeDelta: 0.025 
                    // })
                }}
                query={{
                    key: GOOGLE_MAP_KEY,
                    language: 'en',
                    // components: "country:india",
                    // types: "establishment",
                    // radius: 3000,
                    // location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: {flex:0,position:'absolute',width:'100%',zIndex:1,marginTop:'-5%'},
                    listView: {backgroundColor:'white'}
                }}
            />
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

                {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude}} /> */}

                {/* <Marker
                    coordinate={pin}
                    draggable={true}
                    // onDragStart={(e) => {
                    //     console.log("Drag start",e.nativeEvent.coordinate)
                    // }}
                    // onDragEnd={(e) => {
                    //     setPin({
                    //         latitude: e.nativeEvent.coordinate.latitude,
                    //         longitude: e.nativeEvent.coordinate.longitude
                    //     })
                    // }}
                
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker> */}
                {/* <LoctionMarker 
                    uid="driver"
                    location={pin} /> */}
                
            </MapView>     
        </View>
        {/* <BottomSheetPopup/> */}
        {downBottomSheet && <BottomSheet/>}
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
    }
})