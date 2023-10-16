import React from 'react';
import {ReactComponent as PlusIcon} from "bootstrap-icons/icons/plus.svg";
const NewListButton = ({onCreateList}) => {
    return (
        <button
        type='button'
        className='btn btn-sm btn-outline-secondary ms-auto'
        onClick={onCreateList}
        >
          <small className='d-flex align-items-center'>
          <PlusIcon/>
          </small>  
        </button>
    );
};

export default NewListButton;