import React, { Fragment, useContext, useEffect } from 'react'
import FirebaseContext from '../context/firebase/firebaseContext'
import PedidoContext from '../context/pedidos/pedidosContext';
import { StyleSheet, View } from 'react-native';
import { Avatar, List, NativeBaseProvider, ScrollView, Text, VStack, Pressable } from "native-base";
import { useNavigation } from '@react-navigation/native';



export const Menu = () => {

  // Context de Firebase para acceder a lo q ocupamos 
  const { menu, obtenerProductos } = useContext(FirebaseContext);

  // Context de pedido
  const { seleccionarPlatillo } = useContext(PedidoContext);

  // Hook para redireccionar
  const navigation = useNavigation();


  useEffect(() => {
    obtenerProductos();
  }, [])


  const mostrarHeading = (categoria, i) => {
    // se ejecute cuando la posicion sea mayor a cero
    if (i > 0) {
      // evaluo la categoria anterior para saber si es diferente
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <View style={styles.separador}>
            <Text style={styles.separadorTexto}> {categoria} </Text>
          </View >
        )
      }
    } else {
      return (
        <View style={styles.separador}>
          <Text style={styles.separadorTexto}> {categoria} </Text>
        </View >
      )
    }
  }



  return (

    <>
      <NativeBaseProvider>
        <ScrollView>
          <View>
            <View>

              {menu.map((platillo, i) => {
                const { imagen, nombre, descripcion, categoria, precio, id } = platillo;
                return (
                  <Fragment key={id}>
                    {mostrarHeading(categoria, i)}
                    <Pressable 
                      onPress={ () => {
                          // Eliminar algunas propiedades del platillo
                          // la primera es la propiedad que queremos quitar
                          // la segunda es crear un segundo objeto
                           const { existencia, ...platillo2 } = platillo;
                           seleccionarPlatillo(platillo2);
                           navigation.navigate("DetallePlatillo"); //navega a la otra pagina
                      }}
                    >
                      <List>
                        <VStack space="4" divider={mostrarHeading()}>
                          <View style={styles.contenedor}>
                            <Avatar size="lg" source={{ uri: imagen }} />
                            <View>
                              <Text
                                style={styles.nombre}
                              >{nombre}</Text>
                              <Text
                                style={styles.textDescripcion}
                                numberOfLines={2}
                              >{descripcion}</Text>
                              <Text
                                style={styles.nombre}
                                numberOfLines={2}
                              >Precio: ${precio}</Text>
                            </View>
                          </View>
                        </VStack>
                      </List>
                    </Pressable>
                  </Fragment>
                )
              })}


            </View>
          </View>
        </ScrollView>
      </NativeBaseProvider>


    </>

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
    fontWeight: 'bold'
  },
  textDescripcion: {
    marginLeft: '4.5%',
    maxWidth: '85%'
  },
  separador: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingLeft: 5,
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});
