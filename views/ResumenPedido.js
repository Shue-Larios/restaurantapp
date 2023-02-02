import React, { Fragment, useContext, useEffect } from 'react'
import {
  NativeBaseProvider,
  Heading,
  HStack,
  Button,
  Text,
  Box,
  Pressable,
  Center,
  VStack,
  Avatar,
  List,
} from "native-base";
import { Alert, ScrollView, StyleSheet } from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import { View } from 'react-native';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';



export const ResumenPedido = () => {

  // Hook para redireccionar
  const navigation = useNavigation();

  // en pedido esta todo lo que tiene el cliente a pedido hasta el momento
  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext)

  useEffect(() => {
    calcularTotal();
  }, [pedido])


  const calcularTotal = () => {
    let nuevoTotal = 0;
    // este reduce es como un .map
    nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0) // este cero es como en el que inicia

    mostrarResumen(nuevoTotal);
  }

  // redirecciona a progreso de pedido
  const progresoPedido = () => {
    Alert.alert('Revisa tu pedido',
      'Una ves que realizas tu pedido, no podras cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            // creamos un objeto con toda la informacion que requerimos
            const pedidoObj = {
              // para definir cuanto nos vamos a tardar al usuario
              tiempoEntrega: 0,
              completado: false,
              // Number para asegurarnos que es un numero
              total: Number(total),
              orden: pedido, //pedido es un array
              // para ver el dia que fue creado
              creado: Date.now()
            }

            // escribir el pedido en firebase
            try {
              // creamos una nueva coleccion con el objeto antes creado
              const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
              // pasamos el id del pedido para saber cual es
              pedidoRealizado(pedido.id)
              // navegar hacia el progreso del pedidos
              navigation.navigate('ProgresoPedido')
            } catch (error) {
              console.log(error);
            }

          }
        },
        {
          text: 'Revisar',
          style: 'cancel'
        }
      ]
    )
  }

  // elimina un producto del arreglo de pedido por su id
  const confirmarEliminacion = (id) => {
    Alert.alert('¿Deseas eliminar este articulo?',
      'Una ves eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // Eliminar del state
            eliminarProducto(id)

            // Calcular
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }



  return (
    <NativeBaseProvider>

      <View style={globalStyles.contenido}>

        <Heading size='xl' style={globalStyles.titulo}>Resumen Pedido</Heading>
        <ScrollView>
          <View >
            {pedido.map((platillo, i) => {
              const { cantidad, imagen, nombre, descripcion, categoria, precio, id } = platillo;
              return (
                <Fragment key={id + i}>
                  <List>
                    <VStack>
                      <View style={styles.contenedor}>
                        <Avatar
                          style={styles.imagen}
                          size="xl"
                          source={{ uri: imagen }} />
                        <View>
                          <Text
                            style={styles.nombre}
                          >{nombre}</Text>
                          <Text
                            style={styles.cantidad}
                            numberOfLines={2}
                          >Cantidad: {cantidad}</Text>
                          <Text
                            style={styles.nombre}
                            numberOfLines={2}
                          >Precio: ${precio}</Text>
                          <Button
                            style={{ marginTop: 15 }}
                            width='full'
                            colorScheme="danger"
                            onPress={() => confirmarEliminacion(id)}
                            full
                          >
                            <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>Elminar</Text>
                          </Button>
                        </View>
                      </View>
                    </VStack>
                  </List>
                </Fragment>
              )
            })}
            <View style={{ marginBottom: 100 }}>
              <Text style={[globalStyles.cantidad]}>Total a Pagar ${total} </Text>
              <Button
                style={{ backgroundColor: '#000' }}
                onPress={() => navigation.navigate('Menu')}
                full
              >
                <Text style={{ color: '#FFF', fontSize: 16, textTransform: 'uppercase' }}>Seguir Pidiendo </Text>
              </Button>
            </View>

          </View >
        </ScrollView>
      </View>
      <Box>
        <HStack style={globalStyles.boton} safeAreaBottom shadow={6}>
          {/* para poner el boton como grueso */}
          <Pressable py="3" flex={1}
            onPress={() => progresoPedido()}
          >
            <Center>
              <Text style={globalStyles.botonTexto} fontSize="16">
                Ordenar Pedido
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider >

  )
}


const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 5,
    padding: 20,
  },
  nombre: {
    marginLeft: '4.5%',
    fontWeight: 'bold',
    fontSize: 18
  },
  cantidad: {
    marginVertical: 5,
    marginLeft: '4.5%',
    maxWidth: '85%',
    fontSize: 18
  },
  imagen: {
    marginHorizontal: 8
  }
});