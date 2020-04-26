import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as d3 from 'd3';

export default function LineChart(props) {
  const svgEl = useRef(null);
  const chartEl = useRef(null);
  const xScaleEl = useRef(null);
  const yScaleEl = useRef(null);

  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  const [svgDimension, setSvgDimension] = useState({
    height: 0,
    width: 0,
  });

  const renderChart = useCallback(() => {
    const { height, width } = svgEl.current.getBoundingClientRect();
    setSvgDimension({ height, width });
    debugger;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    //Change the timePerse if the date format is difarent than dd/mm/yy
    const timeParser = d3.timeParse('%d/%m/%y');

    console.log(d3.extent(props.data, (datum) => timeParser(datum[0])));
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(props.data, (datum) => timeParser(datum[0])))
      .range([0, chartWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(props.data, (datum) => parseInt(datum[1]))])
      .range([chartHeight, 0])
      .nice();

    const line = d3
      .line()
      .x((d) => xScale(timeParser(d[0])))
      .y((d) => yScale(parseInt(d[1])))
      .curve(d3.curveMonotoneX);

    d3.select(xScaleEl.current).call(d3.axisBottom(xScale));
    d3.select(yScaleEl.current).call(
      d3
        .axisLeft(yScale)
        .tickValues([0, 5000, 10000, 15000, 20000])
        .tickSize(-chartWidth)
        .tickFormat(d3.format('.0s'))
    );

    d3.select(chartEl.current)
      .append('path')
      .datum(props.data)
      .attr('class', 'line')
      .attr('d', line);

    const lettestDataNode = props.data[props.data.length - 1];

    d3.select(chartEl.current)
      .append('line')
      .attr('class', 'dotted-line')
      .attr('x1', xScale(timeParser(lettestDataNode[0])))
      .attr('y1', 0)
      .attr('x2', xScale(timeParser(lettestDataNode[0])))
      .attr('y2', chartHeight)
      .attr('r', 5);

    d3.select(chartEl.current)
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', xScale(timeParser(lettestDataNode[0])))
      .attr('cy', yScale(parseInt(lettestDataNode[1])))
      .attr('r', 5);

    return () => {
      d3.select(chartEl.current).selectAll('*').remove();
      d3.select(xScaleEl.current).selectAll('*').remove();
      d3.select(yScaleEl.current).selectAll('*').remove();
    };
  }, [props.data]);

  useEffect(() => {
    renderChart();
  }, [props.data, renderChart]);

  return (
    <svg width='100%' height='100%' ref={svgEl}>
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
        ref={chartEl}
        style={{ fill: 'none', stroke: 'red', strokeWidth: 2 }}
      ></g>
      <g
        transform={`translate(${margin.left}, ${
          svgDimension.height - margin.bottom
        })`}
        ref={xScaleEl}
      ></g>
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
        ref={yScaleEl}
      ></g>
    </svg>
  );
}
