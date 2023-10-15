import React, { useState } from "react";

function TodoText({ done, text,onChange }) {
  const textClasses = `mx-1 my-0 ps-3 flex-grow-1 border-0 ${
    done ? "text-decoration-line-through text-black-50" : ""
  }`;
  const [editableText,setEditableText] = useState(text)
  return(
    <input
    className={textClasses}
    type="text"
    value={editableText}
    onChange={(e)=>setEditableText(e.target.value)}
    onBlur={()=> onChange(editableText)}
    />
    )
}

export default TodoText;
