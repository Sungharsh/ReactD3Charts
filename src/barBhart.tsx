import { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    //if conditional is a temporary setup for devlopment only to resolve svg rending twice due to React.StrictMode
    if (d3.select("svg")) {
      d3.select("svg").remove();
    }

    const chartElement = chartRef.current;

    d3.select(chartElement)
      .append("svg")
      .append("text")
      .attr("x", 10)
      .attr("y", 50)
      .text("This is D3 SVG")
      .attr("fill", "white")
      .attr("class", "title");
  });

  return <div ref={chartRef}></div>;
};

export default BarChart;
