  export default function randomId() {
    const length = 30;
    const uid = Array.from({ length }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('');
    return uid;
}
export const handleExport = () => {
  const chartsContainer = chartsContainerRef.current;
  if (chartsContainer) {
    const chartCards = chartsContainer.querySelectorAll('.chart-card');

    const promises = Array.from(chartCards).map((chartCard) => {
      return new Promise((resolve) => {
        html2canvas(chartCard).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          resolve(imgData);
        });
      });
    });

    Promise.all(promises).then((imgDataArray) => {
      const mergedPdf = new jsPDF();

      imgDataArray.forEach((imgData, index) => {
        if (index > 0) {
          mergedPdf.addPage();
        }
        mergedPdf.addImage(imgData, 'JPEG', 0, 0);
      });

      mergedPdf.save('charts_export.pdf');
    });
  }
};

export const handleAddChart = (chartType, dropdownOptions, setCharts) => {
  // Logic to generate new chart data based on chartType and dropdownOptions
  const newChartData = generateChartData(chartType, dropdownOptions);
  console.log('Generated Chart Data:', newChartData);
  setCharts((prevCharts) => [...prevCharts, newChartData]);
};
const generateChartData = (chartType, dropdownOptions2) => {
  const labels = ['Label 1', 'Label 2', 'Label 3'];
  const data = Array.from({ length: labels.length }, () => Math.floor(Math.random() * 100));
  return {
    labels,
    chartType,
    dropdownOptions2,
    datasets: [
      {
        label: `New ${chartType} Chart`,
        data,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
  };
};