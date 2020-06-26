import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        display: 'inline-flex',
        width: '37.5%',
        marginBottom: '0.1%',
        justifyContent: 'center',
    },

    title: {
        

   
    },
    pos: {
        marginBottom: 12,
    },

});

export default function HeaderRow(props) {
    const classes = useStyles();

    return (
        
        <Card  align="center" className={classes.root} variant="outlined" >
            <CardContent>
                <Typography  variant="h5" component="h2">
                    {props.title}
                </Typography>

                <Typography variant="h3" component="h1">
                    {props.value}{props.mark}

                </Typography>
            </CardContent>

        </Card>
       
         
    );
}
