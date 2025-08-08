import React, { useState } from 'react'
import { Chart, registerables } from "chart.js";
import { Pie, Doughnut, Bar, Line, PolarArea } from "react-chartjs-2";

Chart.register(...registerables);

const Analysischart = ( { courses } ) => {
  
    const [currentChart , setcurrentChart] = useState("students")
    const [chartType, setChartType] = useState("pie")

    // Add safety check for courses data
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return (
        <div className='bg-richblack-800 p-6 rounded-lg'>
          <div className='text-center text-richblack-300 py-8'>
            No course data available for visualization
          </div>
        </div>
      );
    }

    // fucntion for generating random colors
    const getrandomcolor = (numcolor)=>{
        const colors = [];

        for( let  i =0  ; i<numcolor ; i++){
            const color = `rgb( ${Math.floor(Math.random()*256)} ,${Math.floor(Math.random()*256)} , ${Math.floor(Math.random()*256)} )`
            colors.push(color)
        }
        return colors;
    } 

    // Function to get chart-specific data structure
    const getChartData = (dataType) => {
        const isBarOrLine = chartType === "bar" || chartType === "line";
        
        return {
            labels: courses.map((course)=>course.courseNmae || course.courseName),
            datasets:[
                {
                    label: dataType === "students" ? "Students Enrolled" : "Revenue Generated (₹)",
                    data: courses.map((course)=> 
                        dataType === "students" 
                            ? course.totalstudentsEnrolled || 0
                            : course.totalAmountgenerated || 0
                    ),
                    backgroundColor: isBarOrLine 
                        ? 'rgba(255, 206, 84, 0.6)'
                        : getrandomcolor(courses.length),
                    borderColor: isBarOrLine 
                        ? 'rgba(255, 206, 84, 1)'
                        : getrandomcolor(courses.length),
                    borderWidth: 1,
                    tension: chartType === "line" ? 0.4 : 0
                }
            ]
        }
    } 




    // create options based on chart type
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: chartType === "bar" || chartType === "line" ? 'top' : 'bottom',
                labels: {
                    color: '#F1F2FF',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: `${currentChart === "students" ? "Students Enrolled" : "Revenue Generated"} - ${chartType.toUpperCase()} Chart`,
                color: '#F1F2FF',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: (chartType === "bar" || chartType === "line") ? {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#F1F2FF'
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
        } : {}
    }

    // Function to render the appropriate chart component
    const renderChart = () => {
        const data = getChartData(currentChart);
        
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
                return <Pie data={data} options={options} />;
        }
    }

  return (
    <div className='bg-richblack-800 rounded-2xl border border-richblack-700 shadow-lg overflow-hidden'>
      {/* Header */}
      <div className='p-6 bg-gradient-to-r from-richblack-700 to-richblack-800 border-b border-richblack-600'>
        <h2 className='text-2xl font-bold text-richblack-5 flex items-center mb-6'>
          <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
          Analytics Dashboard
        </h2>
        
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Data Type Selection */}
          <div className='flex-1'>
            <h3 className='text-richblack-200 text-sm font-medium mb-3'>Data Visualization:</h3>
            <div className='flex bg-richblack-700 rounded-lg p-1 border border-richblack-600'>
              <button 
                onClick={() => setcurrentChart("students")}
                className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  currentChart === "students" 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-richblack-600'
                }`}
              >
                👥 Students
              </button>
              <button 
                onClick={() => setcurrentChart("income")}
                className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  currentChart === "income" 
                    ? 'bg-caribbeangreen-200 text-white shadow-lg' 
                    : 'text-richblack-300 hover:text-white hover:bg-rickblack-100'
                }`}
              >
                💰 Revenue
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
        {courses && courses.length > 0 ? (
          <div className='space-y-6'>
            {/* Quick Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
                <p className='text-richblack-300 text-sm'>Total Courses</p>
                <p className='text-richblack-5 text-2xl font-bold'>{courses.length}</p>
              </div>
              <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
                <p className='text-richblack-300 text-sm'>Total Students</p>
                <p className='text-blue-400 text-2xl font-bold'>
                  {courses.reduce((total, course) => total + (course.totalstudentsEnrolled || 0), 0)}
                </p>
              </div>
              <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
                <p className='text-richblack-300 text-sm'>Total Revenue</p>
                <p className='text-green-400 text-2xl font-bold'>
                  ₹{courses.reduce((total, course) => total + (course.totalAmountgenerated || 0), 0)}
                </p>
              </div>
              <div className='bg-richblack-700 p-4 rounded-xl border border-richblack-600 text-center'>
                <p className='text-richblack-300 text-sm'>Avg Revenue</p>
                <p className='text-yellow-400 text-2xl font-bold'>
                  ₹{Math.round(courses.reduce((total, course) => total + (course.totalAmountgenerated || 0), 0) / courses.length) || 0}
                </p>
              </div>
            </div>

            {/* Chart Display */}
            <div className='bg-richblack-700 rounded-xl border border-richblack-600 p-6'>
              <div className='relative w-full h-96 flex items-center justify-center'>
                {renderChart()}
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-4xl'>📊</span>
            </div>
            <p className='text-richblack-5 text-xl font-semibold mb-2'>No data available</p>
            <p className='text-richblack-300'>Create courses to see analytics data</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analysischart