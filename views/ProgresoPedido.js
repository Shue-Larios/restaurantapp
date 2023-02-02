import { useNavigation } from '@react-navigation/native';
import { Button, Heading, NativeBaseProvider, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import globalStyles from '../styles/global';
import Countdown from 'react-countdown';


export const ProgresoPedido = () => {
  // Hook para redireccionar
  const navigation = useNavigation();

  // obtenemos el idpedido para saber las actualizaciones de mi pedido
  const { idpedido } = useContext(PedidoContext);


  const [tiempo, setTiempo] = useState(0)

  const [completado, setCompletado] = useState(false)


  // para saber el estado de nuestro pedido
  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db.collection('ordenes')
        .doc(idpedido)
        .onSnapshot(function (doc) {
          setTiempo(doc.data().tiempoEntrega);
          setCompletado(doc.data().completado)
        })
    }
    obtenerProducto();
  }, [])

  // muestra el Countdown en la pantalla
  const renderer = ({ minutes, seconds }) => {
    // console.log(minutes);
    return (
      <Text>{minutes}:{seconds}</Text>
    )
  }

  return (
    <NativeBaseProvider>
      <View style={globalStyles.contenido}>

        {/* si el tiempo de entrega es igual a cero */}

        {tiempo === 0 && (
          <>
            <Heading size='sm' style={{ textAlign: 'center', marginTop: 50 }} >Hemos recibido tu orden...</Heading>
            <Heading size='sm' style={{ textAlign: 'center', marginTop: 5 }} >Estamos calculando el tiempo de entrega</Heading>
          </>
        )}

        {/* sino esta completada y el tiempo de entrega es mayor a cero */}
        {!completado && tiempo > 0 && (
          <>
            <Heading size='sm' style={{ textAlign: 'center', marginTop: 50 }} >Su orden estara lista en:</Heading>
            <Heading
              style={{ textAlign: 'center', marginTop: 10, fontSize: 60 }}
              size='3xl'
            >
              <Countdown
                // valores de inicio
                date={Date.now() + tiempo * 60000}
                // lo que se va a mostrar
                renderer={renderer}
              />

            </Heading>


          </>
        )}
        {/* cuando completado este como true */}
        {completado && (
          <>
            <Heading
              style={{ textAlign: 'center', marginTop: 50 }}
              size='xl'
            >
              Orden Lista
            </Heading>

            <Heading
              style={{ textAlign: 'center', marginTop: 10, }}
              size='sm'
            >
              Por favor, pase a recoger su pedido
            </Heading>

            <Button
              style={[globalStyles.boton, { marginTop: 100 }]}
              rounded="full"
              onPress={ () => navigation.navigate('NuevaOrden') }
            >
              <Text style={globalStyles.botonTexto}> Comenzar una Orden Nueva
              </Text>
            </Button>
          </>
        )}

      </View>

    </NativeBaseProvider>
  )
}

