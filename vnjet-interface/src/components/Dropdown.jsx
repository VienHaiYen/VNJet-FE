function Dropdown({ value, name, options, onChange }) {
  return (
    <select
      required
      id={name}
      className="form-control mr-3"
      onChange={onChange}
      value={value}
      name={name}
    >
      <option value="" defaultValue style={{ display: "none" }}></option>
      {options.map((item, index) => (
        <option value={item.value} key={index}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
