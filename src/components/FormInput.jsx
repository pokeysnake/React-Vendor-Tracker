import React, { useId } from "react";

export default function FormInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    required,
    as = "input",       // "input | "textarea"
    error,
    hint,
    ...rest 
}) {
    const id = useId();

    const describedBy = [];
    if (hint) describedBy.push(`${id}-hint`);
    if (error) describedBy.push(`${id}-error`);

    const commonProps = {
        id,
        name,
        value,
        onChange,
        placeholder,
        required,
        className: `form-input ${error ? "is-invalid" : ""}`,
        "aria-invalid" : !!error,
        "aria-describedby" : describedBy.join(" ") || undefined,
        ...rest,
    };


    return (
        <div className = "form-field">
            {label && <label className = "form-label" htmlFor={id}>{label}</label>}
            {as === "textarea" ? (
                <textarea {...commonProps}/>
            ) : (
                <input type={type} {...commonProps}/>
            )}

            {hint && <div id={`${id}-hint`} className="field-hint">{hint}</div>}
            {error && <div id={`${id}-error`} className="field-error">{error}</div>}

        </div>
    );

}