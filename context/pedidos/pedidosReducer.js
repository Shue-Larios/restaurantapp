import {
    CONFIRMAR_ORDENAR_PLATILLO,
    ELIMINAR_PRODUCTO,
    MOSTRAR_RESUMEN,
    PEDIDO_ORDENADO,
    SELECCIONAR_PRODUCTO
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        // en caso que se ejecute este case
        case SELECCIONAR_PRODUCTO:
            return {
                // obtenemos una copia del state
                ...state,
                platillo: action.payload
            }
        // en caso que se ejecute este case
        case CONFIRMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [
                    // si hay algo ya en el arreglo obtengo una copia para no perderlo
                    ...state.pedido,
                    action.payload
                ]
            }
        // en caso que se ejecute este case
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        // en caso que se ejecute este case
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                // que sea diferente al action. payload son los que requerimos
                // si elimino el articulo dos siempre me quedo con el uno eso dice la linea
                pedido: state.pedido.filter(articulo => articulo.id !== action.payload)
            }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                // si hacemos el pedido ya reiniciamo el arreglo
                pedido: [],
                total: 0,                // que sea diferente al action. payload son los que requerimos
                // si elimino el articulo dos siempre me quedo con el uno eso dice la linea
                idpedido: action.payload
            }
        default:
            return state;
    }
}