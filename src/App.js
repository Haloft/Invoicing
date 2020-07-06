import React from 'react';
import { useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
//import { initInvoices } from './actions/

import InvoiceTable from "./components/InvoiceTable";
import HeaderRow from './components/HeaderRow'
import HeaderBar from './components/HeaderBar'
import InvoiceFormDialog from './components/InvoiceFormDialog';




function App() {
  const roundToTwo = (num) => +(Math.round(num + "e+2") + "e-2");
  const invoices = useSelector(state => state);
  const price = invoices.map(invoice => invoice.rows.map(r => r.quantity * r.unit_price));
  const prices = price.flat()


  /*
  If code would be modified to use an external api, 
  I would call useEffect hook here, and set up a service to src/services/invoiceService
  
  To be able to use async functions something like Redux-thunk would be necessary
  . 

  const dispatch = useDispatch()
   useEffect(() => {
    dispatch(initInvoices()) 
  },[dispatch]) 




  */
  
  if (invoices.length === 0) {
    return (
      <>
      <h1 style={{textAlign: "center"}}> No invoices to show</h1>
      <InvoiceFormDialog label={<AddIcon />} title="New Invoice" vrnt="contained" color="primary" style={{marginLeft: '45.5%'}} />
      </>
    )
  }

  const total = roundToTwo(prices.reduce((a, b) => a + b))


  return (
    <>
      <HeaderBar />
      <div className="header">
        <HeaderRow title="Amount of open invoices" value={invoices.length} />
        <HeaderRow title="Total Receivables" value={total} mark='€' />
      </div>
      <InvoiceTable />
      <InvoiceFormDialog label={<AddIcon />} title="New Invoice" vrnt="contained" color="primary" style={{ float: 'right', marginRight: '12.5%' }} />

    </>
  );
}

export default App;
