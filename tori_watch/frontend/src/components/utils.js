import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

  export default function randomId() {
    const length = 30;
    const uid = Array.from({ length }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('');
    return uid;
}
  export const handleExport = (paperSize, chartsContainerRef) => {
    const chartsContainer = chartsContainerRef.current;
    console.log("container", chartsContainerRef)
    if (chartsContainer) {
      // Adjust container height to accommodate full content
      const originalHeight = chartsContainer.style.height;
      chartsContainer.style.height = `${chartsContainer.scrollHeight}px`;

      // Define the dimensions for A4, letter, and executive paper sizes
      const paperSizes = {
        A4: [595.28, 841.89], // [width, height] in points
        letter: [612, 792],
        executive: [522, 756],
      };

      // Get the dimensions for the selected paper size
      const format = paperSizes[paperSize] || paperSizes.A4;

      // Create a new jsPDF instance with the selected paper size
      const pdf = new jsPDF({
        orientation: 'portrait', // Adjust orientation as needed
        unit: 'pt', // Use points for units
        format, // Set page size to match selected paper size
      });

      // Capture the content of the charts container as an image using html2canvas
      html2canvas(chartsContainer).then((canvas) => {
        // Convert the captured canvas to a data URL
        const imgData = canvas.toDataURL('image/png');

        // Calculate scale factors to fit content within the selected paper size
        const scaleFactorX = format[0] / canvas.width;
        const scaleFactorY = format[1] / canvas.height;
        const scaleFactor = Math.min(scaleFactorX, scaleFactorY);

        // Calculate scaled dimensions for the content
        const scaledWidth = canvas.width * scaleFactor;
        const scaledHeight = canvas.height * scaleFactor;

        // Add the captured image to the PDF with scaled dimensions
        pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

        // Restore original container height
        chartsContainer.style.height = originalHeight;

        // Save the PDF file
        pdf.save(`charts_export_${paperSize}.pdf`);
      });
    }
  };

  export const handleAddChart = (chartType, dropdownOptions, setCharts) => {
    // Logic to generate new chart data based on chartType and dropdownOptions
    const newChartData = generateChartData(chartType, dropdownOptions);
    console.log('Generated Chart Data:', newChartData);
    setCharts((prevCharts) => [...prevCharts, newChartData]);
  };
  export const generateChartData = (chartType, dropdownOptions2) => {
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