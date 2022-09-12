import Api_Info from "./api.json";
import axios from "axios";
import { useEffect, useState } from "react";
import "./common.css";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";

const getRandInt = max => {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const [ APOD_url, setAPOD_url ] = useState(null);
  const [ randomDate, setRandomDate ] = useState(null);

  useEffect(() => {
    let day = getRandInt(30);
    let month = getRandInt(12);
    console.log(month);
    console.log(day);

    axios.get(nasaURL + Api_Info.apikey + "&date=" + "2021-" + month + "-" + day)
      .then(response => {
        console.log(response);
        setAPOD_url(response.data.hdurl);
      })
      .catch( error => {
        console.error(error);
      });


  
  }, []);

  return (
    <div class="img-container">
      <img class="img-center" src={APOD_url} alt="Nasa Astronomy Picture of the Day"/>
    </div>
  );
};

export default App;
