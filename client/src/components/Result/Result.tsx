import React from "react";
import style from "./Result.module.css";
import { ReactComponent as SuccessIcon } from "../../assets/Success.svg";
import { Chip, Typography } from "@mui/material";

type Props = {
  value: string;
};

export const Result = (props: Props) => {
  const { value } = props;

  return (
    <div className={style.container}>
      <SuccessIcon className={style.icon} />
      <Typography sx={{ color: "#777778", marginRight: "10px" }}>
        The distance of the route (in kilometers):{" "}
      </Typography>
      <Chip label={value} />
    </div>
  );
};
