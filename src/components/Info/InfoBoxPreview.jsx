import React from "react";
import { InfoBox } from "./InfoBox";
import { Grid } from "@material-ui/core";
import { prettyPrintStat } from "../../utils";

export const InfoBoxPreview = (props) => {
  const {
    todayCases,
    todayDeaths,
    todayRecovered,
    totalCases,
    totalDeaths,
    totalRecovered,
    onClickChange,
  } = props;

  return (
    <Grid container justify="space-evenly">
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <InfoBox
          title="Coronavirus Cases"
          cases={prettyPrintStat(todayCases)}
          total={prettyPrintStat(totalCases)}
          onClick={onClickChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <InfoBox
          title="Recovered"
          cases={prettyPrintStat(todayRecovered)}
          total={prettyPrintStat(totalRecovered)}
          onClick={onClickChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <InfoBox
          title="Deaths"
          cases={prettyPrintStat(todayDeaths)}
          total={prettyPrintStat(totalDeaths)}
          onClick={onClickChange}
        />
      </Grid>
    </Grid>
  );
};
