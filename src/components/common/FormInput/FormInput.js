import "./formInput.scss";

function FormInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="form-input-block">
      <label>{label}</label>
      <input
        className="form-input"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;
