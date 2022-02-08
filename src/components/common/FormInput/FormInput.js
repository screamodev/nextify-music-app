import PropTypes from "prop-types";
import "./formInput.scss";

function FormInput({
  field,
  form: { getFieldMeta },
  label,
  placeholder,
  type,
}) {
  const { error, touched } = getFieldMeta();
  const { name, onBlur, onChange, value } = field;
  const errorMessage = error[name];

  return (
    <div className="form-input-block">
      <label htmlFor={name}>{label}</label>
      <input
        className={errorMessage ? "error" : "form-input"}
        placeholder={placeholder}
        type={type}
        id={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
      {errorMessage && touched && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    getFieldMeta: PropTypes.func,
  }).isRequired,
};

FormInput.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
};

export default FormInput;
