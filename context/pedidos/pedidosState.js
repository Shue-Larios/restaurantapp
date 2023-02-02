import { useReducer } from "react";
import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import {
    CONFIRMAR_ORDENAR_PLATILLO,
    ELIMINAR_PRODUCTO,
    MOSTRAR_RESUMEN,
    PEDIDO_ORDENADO,
    SELECCIONAR_PRODUCTO
} from "../../types";



export const PedidoState = (props) => {

    // crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idpedido: '',
    }

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidoReducer, initialState)


    // Selecciona el Producto que el usuario desea ordenar
    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    // Cuando el usuario confirma un platillo
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    // Muestra el total a pagar en el resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    // Elimina un articulo del carrito
    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    // para tener el id del pedido que se hizo ya guardado en firebase
    const pedidoRealizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }


    return (
        // aca van las funciones que van a estar disponibles en toda las funcion
        <PedidoContext.Provider
            // aca es como que este poniendo prosp de forma global 
            value={{
                // stas son parte de initialState
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idpedido: state.idpedido,
                // aca comparto las funciones
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}