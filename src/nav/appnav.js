import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../telas/login';
import RegisterScreen from '../telas/registro';
import CatImageScreen from '../telas/cat';

const Stack = createNativeStackNavigator();

function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Cat" component={CatImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;