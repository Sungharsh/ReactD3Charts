import { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    //if conditional is a temporary setup for devlopment only to resolve svg rendering twice due to React.StrictMode
    if (d3.select("svg")) {
      d3.select("svg").remove();
    }

    const chartElement = chartRef.current;

    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    d3.select(chartElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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
