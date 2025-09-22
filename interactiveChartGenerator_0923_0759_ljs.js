// 代码生成时间: 2025-09-23 07:59:22
const React = require('react');
const { Chart, registerables } = require('chart.js');
import { Bar, Line } from 'react-chartjs-2';

// Register all chart components
Chart.register(...registerables);

// Define a component for the chart container
const InteractiveChartGenerator = ({ data, type }) => {
  // Destructure data and type from props
  const { labels, datasets } = data;

  // Set chart type to either bar or line according to the type prop
  const ChartComponent = type === 'bar' ? Bar : Line;

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Interactive Chart'
      },
    },
  };

  // Return chart component with destructured data and options
  return (
    <ChartComponent
      data={{
        labels,
        datasets,
      }}
      options={options}
    />
  );
};

// Define default chart data for bar and line charts
const defaultChartData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [{
    label: 'Example Dataset',
    data: [12, 19, 3, 5],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
    ],
    borderWidth: 1,
  }],
};

// Define a function to generate chart data based on user input
function generateChartData(inputData) {
  try {
    // Validate inputData to ensure it has required properties
    if (!inputData.labels || !inputData.datasets) {
      throw new Error('Invalid input data');
    }

    // Return validated and sanitized chart data
    return { ...inputData };
  } catch (error) {
    // Handle errors by logging and re-throwing
    console.error('Error generating chart data:', error);
    throw error;
  }
}

// Define a Gatsby page component that uses the InteractiveChartGenerator
const ChartPage = () => {
  // Example usage of generateChartData function with default data
  const chartData = generateChartData(defaultChartData);

  return (
    <div>
      <h1>Interactive Chart Generator</h1>
      <InteractiveChartGenerator data={chartData} type="bar" />
      {/* Add more chart types or configurations as needed */}
    </div>
  );
};

// Export the ChartPage component for use in Gatsby
export default ChartPage;