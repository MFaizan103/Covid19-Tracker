import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

export const InfoBox = ({ title, cases, active, isRed, total, ...props }) => {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
};
