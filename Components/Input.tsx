import React from "react";

interface InputProps {
  label: string;
  type: string;
  id?: string;
  name: string;
  step?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text" || "number" || "file",
  label,
  id = "",
  name,
  step,
}) => {
  return (
    <div className="mb-3 row">
      <label className="col-sm-4 col-form-label">{label}</label>
      <div className="col-sm-8">
        <input
          id={id}
          type={type}
          className="form-control"
          name={name}
          placeholder={`Enter ${label} here`}
          step={step}
        />
      </div>
    </div>
  );
};

export default Input;
