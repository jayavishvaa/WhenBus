import React, {useState} from 'react';
import { View, Text,StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import Screen from '../../Constants/Screen';
import Header from '../../Constants/Header';
import AddressPickup from '../AddressPickup';
import { showError, showSuccess } from '../HelperFunction';

function ChooseLocation({navigation},props) {

    const [state, setState] = useState({

        pickupCoords: {},
        destinationCoords: {},
    })

    const {pickupCoords,destinationCoords} = state;

    const checkValid = () => {
        if (Object.keys(pickupCoords).length === 0)
        {
            showError('Please enter your pickup location')
            return false
        }

        if (Object.keys(destinationCoords).length === 0)
        {
            showError('Please enter your pickup location')
            return false
        }
        return true
    }

    const onDone =() => {
        const isValid = checkValid();
        console.log("ISvalid..",isValid);

        if (isValid) {
            props.route.params.getCordinates({
                pickupCoords,
                destinationCoords
            })
            showSuccess("You can back now")
            navigation.goBack();
        }
    }

    const fetchAddressCoords = (lat,lng) => {
        setState({
            ...state, pickupCoords: {
                latitude: lat,
                londitude: lng
            }
        })
    }

    const fetchDestinationCoords = (lat,lng) => {
        setState({
            ...state, destinationCoords: {
                latitude: lat,
                londitude: lng
            }
        })
    }

    console.log("Props>>>>",props);

    // console.log("Pickup:",pickupCoords);
    // console.log("drop:",destinationCoords);


    return (
        <Screen>
            <Header/>
            <View style={styles.Container}>
                <ScrollView 
                    keyboardShouldPersistTaps="handled"
                    style={{backgroundColor:'white',flex:1,padding:24}}
                >
                    <AddressPickup
                        placeholderText="Choose your pickup location"
                        fetchAddress={fetchAddressCoords }
                    />

                    <View style={{marginBottom:'5%'}}/>

                    <AddressPickup
                        placeholderText="Choose your Drop location"
                        fetchAddress={fetchDestinationCoords }
                    />

                    <View style={{flex:1,marginTop:'5%'}}>
                        <TouchableOpacity style={styles.Btn} onPress={onDone}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({

    Container: {
         flex:1
    },
    Btn: {
        borderWidth:1,
        alignItems:'center',
        height:48,
        justifyContent:'center',
        borderRadius:4,
        backgroundColor:'white',
        marginTop:'2%'
    }

})

export default ChooseLocation;