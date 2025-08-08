import React, { useState } from 'react'
import { Chart, registerables } from "chart.js";
import { Pie, Doughnut, Bar, Line, PolarArea } from "react-chartjs-2";

Chart.register(...registerables);

const StudentProgressChart = ({ courses }) => {
  const [chartType, setChartType] = useState("doughnut")
  const [dataType, setDataType] = useState("progress")

  // Add safety check for courses data
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return (
      <div className='bg-richblack-800 rounded-2xl border border-richblack-700 shadow-lg overflow-hidden'>
        <div className='p-6 bg-gradient-to-r from-richblack-700 to-richblack-800 border-b border-richblack-600'>
          <h2 className='text-2xl font-bold text-richblack-5 flex items-center'>
            <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
            Progress Analytics
          </h2>
        </div>
        <div className='p-12 text-center'>
          <div className='w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-4xl'>📊</span>
          </div>
          <p className='text-richblack-5 text-xl font-semibold mb-2'>No course data available</p>
          <p className='text-richblack-300'>Enroll in courses to see progress analytics</p>
        </div>
      </div>
    );
  }

  // Function for generating random colors
  const getRandomColor = (numColors) => {
    const colors = [];
    const colorPalette = [
      'rgba(255, 99, 132, 0.8)',   // Red
      'rgba(54, 162, 235, 0.8)',   // Blue
      'rgba(255, 205, 86, 0.8)',   // Yellow
      'rgba(75, 192, 192, 0.8)',   // Teal
      'rgba(153, 102, 255, 0.8)',  // Purple
      'rgba(255, 159, 64, 0.8)',   // Orange
      'rgba(199, 199, 199, 0.8)',  // Grey
      'rgba(83, 102, 255, 0.8)',   // Indigo
      'rgba(255, 99, 255, 0.8)',   // Pink
      'rgba(99, 255, 132, 0.8)',   // Green
    ];

    for (let i = 0; i < numColors; i++) {
      colors.push(colorPalette[i % colorPalette.length]);
    }
    return colors;
  }

  // Function to get chart-specific data structure
  const getChartData = (type) => {
    const isBarOrLine = chartType === "bar" || chartType === "line";
    
    if (type === "progress") {
      const progressData = courses.map(course => course.progressPercentage || 0);

      return {
        labels: courses.map(course => course.courseName || 'Untitled Course'),
        datasets: [
          {
            label: "Course Progress (%)",
            data: progressData,
            backgroundColor: isBarOrLine 
              ? 'rgba(34, 197, 94, 0.8)'
              : getRandomColor(courses.length),
            borderColor: isBarOrLine 
              ? 'rgba(34, 197, 94, 1)'
              : getRandomColor(courses.length).map(color => color.replace('0.8', '1')),
            borderWidth: 2,
            tension: chartType === "line" ? 0.4 : 0,
          }
        ]
      };
    } else {
      // Videos data
      const completedVideos = courses.map(course => {
        const totalLectures = course.totalLectures || 0
        const progress = course.progressPercentage || 0
        return Math.round((progress / 100) * totalLectures)
      });
      const totalVideos = courses.map(course => course.totalLectures || 0);

      return {
        labels: courses.map(course => course.courseName || 'Untitled Course'),
        datasets: [
          {
            label: "Completed Videos",
            data: completedVideos,
            backgroundColor: isBarOrLine 
              ? 'rgba(59, 130, 246, 0.8)'
              : getRandomColor(courses.length),
            borderColor: isBarOrLine 
              ? 'rgba(59, 130, 246, 1)'
              : getRandomColor(courses.length).map(color => color.replace('0.8', '1')),
            borderWidth: 2,
            tension: chartType === "line" ? 0.4 : 0,
          },
          {
            label: "Total Videos",
            data: totalVideos,
            backgroundColor: isBarOrLine 
              ? 'rgba(156, 163, 175, 0.8)'
              : getRandomColor(courses.length),
            borderColor: isBarOrLine 
              ? 'rgba(156, 163, 175, 1)'
              : getRandomColor(courses.length).map(color => color.replace('0.8', '1')),
            borderWidth: 2,
            tension: chartType === "line" ? 0.4 : 0,
          }
        ]
      };
    }
  }

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#F1F2FF',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: dataType === "progress" ? "Course Progress Overview" : "Videos Progress",
        color: '#F1F2FF',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    ...(chartType === "bar" || chartType === "line" ? {
      scales: {
        y: {
          beginAtZero: true,
          max: dataType === "progress" ? 100 : undefined,
          ticks: {
            color: '#F1F2FF',
            callback: function(value) {
              return dataType === "progress" ? value + '%' : value;
            }
          },
          grid: {
            color: 'rgba(241, 242, 255, 0.1)'
          }
        },
        x: {
          ticks: {
            color: '#F1F2FF'
          },
          grid: {
            color: 'rgba(241, 242, 255, 0.1)'
          }
        }
      }
    } : {})
  }

  // Function to render the appropriate chart component
  const renderChart = () => {
    const data = getChartData(dataType);
    
    switch(chartType) {
      case "pie":
        return <Pie data={data} options={options} />;
      case "doughnut":
        return <Doughnut data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      case "polarArea":
        return <PolarArea data={data} options={options} />;
      default:
        return <Doughnut data={data} options={options} />;
    }
  }

  return (
    <div className='bg-richblack-800 rounded-2xl border border-richblack-700 shadow-lg overflow-hidden'>
      {/* Header */}
      <div className='p-6 bg-gradient-to-r from-richblack-700 to-richblack-800 border-b border-richblack-600'>
        <h2 className='text-2xl font-bold text-richblack-5 flex items-center mb-6'>
          <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
          Progress Analytics
        </h2>
        
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Data Type Selection */}
          <div className='flex-1'>
            <h3 className='text-richblack-200 text-sm font-medium mb-3'>Data View:</h3>
            <div className='flex bg-richblack-700 rounded-lg p-1 border border-richblack-600'>
              <button 
                onClick={() => setDataType("progress")}
                className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  dataType === "progress" 
                    ? 'bg-caribbeangreen-200 text-white shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
              >
                📊 Progress %
              </button>
              <button 
                onClick={() => setDataType("videos")}
                className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  dataType === "videos" 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
              >
                🎥 Videos
              </button>
            </div>
          </div>

          {/* Chart Type Selection */}
          <div className='flex-1'>
            <h3 className='text-richblack-200 text-sm font-medium mb-3'>Chart Type:</h3>
            <div className='grid grid-cols-5 gap-1 bg-richblack-700 rounded-lg p-1 border border-richblack-600'>
              <button 
                onClick={() => setChartType("pie")}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  chartType === "pie" 
                    ? 'bg-yellow-500 text-richblack-900 shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
                title="Pie Chart"
              >
                🥧
              </button>

              <button 
                onClick={() => setChartType("doughnut")}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  chartType === "doughnut" 
                    ? 'bg-yellow-500 text-richblack-900 shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
                title="Doughnut Chart"
              >
                🍩
              </button>

              <button 
                onClick={() => setChartType("bar")}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  chartType === "bar" 
                    ? 'bg-yellow-500 text-richblack-900 shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
                title="Bar Chart"
              >
                📊
              </button>

              <button 
                onClick={() => setChartType("line")}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  chartType === "line" 
                    ? 'bg-yellow-500 text-richblack-900 shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
                title="Line Chart"
              >
                📈
              </button>

              <button 
                onClick={() => setChartType("polarArea")}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  chartType === "polarArea" 
                    ? 'bg-yellow-500 text-richblack-900 shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
                title="Polar Area Chart"
              >
                🎯
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className='p-6'>
        <div className='space-y-6'>
          {/* Quick Stats */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
              <p className='text-richblack-300 text-sm'>Total Courses</p>
              <p className='text-richblack-5 text-2xl font-bold'>{courses.length}</p>
            </div>
            <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
              <p className='text-richblack-300 text-sm'>Avg Progress</p>
              <p className='text-green-400 text-2xl font-bold'>
                {courses.length > 0 ? Math.round(courses.reduce((total, course) => 
                  total + (course.progressPercentage || 0), 0) / courses.length) : 0}%
              </p>
            </div>
            <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
              <p className='text-richblack-300 text-sm'>Completed</p>
              <p className='text-blue-400 text-2xl font-bold'>
                {courses.filter(course => (course.progressPercentage || 0) === 100).length}
              </p>
            </div>
            <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
              <p className='text-richblack-300 text-sm'>In Progress</p>
              <p className='text-orange-400 text-2xl font-bold'>
                {courses.filter(course => {
                  const progress = course.progressPercentage || 0;
                  return progress > 0 && progress < 100;
                }).length}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className='bg-richblack-700 rounded-xl border border-richblack-600 p-6'>
            <div className='h-80 flex items-center justify-center'>
              {renderChart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProgressChart