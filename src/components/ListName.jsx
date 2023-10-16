import React, { useState } from 'react';

const ListName = ({text,onChange}) => {
    const [editableText, setEditableText] = useState(text);
    return (
        <input
        className='h2 flex-grow-1 border-0 mx-2 py-1'
        value={editableText}
        onChange={(e) => setEditableText(e.target.value)}
        onBlur={()=> onChange(editableText)}
        />
            
    );
};

export default ListName;