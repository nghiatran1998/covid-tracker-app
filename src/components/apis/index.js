import axios from "axios";

export const getCountries = () =>
  axios.get("https://api.covid19api.com/countries");

export const reportByCountry = (country) =>
  axios.get(`https://api.covid19api.com/total/country/${country}`);
