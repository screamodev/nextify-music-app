import "./formInput.scss";

function FormInput(props) {
  const { label, type = "text", placeholder, value, onChange } = props;

  return (
    <div className="form-input-block">
      <label>{label}</label>
      <input
        className="form-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;
