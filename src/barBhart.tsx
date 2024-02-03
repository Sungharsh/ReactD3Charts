import { useRef, useEffect } from "react";
import * as d3 from "d3";
import priceHistory1 from "./price-history1.json";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartElement = chartRef.current;

    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3
      .select(chartElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(15, 0)");

    const xScaleWithYears = d3
      .scaleBand<number>()
      .domain(priceHistory1.map(values => values.year))
      .range([0, width])
      .padding(0.3);

    const xScaleWithIndex = d3
      .scaleBand<number>()
      .domain(priceHistory1.map((_d, i) => i))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear<number>()
      .domain([0, d3.max(priceHistory1.map(values => values.price)) as number])
      .range([height, 30]);

    svg.append("g").attr("transform", `translate(8, ${height})`).call(d3.axisBottom(xScaleWithYears));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top - 20})`)
      .call(d3.axisLeft(yScale));

    const bar = svg
      .selectAll(".bar")
      .data(priceHistory1.map(values => values.price))
      .enter();

    bar
      .append("g")
      .attr("transform", "translate(10, 0)")
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_d, i) => xScaleWithIndex(i) as number)
      .attr("y", d => yScale(d))
      .attr("width", xScaleWithYears.bandwidth())
      .attr("height", d => (height - yScale(d)) as number);

    return () => {
      d3.select("svg").remove();
    };
  }, []);

  return <div ref={chartRef}></div>;
};

export default BarChart;
