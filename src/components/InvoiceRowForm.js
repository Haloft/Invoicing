import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InvoiceForm from './InvoiceForm'

export default function InvoiceRowForm(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button style={props.style} variant={props.vrnt} color={props.color} onClick={handleClickOpen}>
                {props.label}{props.title}
            </Button>
            <Dialog maxWidth={false} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Invoice</DialogTitle>
                <DialogContent>
                    {props.isEdit ?
                        <InvoiceForm handleClose={handleClose} new={false} id={props.id} /> :
                        <InvoiceForm handleClose={handleClose} new={true} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}