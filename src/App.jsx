import { React, useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import Axios from "axios";
import { prettyPrintStat, sortData } from "./utils";
import numeral from "numeral";

// Style Sheet
import "./App.css";

// Components
import { Header } from "./components/Header/Header";
import { Map } from "./components/Map/Map";
import { TableData } from "./components/Table/Table";
import { LineGraph } from "./components/Charts/LineGraph";
import { InfoBox } from "./components/Info/InfoBox";

function App() {
  // STATES
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, settableData] = useState([]);
  const [mapCenter, setmapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setmapZoom] = useState(2);
  const [mapCountry, setmapCountry] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //ComponentDidMount
  useEffect(() => {
    const fetchWorldData = async () => {
      const response = await Axios("https://disease.sh/v3/covid-19/all");
      const data = response.data;
      setCountryInfo(data);
    };
    fetchWorldData();
  }, []);

  //ComponentDidMount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await Axios.get(
          "https://disease.sh/v3/covid-19/countries"
        );

        const data = response.data;

        const modifiedData = data.map(
          ({ country, countryInfo: { iso2, _id } }) => {
            return {
              name: country,
              value: iso2,
              id: _id,
            };
          }
        );

        let sortedData = sortData(data);
        setCountries(modifiedData);
        setmapCountry(data);
        settableData(sortedData);
      } catch (error) {
        alert("ERROR FETCHING COUNTRIES DATA");
      }
    };
    fetchCountries();
  }, []);

  // Function for Getting Data According to Country
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await Axios.get(url);
    const data = response.data;
    setCountry(countryCode);
    setCountryInfo(data);
    countryCode === "worldwide"
      ? setmapCenter([34.80746, -40.4796])
      : setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
    countryCode === "worldwide" ? setmapZoom(2) : setmapZoom(13);
  };

  return (
    <Grid className="app" container justify="space-evenly" spacing={3}>
      <Grid item lg={8} md={8} sm={12} xs={12} className="app_left">
        <Grid item>
          <Header
            countries={countries}
            country={country}
            onCountryChange={onCountryChange}
          />
        </Grid>
        <Grid item container spacing={3} justify="space-evenly">
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Today Cases"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="Today Recovered"
              active={casesType === "recovered"}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Today Deaths"
              isRed
              active={casesType === "deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Map
            className="app__map"
            countries={mapCountry}
            center={mapCenter}
            zoom={mapZoom}
            casesType={casesType}
          />
        </Grid>
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12} className="app_right">
        <Card>
          <CardContent>
            <h3>Total cases by country</h3>
            <TableData countriesData={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
