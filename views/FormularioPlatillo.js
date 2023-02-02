import React, { useContext, useEffect, useState } from 'react'
import {
  NativeBaseProvider,
  Input,
  Heading,
  HStack,
  FormControl,
  Button,
  Text,
  Box,
  Pressable,
  Center,
} from "native-base";
import { Alert } from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import { View } from 'react-native';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

export const FormularioPlatillo = () => {
  // state para las cantidades
  const [cantidad, setCantidad] = useState(1)

  // para el subtotal
  const [total, setTotal] = useState(0)

  // en platillo esta todo lo que tiene el pedido
  const { platillo, guardarPedido } = useContext(PedidoContext)
  //  para sacar todo lo que ocupo de platillo
  const { nombre, imagen, descripcion, precio } = platillo

  // redireccionar
  const navigation = useNavigation();

  // en cuanto el componente carga calcular la cantidad a pagar
  useEffect(() => {
    calcularTotal();
    // cada que cantidad cambie se ejecuta
  }, [cantidad])


  // calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad
    setTotal(totalPagar)
  }


  // incrementa en uno
  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1
    setCantidad(nuevaCantidad)
  }

  // disminuye en uno
  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1
      setCantidad(nuevaCantidad)
    }
  }

  // Confirma si la orden es correcta
  const confirmarOrden = () => {
    if (cantidad >= 1) {
      Alert.alert('Deseas confirmar tu pedido',
        'Un pedido confirmado ya no se podra modificar',
        [
          {
            text: 'Confirmar',
            onPress: () => {
              // Almacenar el pedido al pedido principal
              const pedido = {
                // tomamos una copia completa del platillo seleccionado
                ...platillo,
                cantidad,
                total
              }
              guardarPedido(pedido)

              // navegar hacia el resumen del pedido
              navigation.navigate('ResumenPedido')
            }
          },
          {
            text: 'Cancelar',
            style: 'cancel'
          }
        ]
      )
    } else {
      Alert.alert('Error',
        'Pedido incorrecto',
        [
          {
            text: 'De Acuerdo'
          }
        ]
      )
    }
  }

  
  return (
    <NativeBaseProvider>
      <View style={globalStyles.contenido}>
        <FormControl >
          <Heading size='xl' style={globalStyles.titulo}>Cantidad</Heading>
          <HStack space={3} justifyContent='space-between' marginTop='3' >
            {/* parte uno */}
            <Button
              style={{ backgroundColor: '#000', width: '30%' }}
              onPress={() => decrementarUno()}
            >
              <Icon
                style={{ fontSize: 40, color: '#FFF' }}
                name='remove'
              />
            </Button>
            {/* parte dos */}
            <Input
              style={{ fontSize: 22, textAlign: 'center' }}
              w="30%"
              keyboardType='numeric'
              value={cantidad.toString()}
              onChangeText={(cantidad) => setCantidad(cantidad)}
            />
            {/* parte tres */}
            <Button
              style={{ backgroundColor: '#000', width: '30%' }}
              onPress={() => incrementarUno()}
            >
              <Icon
                style={{ fontSize: 40, color: '#FFF' }}
                name='add-outline'
              />
            </Button>
          </HStack>
          <Text style={globalStyles.cantidad}>Subtotal: ${total} </Text>
        </FormControl >
      </View>
      <Box>
        <HStack style={globalStyles.boton} safeAreaBottom shadow={6}>
          {/* para poner el boton como grueso */}
          <Pressable py="3" flex={1}
            onPress={() => confirmarOrden()}
          >
            <Center>
              <Text style={globalStyles.botonTexto} fontSize="16">
                Agregar al Pedido
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>

  )
}
