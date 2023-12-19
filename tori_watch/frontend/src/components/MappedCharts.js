import { useState } from "react";

export const MappedCharts = ({ chartData, chartOptions, dropdownOptions, charts, setCharts }) => {
    // const [charts, setCharts] = useState([null])
    const handleDelete = (index) => {
        // Implement the logic to delete the chart at the specified index
        // For example, if you're using an array to store charts, you can splice the array
        const updatedCharts = [...charts]; // Assuming you have a state variable 'charts' that holds all the charts
        updatedCharts.splice(index, 1); // Remove the chart at the specified index
        console.log('Deleted chart');
        setCharts(updatedCharts); // Update the state with the new array
      };
      
      const handleModify = (index) => {
        // Logic to modify the chart at the specified index
        // You can implement a modal or other UI for modification
        console.log(`Modify chart at index ${index}`);
      };
      
      const handleAddChart = (chartType, dropdownOptions2) => {
        // Logic to generate new chart data based on chartType and dropdownOptions
        const newChartData = generateChartData(chartType, dropdownOptions2);
        console.log('Generated Chart Data:', newChartData);
        setCharts((prevCharts) => [...prevCharts, newChartData]);
      };

    return (
        <div
              id="charts-container" 
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              flexWrap='wrap'
              overflowY="auto"
            >
              {/* Dynamic Chart Cards */}
              {charts.map((chartData, index) => (
                <div
                  key={index}
                  flex='1 1 300px'
                  margin='10px'
                  borderRadius='10px'
                  overflow='hidden'
                >
                  <ChartCard
                    classname="chart-card"
                    chartType={chartData.chartType}
                    chartData={chartData}
                    chartOptions={chartOptions}
                    dropdownCount={3}
                    dropdownOptions={dropdownOptions[2]}
                    chartRef={chartRefs.current[index + 3]}
                    onDelete={() => handleDelete(index)}
                    onModify={() => handleModify(index)}
                    />
                </div>
              ))}
              
        </div>

    )
}