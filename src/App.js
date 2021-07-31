import "@fontsource/roboto";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCountries, reportByCountry } from "./components/apis";
import CountriesSelector from "./components/CountriesSelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import "moment/locale/vi";

moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [reportByCountryId, setReportByCountryId] = useState({});

  // Lấy danh sách tất cả các quốc gia
  useEffect(() => {
    getCountries()
      .then((res) => {
        const countries = sortBy(res.data, "Country");
        setCountries(countries);
        setSelectedCountry("vn");
      })
      .catch((err) => console.log(err));
  }, []);

  // Nhận thông tin về quốc gia người dùng đã chọn
  const handleOnChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
  };

  // Lấy thông tin covid về quốc gia đã được chọn
  useEffect(() => {
    if (selectedCountry) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountry
      );
      reportByCountry(Slug)
        .then((res) => {
          setReportByCountryId(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [countries, selectedCountry]);

  return (
    <Container>
      <Typography component="h2" variant="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountriesSelector
        countries={countries}
        value={selectedCountry}
        handleOnChange={handleOnChange}
      />
      {/* Kiểm tra xem có thông về covid hay không ? */}
      {reportByCountryId.length > 0 ? (
        <>
          <Highlight report={reportByCountryId} />
          <Summary report={reportByCountryId} />
        </>
      ) : (
        <Typography component="p" variant="body2" style={{ marginTop: 30 }}>
          Không tìm thấy thông tin covid 19 của quốc gia này
        </Typography>
      )}
    </Container>
  );
}

export default App;
