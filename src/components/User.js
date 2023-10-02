import React from 'react';
import {getiamgeOrDeafault} from './../utility/utility.js'

const User = ({name,image}) => {
    return (
        <div className='d-flex align-items-center text-black-decoration-none py-1'>
            <p>
            <img className='img-thumbnail me-1 avatar'  src={getiamgeOrDeafault(image)} alt='user.name'/>
                <strong> {name}</strong>
            </p>
        </div>
    );
};

export default User;