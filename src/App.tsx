import { useState } from "react";
import BarChart from "./barChart";
import priceChart1 from "./price-history1.json";
import priceChart2 from "./price-history2.json";

import "./App.css";

const App = () => {
  const [priceData, setPriceData] = useState(priceChart1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPriceData(priceChart2);
  };

  return (
    <>
      <h1>Stock Price</h1>
      <BarChart data={priceData} />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="stocks">Select the range: </label> &nbsp;
        <select name="stocks" id="stocks">
          <option value="2001-10">2001-2010</option>
          <option value="2011-20">2011-2020</option>
        </select>
        &nbsp; &nbsp;
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default App;
