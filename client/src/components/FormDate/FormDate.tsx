import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import style from "./FormDate.module.css";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

type Props = {
  label: string;
  value: Date | null;
  onChange: (value: Date) => void;
  placeholder: string;
  error?: boolean;
  helperText?: any;
};

export const FormDate = (props: Props) => {
  const { label, value, onChange, placeholder, error, helperText } = props;
  const [currentValue, setCurrentValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    setCurrentValue(dayjs(value));
  }, [value]);

  const handleChange = (value: Dayjs | null) => {
    setCurrentValue(value);
    value && onChange(dayjs(value).toDate());
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={style.container}>
        <Typography>{label}</Typography>
        <MobileDatePicker
          minDate={dayjs(new Date())}
          value={currentValue}
          onChange={(newValue) => {
            handleChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              size={"small"}
              {...params}
              error={error}
              placeholder={placeholder}
              helperText={helperText}
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
};
