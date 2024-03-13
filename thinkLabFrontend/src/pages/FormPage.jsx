import Form from "../components/Form";

const FormPage = () => {
  const save = (data) => {
    console.log(data);
  };
  return <Form saveData={save} />;
};

export default FormPage;
