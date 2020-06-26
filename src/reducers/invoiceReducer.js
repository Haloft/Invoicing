const initialState = require('../invoices.json')

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW':            
            return [...state, action.data]
        case 'EDIT':
            return state.map(invoice => invoice.id === action.data.id ? action.data : invoice)
        case 'DEL_INV':
            return state.filter(invoice => invoice.id !== action.id);
    //  case 'INIT_INVOICES':
    //       return action.data
        default:
            return state
    }
}




export default invoiceReducer