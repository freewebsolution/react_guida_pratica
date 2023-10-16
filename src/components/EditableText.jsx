import React from 'react';
import { useState } from 'react';

const EditableText = ({initialText,onEditEnd,className}) => {
    const[editableText, setEditableText] = useState(initialText);
    return (
        <input
        type='text'
        className={className}
        value={editableText}
        onChange={(e) => setEditableText(e.target.value)}
        onBlur={()=>{
            if(editableText !== initialText){
                onEditEnd(editableText)
            }
        }}
        />
    );
};

export default EditableText;