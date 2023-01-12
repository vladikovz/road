import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./FormTextField.module.css";

type Props = {
  label: string;
  value: string | number | null;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
  helperText?: any;
};

export const FormTextField = (props: Props) => {
  const { label, value, onChange, placeholder, error, helperText } = props;
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    setCurrentValue(value ? value.toString() : "");
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <div className={style.container}>
      <Typography>{label}</Typography>
      <TextField
        size={"small"}
        value={currentValue}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};
