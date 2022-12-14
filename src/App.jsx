import Api_Info from "./api.json";
import axios from "axios";
import { useEffect, useState } from "react";
import "./common.css";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
const MIN_YEAR = 1996; /* Nasa APOD began 07/1995. This ensures our date is always valid */

const getRandInt = (max, min) => {
  min = min | 1;
  let rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
}
let year, month, day;

const App = () => {
  const [ APOD_url, setAPOD_url ] = useState(null);
  const [ APOD_txt, setAPOD_txt ] = useState(null);
  const [ APOD_exp, setAPOD_exp ] = useState(null);
  const [ refresh, setRefresh ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(Math.random());
    }, 60000);

    month = getRandInt(12);
    let today = new Date();

    if (month > today.getMonth()) {
      year = getRandInt(today.getFullYear() - 1, MIN_YEAR);
    } else {
      year = getRandInt(today.getFullYear(), MIN_YEAR);
    }

    if (month === 2) {
      day = getRandInt(28); /* Bc February is complicated */
    } else {
      day = getRandInt(30); /* the 31st days arent that cool anyways */
    }

    axios.get(nasaURL + Api_Info.apikey + "&date=" + year + "-" + month + "-" + day)
      .then(response => {
        setAPOD_url(response.data.hdurl);
        setAPOD_txt(response.data.title);
        setAPOD_exp(response.data.explanation);
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
      <p className="img-desc-title">{APOD_txt}</p>
      <br/>
      <img className="img-center" src={APOD_url} alt={APOD_txt}/>
      <p className="img-desc">{APOD_exp}</p>
      <br/>
      <div className="footnote">Astronomy Picture of the Day: {month}-{day}-{year}</div>
      <br/>
    </div>
  );
};

export default App;
