


export const newInvoice = (data) => {

    return {
        type: 'ADD_NEW',
        data
    }
}

export const editInvoice = (data) => {
    return {
        type: 'EDIT',
        data
    }
}

export const delInvoice = (id) => {
    return {
        type: 'DEL_INV',
        id
    }
}


/*

Action creators if using external API


export const initInvoices = () => {
  return async dispatch => {
    const invoices = await invoiceService.getAll()
    dispatch({
      type: 'INIT_INVOICES',
      data: invoices,
    })
  }
}

export const newInvoice = data => {
  return async dispatch => {
    const newInvoice = await invoiceService.createNew(data)
    dispatch({
      type: 'ADD_NEW',
      data,
    })
  }
}

*/