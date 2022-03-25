import React, { useState } from "react";

export function AddNewMovie() {
  const [title, setTitle] = useState("");
  return (
    <form>
      <h1>Add new movie</h1>

      <div>
        <label>
          <strong>Title:</strong>{" "}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
    </form>
  );
}
