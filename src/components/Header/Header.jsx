import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import "./Header.css";

export const Header = ({ countries, country, onCountryChange }) => {
  return (
    <Grid
      className="app__header"
      container
      justify="space-between"
      alignItems="center"
    >
      <Grid item >
        <span>COVID-19</span>
        <Typography variant="h4" className="app__name">
          TRACKER
        </Typography>
      </Grid>
      <Grid item >
        <FormControl variant="outlined">
          <InputLabel>Countries</InputLabel>
          <Select
            className="countryselector"
            value={country}
            onChange={onCountryChange}
            label="Countries"
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(({ name, value, id }) => (
              <MenuItem key={id} value={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
