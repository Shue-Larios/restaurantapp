import React, { useContext, useState } from 'react'
import PedidoContext from '../context/pedidos/pedidosContext'
import {
  NativeBaseProvider,
  Text,
  Card,
  Heading,
  Box,
  HStack,
  Center,
  Pressable,
} from "native-base";
import { Image, View } from 'react-native';
import globalStyles from '../styles/global';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const DetallePlatillo = () => {

  // en platillo esta todo lo que tiene el pedido
  const { platillo } = useContext(PedidoContext)
  //  para sacar todo lo que ocupo de platillo
  const { nombre, imagen, descripcion, precio } = platillo

   // Hook para redireccionar
   const navigation = useNavigation();


  return (
    <NativeBaseProvider>

      <View style={globalStyles.contenedor}>
        <ScrollView>
          <View style={globalStyles.contenido}>
            <Heading size='xl' style={globalStyles.titulo}>{nombre}</Heading>

            <Card>
              <Box>
                <Image source={{ uri: imagen }} style={globalStyles.imagen} />
                <Text style={{ marginTop: 20 }}>{descripcion}</Text>
                <Text style={globalStyles.cantidad}>Precio: ${precio} </Text>
              </Box>
            </Card>
          </View>
        </ScrollView>

        <Box>
          <HStack style={globalStyles.boton} safeAreaBottom shadow={6}>
            {/* para poner el boton como grueso */}
            <Pressable py="3" flex={1}
            onPress={() => navigation.navigate('FormularioPlatillo')}
            >
              <Center>
                <Text style={globalStyles.botonTexto} fontSize="16">
                  Ordenar Platillo
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>

      </View>

    </NativeBaseProvider>

  )
}
