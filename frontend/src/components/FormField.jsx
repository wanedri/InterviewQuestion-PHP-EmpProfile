export default function FormField({ id, label, error, required, fullWidth, children }) {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''} ${fullWidth ? 'form-field--full' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required-mark" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
