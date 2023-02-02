import { useNavigation } from '@react-navigation/native';
import { Button, NativeBaseProvider, Text } from 'native-base'
import React, { useContext } from 'react'
import PedidoContext from '../../context/pedidos/pedidosContext';
import globalStyles from '../../styles/global'

export const BotonResumen = () => {


    // Hook para redireccionar
    const navigation = useNavigation();

    // leer el objeto de pedido
    const { pedido } = useContext(PedidoContext)

    // validamos si esta vacio para no enseñar el boton
    if (pedido.length === 0) return null
        return (
            <NativeBaseProvider>
           
                <Button
                    style={globalStyles.boton}
                    onPress={() => navigation.navigate('ResumenPedido')}
                >
                    <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
                </Button>
            </NativeBaseProvider>

        )
    }
