import { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
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
      .text("This is D3 SVG sss")
      .attr("fill", "white")
      .attr("class", "title");

    return () => {
      d3.select("svg").remove();
    };
  }, []);

  return <div ref={chartRef}></div>;
};

export default BarChart;
