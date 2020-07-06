import React from 'react';
import { Formik, Form, Field, FieldArray} from 'formik';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import { newInvoice } from '../actions'
import { editInvoice } from '../actions'
import { TextField } from 'formik-material-ui'
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import * as Yup from 'yup';


const InvoiceSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, 'Too Long!')
      .required('Required'),
    street: Yup.string()
      .max(50, 'Too Long!')
      .required('Required'),
    city: Yup.string()      
        .required('Required'),
    due_date: Yup.date()      
        .required('Required'),
    rows: Yup.array().of(Yup.object({
        name: Yup.string()
        .required('Required'),
        quantity: Yup.number()
            .required('Required'),
        unit_price: Yup.number()
        .required('Required')
    }))
  });



const InvoiceForm = (props) => {
    const dispatch = useDispatch();
    const invoices = useSelector(state => state)
    const generateNewId = () => invoices.length + 1;

    const handleEditSubmit = (values) => {
        dispatch(editInvoice(values))
        props.handleClose();
    }

    const handleSubmit = (values) => {
        dispatch(newInvoice(values))
        props.handleClose();
    }

  
    if (props.new) {

        return (
            <div>
                <Formik
                    initialValues=
                    {
                        {
                            id: generateNewId(),
                            name: '',
                            street: '',
                            zip: '',
                            city: '',
                            due_date: '',
                            rows:
                                [
                                    {
                                        quantity: '',
                                        currency: '',
                                        unit_price: '',
                                        unit_of_measurement: '',
                                        vat: '',
                                        name: '',
                                    },
                                ]
                        }
                    }
                    validationSchema={InvoiceSchema}
                    onSubmit={handleSubmit}
                >
                    {props => {
                        console.log(props)
                        return (
                            <Form>
                                <div>
                                    <Field
                                        style={{ marginRight: '1.5%' }}
                                        component={TextField}
                                        name='name'
                                        label="Customer"
                                        as='input'
                                    />
                                    <Field
                                        style={{ marginRight: '1.5%' }}
                                        component={TextField}
                                        label="Street Address"
                                        name='street'
                                        as='input'
                                    />
                                    <Field
                                        component={TextField}
                                        label="Zip"
                                        name='zip'
                                        as='input'
                                    />
                                </div>
                                <div>
                                    <Field
                                        style={{ marginRight: '1.5%' }}
                                        component={TextField}
                                        label="City"
                                        name='city'
                                        as='input'
                                    />
                                    <Field
                                        component={TextField}
                                        margin="normal"
                                        type="date"
                                        name='due_date'
                                        as='input'
                                    />
                                </div>
                                <h4>Product Rows</h4>
                                <FieldArray name="rows">
                                    {arrayHelpers => (
                                        <div>
                                            {props.values.rows.map((row, index) => {
                                                const name = `rows.${index}.name`
                                                const quantity = `rows.${index}.quantity`
                                                const unit_of_measurement = `rows.${index}.unit_of_measurement`
                                                const unit_price = `rows.${index}.unit_price`
                                                const currency = `rows.${index}.currency`
                                                const vat = `rows.${index}.vat`
                                                return (
                                                    <div key={index}>
                                                        <div>
                                                            <Field
                                                                style={{ marginRight: '1.5%' }}
                                                                component={TextField}
                                                                label="Item"
                                                                name={name}
                                                                as='input'
                                                            />
                                                            <Field
                                                                style={{ marginRight: '1.5%' }}
                                                                component={TextField}
                                                                label="Quantity"
                                                                type="number"
                                                                name={quantity}
                                                                as='input'
                                                            /> <Field
                                                                component={TextField}
                                                                label="Unit of measurement"
                                                                name={unit_of_measurement}
                                                                as='input'

                                                            />
                                                        </div>

                                                        <div>
                                                            <Field
                                                                style={{ marginRight: '1.5%' }}
                                                                component={TextField}
                                                                type="number"
                                                                label="Unit Price"
                                                                name={unit_price}
                                                                as='input'
                                                            /> <Field
                                                                style={{ marginRight: '1.5%' }}
                                                                component={TextField}
                                                                label="Currency"
                                                                name={currency}
                                                                as='input'
                                                            /> <Field
                                                                component={TextField}
                                                                type="number"
                                                                label="Vat"
                                                                name={vat}
                                                                as='input'
                                                            />
                                                        <DeleteOutlineIcon onClick={() => arrayHelpers.remove(index)} style={{ color: "red", marginLeft: '1%', marginTop: '3%'}} />
                                                            

                                                        </div>

                                                    </div>
                                                );
                                            })}
                                            <Button color="primary" type="button" style={{ marginTop: "2%" }} variant="outlined"
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        quantity: '',
                                                        currency: '',
                                                        unit_price: '',
                                                        unit_of_measurement: '',
                                                        vat: '',
                                                        name: ''
                                                    })}><AddIcon />Add Row</Button>
                                        </div>
                                    )}
                                </FieldArray>
                                <Button style={{ marginTop: "4%" }} color="primary" variant="contained" type="submit">Submit</Button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    } else {
        const invoice = invoices.find(inv => inv.id === props.id)
        return (
            <div>
                <Formik
                    initialValues=
                    {
                        {
                            id: invoice.id,
                            name: invoice.name,
                            street: invoice.street,
                            zip: invoice.zip,
                            city: invoice.city,
                            due_date: invoice.due_date,
                            rows: invoice.rows.map(row => ({ ...row })),
                        }
                    }
                    validationSchema={InvoiceSchema}
                    onSubmit={handleEditSubmit}
                >
                    {props => {
                        console.log(props)
                        return (
                            <Form>
                                <div>
                                    <Field
                                        style={{ marginRight: '2%' }}
                                        component={TextField}
                                        name='name'
                                        label="Customer"
                                        as='input'
                                    />
                                    <Field
                                        style={{ marginRight: '2%' }}
                                        component={TextField}
                                        label="Street Address"
                                        name='street'
                                        as='input'
                                    />
                                    <Field
                                        component={TextField}
                                        label="Zip"
                                        name='zip'
                                        as='input'
                                    />
                                </div>
                                <div>
                                    <Field
                                        style={{ marginRight: '2%' }}
                                        component={TextField}
                                        label="City"
                                        name='city'
                                        as='input'
                                    />
                                    <Field
                                        component={TextField}
                                        margin="normal"
                                        type="date"
                                        name='due_date'
                                        as='input'
                                    />
                                </div>
                                <h4>Product Rows</h4>
                                <FieldArray name="rows">
                                    {arrayHelpers => (
                                        <div>
                                            {props.values.rows.map((row, index) => {
                                                const name = `rows.${index}.name`
                                                const quantity = `rows.${index}.quantity`
                                                const unit_of_measurement = `rows.${index}.unit_of_measurement`
                                                const unit_price = `rows.${index}.unit_price`
                                                const currency = `rows.${index}.currency`
                                                const vat = `rows.${index}.vat`
                                                return (
                                                    <div key={index}>
                                                        <div>
                                                            <Field
                                                                style={{ marginRight: '2%' }}
                                                                component={TextField}
                                                                label="Item"
                                                                name={name}
                                                                as='input'
                                                            />
                                                            <Field
                                                                style={{ marginRight: '2%' }}
                                                                component={TextField}
                                                                label="Quantity"
                                                                type="number"
                                                                name={quantity}
                                                                as='input'
                                                            /> <Field
                                                                component={TextField}
                                                                label="Unit of measurement"
                                                                name={unit_of_measurement}
                                                                as='input'
                                                            />
                                                        </div>
                                                        <div>
                                                            <Field
                                                                style={{ marginRight: '2%' }}
                                                                component={TextField}
                                                                type="number"
                                                                label="Unit Price"
                                                                name={unit_price}
                                                                as='input'
                                                            /> <Field
                                                                style={{ marginRight: '2%' }}
                                                                component={TextField}
                                                                label="Currency"
                                                                name={currency}
                                                                as='input'
                                                            /> <Field
                                                                component={TextField}
                                                                type="number"
                                                                label="Vat"
                                                                name={vat}
                                                                as='input'
                                                            />
                                                            <DeleteOutlineIcon onClick={() => arrayHelpers.remove(index)} style={{ color: "red" }} />

                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <Button color="primary" type="button" style={{ marginTop: "2%" }} variant="outlined"
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        quantity: '',
                                                        currency: '',
                                                        unit_price: '',
                                                        unit_of_measurement: '',
                                                        vat: '',
                                                        name: ''
                                                    })}><AddIcon />Add Row</Button>
                                        </div>
                                    )}
                                </FieldArray>
                                <Button style={{ marginTop: "4%" }} color="primary" variant="contained" type="submit">Submit</Button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )

    }







}


export default InvoiceForm


