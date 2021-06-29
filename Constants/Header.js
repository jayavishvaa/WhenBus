import React from 'react';
import { View,Text,TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';


function Header() {
    return (
        <View style={{height:'6%',backgroundColor:'#5f9ea0',flexDirection:'row'}}>
            <TouchableOpacity style={{alignSelf:'center',}}>
                <Entypo name="menu" size={30} color="white" />
            </TouchableOpacity>
            <View style={{alignSelf:'center',marginLeft:'30%'}}>
                <Text style={{textAlign:'center',fontSize:20,color:'white',fontWeight:'bold'}}>Whenbus</Text>
            </View>
        </View>
    );
}

export default Header;