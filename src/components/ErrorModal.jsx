import React from 'react';

const ErrorModal = ({message,onConfirm}) => {
    return (
        <div className='modal-dialog'>
        <div className='modal-content'>
        <div className='modal-body'>
        <p>{message}</p>
        </div>
        <div className='modal-footer'>
        <button className='btn btn-secondary' onClick={onConfirm}>Ok</button>
        </div>
        </div>
            
        </div>
    );
};

export default ErrorModal;