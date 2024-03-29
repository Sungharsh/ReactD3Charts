import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { DataTypes } from "./App";

interface BarChartProps {
  data: DataTypes[];
  name: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, name }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartElement = chartRef.current;

    const margin = { top: 22, right: 40, bottom: 50, left: 35 };
    const width = 550 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const years = data.map(values => values.year);
    const price = data.map(values => values.price);

    const svg = d3
      .select(chartElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left + 15}, ${margin.top})`);

    const xScaleWithYears = d3.scaleBand<number>().domain(years).range([0, width]).padding(0.3);

    const xScaleWithIndex = d3
      .scaleBand<number>()
      .domain(data.map((_d, i) => i))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear<number>()
      .domain([0, d3.max(price) as number])
      .range([height, 30]);

    svg
      .attr("transform", `translate(${margin.left + 18}, ${margin.top})`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .append("text")
      .attr("transform", "translate(100, 0)")
      .attr("x", -75)
      .attr("y", -15)
      .attr("class", "title")
      .text(name);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScaleWithYears))
      .append("text")
      .attr("y", height - 295)
      .attr("x", width - 260)
      .text("Years")
      .attr("class", "xHeadding");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left - 35}, ${margin.top - 20})`)
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", width - 580)
      .attr("y", height - 40)
      .attr("dy", "-23.1em")
      .attr("class", "yHeadding")
      .text("Stock price");

    const bar = svg.selectAll(".bar").data(price).enter();

    bar
      .append("g")
      .attr("transform", "translate(10, 0)")
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_d, i) => xScaleWithIndex(i) as number)
      .attr("y", d => yScale(d))
      .attr("width", xScaleWithYears.bandwidth())
      .transition()
      .ease(d3.easeLinear)
      .duration(100)
      .delay((_d, i) => i * 150)
      .attr("height", d => (height - yScale(d)) as number);

    bar
      .append("text")
      .attr("x", (_d, i) => xScaleWithIndex(i) as number)
      .attr("y", d => yScale(d as number))
      .attr("dy", "-0.5em")
      .attr("dx", "0.8em")
      .attr("class", "barValue")
      .text(price => price);

    return () => {
      d3.select("svg").remove();
    };
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default BarChart;
