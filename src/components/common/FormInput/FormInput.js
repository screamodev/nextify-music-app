import PropTypes from "prop-types";
import "./formInput.scss";

function FormInput({
  field,
  form: { errors, touched, setErrors },
  label,
  placeholder,
  type,
  isTextarea,
}) {
  const { name, onBlur, onChange, value } = field;

  const isTouched = touched[name];
  const errorMessage = errors[name];

  const disableError = () => {
    const errorsAsArray = Object.entries(errors);
    const errorsWithoutClickedFieldError = errorsAsArray.filter(
      ([key]) => key !== name
    );
    const filteredArrayToObject = Object.fromEntries(
      errorsWithoutClickedFieldError
    );
    setErrors(filteredArrayToObject);
  };

  return (
    <div className="form-input-block">
      <label htmlFor={name}>{label}</label>
      {isTextarea ? (
        <textarea
          className={errorMessage ? "error" : "form-input"}
          placeholder={placeholder}
          type={type}
          id={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={disableError}
          value={value}
        />
      ) : (
        <input
          className={errorMessage ? "error" : "form-input"}
          placeholder={placeholder}
          type={type}
          id={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={disableError}
          value={value}
        />
      )}
      {isTouched && errorMessage && (
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
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    setErrors: PropTypes.func,
  }).isRequired,
  isTextarea: PropTypes.bool,
};

FormInput.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  isTextarea: false,
};

export default FormInput;
