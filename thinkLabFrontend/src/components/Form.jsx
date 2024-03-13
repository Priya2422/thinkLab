import { useForm } from "react-hook-form";
import "./form.css";
import axios from "axios";
import { getRandomTenDigit } from "../utils/randomId";
import { useState } from "react";
const Form = ({ saveData }) => {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      manufacturer: "Molicel",
      model: "INR21700-P45B",
      type: "Li-ion",
      formFactor: "21700",
      mass: "70 (g)",
      height: "70.15 (mm)",
      diameter: "21.55 (mm)",
      volume: "25.59 (cm3)",
    },
  });
  const submitData = async (data) => {
    let formData = new FormData();
    const cellId = getRandomTenDigit();
    for (let name in data) {
      console.log(name);
      if (name === "image-cell") {
        formData.append("files", data[name][0]);
      } else if (name === "data-file") {
        formData.append("files", data[name][0]);
      } else {
        formData.append(name, data[name]);
      }
    }
    formData.append("cellId", cellId);
    try {
      await axios.post("http://localhost:3000/app/post", formData);
      setMessage("Data added successfully");
    } catch (error) {
      console.log(error);
      setError("Error in adding data");
    } finally {
      reset();
    }
  };
  return (
    <div className="forms">
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>Enter Battery Details</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="meta">
          <label htmlFor={"manufacturer"}>Manufacturer</label>
          <input
            name="manufacturer"
            id="manufacturer"
            {...register("manufacturer", { required: true })}
          />
          <label htmlFor={"model"}>Model</label>
          <input
            name="model"
            id="model"
            {...register("model", { required: true })}
          />
          <label htmlFor={"type"}>Type</label>
          <input
            name="type"
            id="type"
            {...register("type", { required: true })}
          />
          <label htmlFor={"formFactor"}>Form Factor</label>
          <input
            name="formFactor"
            id="formFactor"
            {...register("formFactor", { required: true })}
          />
          <label htmlFor={"mass"}>Mass</label>
          <input
            name="mass"
            id="mass"
            {...register("mass", { required: true })}
          />
          <label htmlFor={"height"}>Height</label>
          <input
            name="height"
            id="height"
            {...register("height", { required: true })}
          />
          <label htmlFor={"diameter"}>Diameter</label>
          <input
            name="diameter"
            id="diameter"
            {...register("diameter", { required: true })}
          />
          <label htmlFor={"volume"}>Volume</label>
          <input
            name="volume"
            id="volume"
            {...register("volume", { required: true })}
          />
        </div>
        <div className="files">
          <label htmlFor={"data-file"}>Data File</label>
          <input
            name="data-file"
            id="data-file"
            type="file"
            {...register("data-file", { required: true })}
          />
          <label htmlFor={"image-cell"}>Cell Image </label>
          <input
            name="image-cell"
            id="image-cell"
            type="file"
            {...register("image-cell", { required: true })}
          />
        </div>
        <div className="buttons">
          <button className="submitButton" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
