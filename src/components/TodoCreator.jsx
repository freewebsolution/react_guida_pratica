import React, { useState } from "react";
import { ReactComponent as PlusLargeIcon } from "bootstrap-icons/icons/plus-lg.svg";

const TodoCreator = ({ onCreate }) => {
  const [text, setText] = useState("");
  return (
    <div
      style={{ width: "70%" }}
      className="position-absolute bottmo-0 gb-light p3 rounded d-flex align-items-center"
    >
      <PlusLargeIcon />
      {""}
      <input
        type="text"
        className="bg-light border-0 flex-grow-1 mx-2 py-1"
        placeholder="Aggiungi un'attività"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (text.trim().length > 0) {
              onCreate(text);
              setText("");
            }
          }
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default TodoCreator;
