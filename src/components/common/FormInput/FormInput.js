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
  const { name } = field;
  const errorMessage = error[name];

  return (
    <div className="form-input-block">
      <label htmlFor={name}>{label}</label>
      <input
        className={errorMessage ? "error" : "form-input"}
        placeholder={placeholder}
        type={type}
        id={name}
        {...field}
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
  }),
  form: PropTypes.shape({
    getFieldMeta: PropTypes.func,
  }),
};

FormInput.defaultProps = {
  type: "text",
};

export default FormInput;
