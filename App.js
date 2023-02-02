import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DetallePlatillo } from './views/DetallePlatillo';
import { FormularioPlatillo } from './views/FormularioPlatillo';
import { Menu } from './views/Menu';
import { NuevaOrden } from './views/NuevaOrden';
import { ProgresoPedido } from './views/ProgresoPedido';
import { ResumenPedido } from './views/ResumenPedido';
import { BotonResumen } from './components/ui/BotonResumen';

// importar state de contex
import { FirebaseState } from './context/firebase/firebaseState';
import { PedidoState } from './context/pedidos/pedidosState';


const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <FirebaseState>
        <PedidoState>


          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='NuevaOrden'
              screenOptions={
                {
                  // para poner el texto en el centro
                  headerTitleAlign: 'center',
                  // para dar estilos al header nativo de cada OS
                  headerStyle: {
                    // color de la barra de navegacion
                    backgroundColor: '#FFDA00'
                  },
                  // para dar estilo al titulo
                  headerTitleStyle: {
                    fontWeight: 'bold'
                  },
                  // para el color del icono de atras en el header
                  headerTintColor: '#000'
                }
              }
            >

              <Stack.Screen
                name='NuevaOrden'
                component={NuevaOrden}
                options={{
                  // para poner un titulo al header
                  title: 'Nueva Orden',
                }}
              />

              <Stack.Screen
                name='Menu'
                component={Menu}
                options={{
                  // para poner el boton en el centro pososible no sea la mejor opcion
                  headerRightContainerStyle: {
                    marginTop: 7  
                  },
                  // para poner un titulo al header
                  title: 'Nuestro Menu',
                  // para poner un boton lado derecho
                  headerRight: props => <BotonResumen />,
                }}
              />

              <Stack.Screen
                name='DetallePlatillo'
                component={DetallePlatillo}
                options={{
                  // para poner un titulo al header
                  title: 'Detalle Platillo',
                }}
              />

              <Stack.Screen
                name='FormularioPlatillo'
                component={FormularioPlatillo}
                options={{
                  // para poner un titulo al header
                  title: 'Ordenar Platillo',
                }}
              />

              <Stack.Screen
                name='ResumenPedido'
                component={ResumenPedido}
                options={{
                  // para poner un titulo al header
                  title: 'Resumen Pedido',
                }}
              />

              <Stack.Screen
                name='ProgresoPedido'
                component={ProgresoPedido}
                options={{
                  // para poner un titulo al header
                  title: 'Progreso de Pedido',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>

      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
