import React from "react";

function TodoText({ done, text }) {
  const textClasses = `mx-1 my-0 ps-3 flex-grow-1 ${
    done ? "text-decoration-line-through text-black-50" : ""
  }`;
  return <p className={textClasses}>{text}</p>;
}

export default TodoText;
