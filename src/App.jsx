import Api_Info from "./api.json";
import axios from "axios";
import { useEffect, useState } from "react";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";

const App = () => {
  const [ APOD_url, setAPOD_url ] = useState(null);
  const [ randomDate, setRandomDate ] = useState(null);
//randomDate.toLocaleDateString('en-CA')
  
  
  useEffect(() => {
    axios.get(nasaURL + Api_Info.apikey + "&date=" + "2001-09-19")
      .then(response => {
        console.log(response);
        setAPOD_url(response.data.hdurl);
      })
      .catch( error => {
        console.error(error);
      });
  
  }, []);

  return (
    <div>
      <img src={APOD_url} alt="Nasa Astronomy Picture of the Day"/>
    </div>
  );
};

export default App;
