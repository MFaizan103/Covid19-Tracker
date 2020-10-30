import React from "react";
import numeral from "numeral";
import {
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
} from "@material-ui/core";

import "./Table.css";

export const TableData = ({ countriesData }) => {
  return (
    <TableContainer className="table">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Countries</TableCell>
            <TableCell align="left">Total Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countriesData.map(({ country, cases }) => (
            <TableRow key={country}>
              <TableCell>{country}</TableCell>
              <TableCell>{numeral(cases).format("0,0")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
