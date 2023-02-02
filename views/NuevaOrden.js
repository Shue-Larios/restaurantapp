
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, NativeBaseProvider, Container, Button } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';



export const NuevaOrden = () => {

 const navigation = useNavigation();

  return (
    <>

      <NativeBaseProvider>
        <Container style={globalStyles.contenedor}>
          <View style={[globalStyles.contenido, styles.contenido]}>
            <Button borderRadius="full" block
              style={globalStyles.boton}
              onPress={() => navigation.navigate('Menu') }
            >
              <Text style={globalStyles.botonTexto}>Crear Nueva orden</Text>
            </Button>
          </View>
        </Container>
      </NativeBaseProvider>
    </>
  )
}


const styles = StyleSheet.create({
  // para que se centre vertical y horizontal
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '120%'
  }
});
