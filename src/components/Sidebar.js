import React from 'react';
import User from './User';
import ListNames from './ListNames';
import Col from './Col';


const Sidebar = ({ user: {name, image } }) => {

    return (
        <Col size={3} className='bg-light shadow-1'>
            <User  name={name} image={image}/>
            <hr/>
            <ListNames/>
        </Col>
    )
};

export default Sidebar;
