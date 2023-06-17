import Select from "react-select";

const renderField = (params) => {
  const { value, setValue, name, type } = params;
  return (
    <div className="form-group m-2">
      <label className="text-capitalize fw-bold">{name}</label>
      <input
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        type={type || "text"}
        className="form-control"
        placeholder={`Enter ${name}`}
      />
    </div>
  );
};

export const renderError = (params) => {
  const { errorDetail } = params;
  return (
    <div className="form-group m-2">
      <h3 className="text-danger">{errorDetail}</h3>
    </div>
  );
};

export const renderSelections = (params) => {
  const { options, setValue, name } = params;
  return (
    <div className="form-group m-2">
      <label className="text-capitalize fw-bold">{name}</label>
      <Select
        defaultValue={options.length ? options[0] : null}
        onChange={(choice) => {
          console.log(choice);
          setValue(choice);
        }}
        options={options}
      />
    </div>
  );
};

export default renderField;
