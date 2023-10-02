import React from 'react';

const Col = ({children,size,className ="",style}) => {

    const colClass = `col${size ? `-${size}`:""}`;
    const classes = `${colClass} ${className} p-3 over-flow-scroll vh-100`;
    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
};

export default Col;