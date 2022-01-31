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
  const errorMessage = error[field.name];

  return (
    <div className="form-input-block">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={errorMessage ? "error" : "form-input"}
        placeholder={placeholder}
        type={type}
        id={field.name}
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
  field: PropTypes.object,
  form: PropTypes.object,
};

FormInput.defaultProps = {
  type: "text",
};

export default FormInput;
