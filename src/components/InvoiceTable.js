import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InvoiceFormDialog from './InvoiceFormDialog'
import { delInvoice } from '../actions'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row({ invoice }) {

    const roundToTwo = (num) => +(Math.round(num + "e+2") + "e-2");
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (

        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {invoice.id}
                </TableCell>
                <TableCell align="right">{invoice.name}</TableCell>
                <TableCell align="right">{invoice.street}</TableCell>
                <TableCell align="right">{invoice.zip}</TableCell>
                <TableCell align="right">{invoice.city}</TableCell>
                <TableCell align="right">{invoice.due_date}</TableCell>
                <TableCell align="right">{roundToTwo(invoice.rows.map(row => row.quantity * row.unit_price).reduce((a, b) => a + b))}</TableCell>
                <TableCell align="right">
                    <InvoiceFormDialog style={{ color: 'green' }} id={invoice.id} isEdit={true} label={<EditOutlinedIcon />} />
                    <Button onClick={() => dispatch(delInvoice(invoice.id))}><DeleteOutlineIcon style={{ color: "red" }} /></Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Product Rows
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead align="right">
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Unit Price </TableCell>
                                        <TableCell align="right">Currency </TableCell>
                                        <TableCell align="right">VAT % </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoice.rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.unit_price}</TableCell>
                                            <TableCell align="right">{row.currency}</TableCell>
                                            <TableCell align="right">{row.vat}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}





export default function InvoiceTable() {
    const invoices = useSelector(state => state)

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="center">

                    <TableContainer component={Paper} style={{ width: '75%' }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Invoice No:</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Street&nbsp;address</TableCell>
                                    <TableCell align="right">Zip</TableCell>
                                    <TableCell align="right">City&nbsp;</TableCell>
                                    <TableCell align="right">Due&nbsp;date</TableCell>
                                    <TableCell align="right">Total Amount&nbsp;€</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <Row key={invoice.name} invoice={invoice} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );

}
