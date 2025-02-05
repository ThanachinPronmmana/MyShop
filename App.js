import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Shoppingscreen from "./src/screen/Shoppingscreen"


const Stack = createStackNavigator()
const App = ()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shop">
        <Stack.Screen name='Shop' component={Shoppingscreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App