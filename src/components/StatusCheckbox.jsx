import React from "react";

export default function StatusCheckbox({ done, onChange }) {
  return (
    <input type="checkbox" checked={done} readOnly={true} onChange={onChange} />
  );
}
