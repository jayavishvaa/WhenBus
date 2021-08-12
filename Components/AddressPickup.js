import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_KEY } from '../Constants/googleMapKey';

function AddressPickup({placeholderText,fetchAddress}) {
    
    
    // Fetching the coordinates from the user 

    const onPressAddress = (data,details) => {
        console.log(details);
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat,lng);
    }


    return (
        <View style={styles.Container}>
            <GooglePlacesAutocomplete          // Using Google Places autocomplete using google API with billing account so that if we type something we will get a recommandation
                placeholder={placeholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                query={{
                    key: GOOGLE_MAP_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.ContainerStyle,
                    textInput: styles.textInputStyle
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    Container: {
         flex:1
    },
    ContainerStyle: {
        backgroundColor:'white'
    },
    textInputStyle: {
        height:48,
        color:'black',
        fontSize:16,
        backgroundColor:'#F3F3F3'
    }

})

export default AddressPickup;
