import { cx } from "@/utils/helpers.js";

const fieldClass =
  "w-full min-h-12 rounded-xl border border-border bg-bg px-4 text-text placeholder:text-text-muted transition-colors hover:border-border-strong focus:border-accent focus:outline-none";

export function FieldMessage({ id, error, hint }) {
  if (!error && !hint) return null;
  return (
    <p
      id={id}
      className={cx("mt-1.5 text-sm", error ? "text-error" : "text-text-muted")}
      role={error ? "alert" : undefined}
    >
      {error || hint}
    </p>
  );
}

export function Input({
  id,
  label,
  error,
  hint,
  className,
  required,
  ...props
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cx(fieldClass, error && "border-error")}
        {...props}
      />
      <FieldMessage id={describedBy} error={error} hint={hint} />
    </div>
  );
}

export function Textarea({
  id,
  label,
  error,
  hint,
  className,
  required,
  rows = 6,
  ...props
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cx(fieldClass, "min-h-32 py-3", error && "border-error")}
        {...props}
      />
      <FieldMessage id={describedBy} error={error} hint={hint} />
    </div>
  );
}

export function Select({
  id,
  label,
  error,
  hint,
  className,
  required,
  options = [],
  ...props
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <select
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cx(fieldClass, error && "border-error")}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessage id={describedBy} error={error} hint={hint} />
    </div>
  );
}
