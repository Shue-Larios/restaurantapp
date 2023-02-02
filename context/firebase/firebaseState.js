import { useReducer } from "react";
import FirebaseContext from "./firebaseContext";
import FirebaseReducer from "./firebaseReducer";
import firebase from '../../firebase'
import { OBTENER_PRODUCTOS_EXITO } from "../../types";
import _ from 'lodash';



export const FirebaseState = (props) => {

    // crear state inicial
    const initialState = {
        menu: [],
    }

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    // funcion que se ejecuta para traer los prodctos
    const obtenerProductos = () => {

        // consultar firebase
        firebase.db.settings({ experimentalForceLongPolling: true })
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) // traer solo los que esten en existencia
            .onSnapshot(manejarSnapshot);


        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            // ordenar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria')

            // aca ya tenemos los resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                // payload son los datos que se mandan al reducer
                payload: platillos
            });
        }
    }
    return (
        // aca van las funciones que van a estar disponibles en toda las funcion
        <FirebaseContext.Provider
            // aca es como que este poniendo prosp de forma global 
            value={{
                // como aca lo estoy pasando ya lo tengo para usarlo en otro lado
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}