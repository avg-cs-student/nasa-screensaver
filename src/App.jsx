import Api_Info from "./api.json";
import axios from "axios";
import { useEffect, useState } from "react";
import "./common.css";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
const MIN_YEAR = 1996; /* Nasa APOD began 07/1995. This ensures our date is always valid */

const getRandInt = (max, min) => {
  min = min | 1;
  let rand = Math.floor(Math.random() * max);
  return rand > min ? rand : min;
}

const App = () => {
  const [ APOD_url, setAPOD_url ] = useState(null);
  const [ APOD_txt, setAPOD_txt ] = useState(null);
  const [ randomDate, setRandomDate ] = useState(null);
  const [ refresh, setRefresh ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(Math.random());
    }, 30000);

    let day = getRandInt(30);
    let month = getRandInt(12);
    let year = getRandInt(new Date().getFullYear(), MIN_YEAR);

    axios.get(nasaURL + Api_Info.apikey + "&date=" + "2021-" + month + "-" + day)
      .then(response => {
        setAPOD_url(response.data.hdurl);
        setAPOD_txt(response.data.title);
        if (!response.data.media_type.includes("image")) {
          setRefresh(Math.random());
        }
      })
      .catch( error => {
        console.error(error);
      });

    return () => clearInterval(interval);  
  }, [refresh]);

  return (
    <div className="img-container">
      <img className="img-center" src={APOD_url} alt={APOD_txt}/>
    </div>
  );
};

export default App;
