import React, { useState, useRef, useEffect } from "react";
import ChartCard from "./ChartCard";

export const MappedCharts = ({ chartData, chartOptions, dropdownOptions, charts, setCharts }) => {
  const chartRefs = useRef([]);

  useEffect(() => {
    // Ensure that chartRefs.current has the same length as charts
    chartRefs.current = Array(charts.length).fill(null).map((_, i) => chartRefs.current[i] || React.createRef());
  }, [charts]);

  const handleDelete = (index) => {
    const updatedCharts = [...charts];
    updatedCharts.splice(index, 1);
    setCharts(updatedCharts);
  };

  const handleModify = (index) => {
    console.log(`Modify chart at index ${index}`);
  };

  return (
    <div
      id="charts-container"
      style={{
        display: 'flex',  // Add display property
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'auto',
      }}
    >
      {/* Dynamic Chart Cards */}
      {charts.map((chartData, index) => (
        <div
          key={index}
          style={{
            flex: '1 1 300px',
            margin: '10px',
            borderRadius: '10px',
            overflow: 'hidden',
            maxWidth: '700px',
          }}
        >
          <ChartCard
            classname="chart-card"
            chartType={chartData.chartType}
            chartData={chartData}
            chartOptions={chartOptions}
            dropdownCount={3}
            dropdownOptions={dropdownOptions[2]}
            chartRef={chartRefs.current[index]}
            onDelete={() => handleDelete(index)}
            onModify={() => handleModify(index)}
          />
        </div>
      ))}
    </div>
  );
};
