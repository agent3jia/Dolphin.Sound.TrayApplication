import { createStyles, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {
    children: JSX.Element;

}

const useStyles = makeStyles((theme: any) => createStyles({
    root: {
        height: "100%"
    },
    '@global': {
        '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
        },
        html: {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            height: '100%',
            width: '100%'
        },
        body: {
            height: '100%',
            width: '100%'
        },
        '#root': {
            height: '100%',
            width: '100%',
            color: theme.palette.text.primary
        },
        "::-webkit-scrollbar":
        {
            width: 8,
            height: 8,
            backgroundColor: theme.palette.background.dark
        },
        "::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
            borderRadius: 4,
        },
        "::-webkit-scrollbar-thumb": {
            borderRadius: 4,
            height: 4,
            // boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
            backgroundColor: theme.palette.primary.main
        },

    }
}));

export default function Container({ children }: Props): ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}
