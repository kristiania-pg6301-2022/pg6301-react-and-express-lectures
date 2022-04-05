import React from "react";

export function FormInput({ label, value, onChangeValue }) {
  return (
    <div className="form-input">
      <label>
        <strong>{label}</strong>{" "}
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
    </div>
  );
}
