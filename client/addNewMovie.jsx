import React, { useState } from "react";

function FormInput({ label, value, onChangeValue }) {
  return (
    <div>
      <label>
        <strong>{label}</strong>{" "}
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
    </div>
  );
}

export function AddNewMovie() {
  const [title, setTitle] = useState("");
  return (
    <form>
      <h1>Add new movie</h1>

      <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
    </form>
  );
}
