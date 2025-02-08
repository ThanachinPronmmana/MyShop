import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, TextInput, Alert, TouchableOpacity, Text } from "react-native";
import ItemCard from "./components/ltemCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
const Shoppingscreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newproduct, setnewProducts] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  })
  const [searchText, setSearchText] = useState("")
  const [showSearch,setShowSearch] = useState(false)
  const [showDarkmode,setDarkmode] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const addProduct = () => {
    const { title, price, category, image } = newproduct;
    const setURLImage = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i
    if (!title || !price || !category || !image) {
      Alert.alert("Err", "Please fill in all fields")
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      Alert.alert("Err", "Price must be a valid number greater than 0.")
      return;
    }
    if (!setURLImage.test(image)) {
      Alert.alert("Error", "Please enter a valid image URL (png, jpg, jpeg, gif, webp, svg).");
      return;
    }
    const newProductscard = {
      id: Date.now().toString(),
      title: title,
      price: price,
      category: category,
      image: image,
    }
    setProducts((prevProduct) => [...prevProduct, newProductscard])
    setnewProducts({
      title: "",
      price: "",
      category: "",
      image: ""
    })
    setSearchText("");
  }
  const filteredProduct = products.filter((item) =>
    item.category.toLowerCase().includes(searchText.toLowerCase())
  )
  const toggleSearch = ()=>{
    setShowSearch(prev => !prev)
  }
  const toggleDarkmode = ()=>{
    setDarkmode(prev => !prev)
  }
  return (
    <View style={[styles.container,showDarkmode ? styles.darkcontainer : styles.lightcontainer]} >
      <View style={styles.containerIcon}>
      <TouchableOpacity style={styles.toggleBotton} onPress={toggleDarkmode}>
          <Icon name={showDarkmode ? "dark-mode" : "light-mode"}
          size={24}
          style={[styles.Iconset,showDarkmode && styles.darkText]}
          />
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleSearch}>
        <Text style={[styles.textSearch,showDarkmode && styles.darkText]}>
          {showSearch ? "Hide Search" : "Show Search"}
        </Text>
      </TouchableOpacity>
      { showSearch &&(
      <TextInput
        style={[styles.input,showDarkmode && styles.darkText]}
        placeholder="Enter title"
        value={newproduct.title}
        onChangeText={(text) => {
          setnewProducts((prev) => ({ ...prev, title: text }))
        }}
      />
      )}
      { showSearch &&(
      <TextInput
        style={[styles.input,showDarkmode && styles.darkText]}
        placeholder="Enter price"
        value={newproduct.price}
        onChangeText={(text) => {
          setnewProducts((prev) => ({ ...prev, price: parseFloat(text) || "" }))
        }}
      />
    )}
    { showSearch &&(
      <TextInput
        style={[styles.input,showDarkmode && styles.darkText]}
        placeholder="Enter category"
        value={newproduct.category}
        onChangeText={(text) => {
          setnewProducts((prev) => ({ ...prev, category: text }))
        }}
      />
    )}
    { showSearch &&(
      <TextInput
        style={[styles.input,showDarkmode && styles.darkText]}
        placeholder="Enter image URL"
        value={newproduct.image}
        onChangeText={(text) => {
          setnewProducts((prev) => ({ ...prev, image: text }))
        }}
      />
    )}
      <TouchableOpacity style={styles.addbutton} onPress={addProduct}>
        <Text style={styles.buttontext}>
          Add Product
        </Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredProduct}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ItemCard
                image={item.image}
                title={item.title}
                price={item.price}
                category={item.category}
              />

            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 5,
    color:"#000",
  },
  addbutton: {
    backgroundColor: "#4caf50",
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
    padding: 5,
  },
  buttontext: {
    fontWeight: "bold",
    color: "#fff"
  },
  darkcontainer:{
    backgroundColor: "#121212",
  },
  lightcontainer:{
    backgroundColor: "#f5f5f5",
  },
  toggleBotton:{
    color:"#fff",
    marginRight:10,
    padding:20,
  },
  toggleButtonText:{
    color:"#fff",
    marginRight:10,
    textAlign:"right",
  },
  darkText:{
    color:"#fff",
  },
  textSearch:{
    color:"#000",
  },
  containerIcon:{
    marginLeft:250,
  },
  Iconset:{
    color:"#000"
  }
});

export default Shoppingscreen;