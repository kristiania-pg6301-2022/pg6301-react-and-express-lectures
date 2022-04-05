import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";

export function AddNewMovie({ createMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [plot, setPlot] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createMovie({ title, year: parseInt(year), country, plot });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new movie</h1>

      <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
      <FormInput label={"Year:"} value={year} onChangeValue={setYear} />
      <FormInput
        label={"Country:"}
        value={country}
        onChangeValue={setCountry}
      />
      <FormInput label={"Plot:"} value={plot} onChangeValue={setPlot} />
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
