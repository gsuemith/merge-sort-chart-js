import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rand = n => {
  const arr = []
  for(let i = 0; i < n; i++){
    arr.push([Math.ceil(Math.random()*n)])
  }
  return arr
}



const genData = (data, labels) => ({
  labels: labels,
  datasets: [
    {
      label: 'Scale',
      data: data,
      // backgroundColor: [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)',
      // ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)',
      // ],
      borderWidth: 1,
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  elements:{
    line:{
      // cubicInterpolationMode: 'monotone',
      // tension: .4
    }
  }
};

const App = () => {
  const [data, setData] = useState(genData());
  const [randomData, setRandomData] = useState(rand(20))

  useEffect(() => {
    const labels = randomData.map((datum, i) => `${i+1}`)
    
    setData(genData(randomData.flat(), labels))

    const interval = setInterval(() => {
      console.log(randomData)
      let merges = []
      for(let idx = 0; idx < randomData.length; idx+=2){
        let frst = randomData[idx]
        if (idx + 1 === randomData.length) {
          merges.push(frst)
          break
        }
        let scnd = randomData[idx+1]

        let i = 0
        let j = 0
        let merged = []
        while (i < frst.length || j < scnd.length){
          if (i < frst.length && 
            (j === scnd.length || frst[i] <= scnd[j])){
              merged.push(frst[i])
              i++
          } else {
              merged.push(scnd[j])
              j++
          }
        }
        merges.push(merged)
      }
      setRandomData(merges)
    }, 3000)
    
    if(randomData.length === 1){
      // break
      clearInterval(interval)
      
    }

    // const interval = setInterval(() => setData(genData(random_data, labels)), 5000);

    // return () => clearInterval(interval);
  }, [randomData]);

  return (
    <>
      <div className='header'>
        <h1 className='title'>App Bar Chart</h1>
        
          
        
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default App;