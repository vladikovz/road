import {
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./FormSelect.module.scss";
import { City } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";

type FormSelectProps = {
  label: string;
  value: City;
  items: City[] | [];
  onChange: (value: City) => void;
  placeholder: string;
  onRemove?: (id: number) => void;
  error?: boolean;
  helperText?: any;
};

export const FormSelect = (props: FormSelectProps) => {
  const {
    label,
    value,
    items,
    onChange,
    placeholder,
    onRemove,
    error,
    helperText,
  } = props;
  const [currentValueId, setCurrentValueId] = useState("");

  useEffect(() => {
    const matchedCurrentValueId = items
      .find((item) => item.id === value?.id)
      ?.id.toString();
    setCurrentValueId(matchedCurrentValueId ?? "");
  }, [value, items]);

  const handleChange = (e: SelectChangeEvent) => {
    setCurrentValueId(e.target.value);
    const currentItem = items.find(
      (item) => item.id === Number(e.target.value)
    );

    currentItem && onChange(currentItem);
  };

  return (
    <div className={style.container}>
      <Typography>{label}</Typography>
      <div className={style.wrapper}>
        <div className={style.selectArea}>
          <Select
            className={style.select}
            value={currentValueId}
            size={"small"}
            onChange={(e) => handleChange(e)}
            displayEmpty
            error={error}
            // IconComponent={()=><div className={style.icon}>asd</div>}
          >
            <MenuItem disabled value="">
              <div className={style.placeholder}>{placeholder}</div>
            </MenuItem>
            {items.length ? (
              items.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name ?? ""}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
          <FormHelperText
            sx={{
              margin: "3px 14px 0 14px",
              color: "#d32f2f",
            }}
          >
            {helperText}
          </FormHelperText>
        </div>
        {onRemove && (
          <div
            className={style.icon}
            onClick={() => onRemove(Number(currentValueId))}
          >
            <IconButton sx={{ marginLeft: "5px" }} size={"small"}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};
