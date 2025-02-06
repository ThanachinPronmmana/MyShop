import React from "react";
import { View,Text,StyleSheet,TouchableOpasity} from "react-native"

const CustomButton = ({onPress,title})=>{
    <TouchableOpasity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpasity>
}
const styles = StyleSheet.create({
    button:{
        padding:10,
        shadowColor:"#bdbdbd",
        alignContent:"center",
        marginBottom:20,
        width:300,
    },
    text:{
        color:"black",
        fontSize:16,
        textAlign:"center",
        marginBottom:"auto",
    }
})
export default CustomButton