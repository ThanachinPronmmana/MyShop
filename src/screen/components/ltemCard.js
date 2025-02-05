import React from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
const ItemCard = ({title,price,category,image,onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.card}>
            {image && <Image source={{uri:image}} style={styles.image}/>}
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    details:{
        flex:1,
        padding:20,
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        color:"#333",
        marginBottom:5,
    },
    price:{
        fontSize:20,
        marginBottom:5,
    },
    category:{
        fontSize:12,
        color:"#666",
    },
    image:{
        width:'100%',
        height:150,
        borderRedius:20,
    },
    card:{
        backgroundColor:'#fff',
        borderRadius:8,
        margin:8,
    }
})
export default ItemCard