import { useState } from "react";
import BarChart from "./barChart";
import priceData1 from "./price-history1.json";
import priceData2 from "./price-history2.json";
import priceData3 from "./price-history3.json";

import "./App.css";

const App = () => {
  const [priceData, setPriceData] = useState(priceData1);
  const [name, setName] = useState<string>("2001-10");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let dataRange = priceData;
    if (name === "2001-10") {
      dataRange = priceData1;
    } else if (name === "2011-20") {
      dataRange = priceData2;
    } else {
      dataRange = priceData3;
    }
    setPriceData(dataRange);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <h1>Stock Price</h1>
      <BarChart data={priceData} />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="stocks">Select the range: </label> &nbsp;
        <select name="stocks" id="stocks" onChange={handleSelectChange}>
          <option value="2001-10">2001-2010</option>
          <option value="2011-20">2011-2020</option>
          <option value="2021-30">2021-2030</option>
        </select>
        &nbsp; &nbsp;
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default App;
