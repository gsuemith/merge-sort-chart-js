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
  const [indices, setIndices] = useState({idx:0,i:0,j:0})
  const [merging, setMerging] = useState([])
  const [mergers, setMergers] = useState([])


  
  useEffect(() => {
    setRandomData(rand(20))
  }, []);

  useEffect(() => {
    if (randomData.length === 1){
      return
    }
    const { idx, i, j } = indices

    if (idx >= randomData.length)
      return

    let frst = randomData[idx]
    let scnd = idx+1 === randomData.length ? [] : randomData[idx+1]
    console.log(mergers, merging, frst, scnd, randomData)
    let data = mergers.flat()
                .concat(merging)
                .concat(frst.slice(i))
                .concat(scnd.slice(j))
                .concat(randomData.slice(idx+2).flat())
    let labels =  data.map((datum, i) => `${i+1}-[${datum}]`)

    setData(genData(data, labels))  
  }, [indices, randomData])

  const mergeSort = () => {
    let { idx, i, j } = indices
    
    if (idx >= randomData.length) {
      setIndices({idx:0,i:0,j:0})
      setRandomData(mergers)
      setMergers([])
      // clearInterval(interval)
      return
    }

    let frst = randomData[idx]
    if (idx + 1 === randomData.length){
      i = frst.length
      setIndices({ idx: idx+2, i:0, j:0})
      setMergers([...mergers, frst])
      return
    }
    let scnd = randomData[idx+1] || []

    if (i < frst.length || j < scnd.length) {
      if (i < frst.length && 
        (j === scnd.length || frst[i] <= scnd[j])){
          setMerging([...merging, frst[i]]);
          setIndices({...indices, i: i+1})
      } else {
          setMerging([...merging, scnd[j]])
          setIndices({...indices, j: j+1})
      }
    } else {
        setIndices({ idx: idx+2, i:0, j:0})
        setMergers([...mergers, merging])
        setMerging([])
    }
  }

  useEffect(() => {
    setTimeout(() => mergeSort(), 3000);
  }, [indices])  

  return (
    <>
      <div className='header'>
        <h1 className='title' onClick={e => mergeSort()}>
          App Bar Chart 
          <span> {indices.idx}</span>
          <span> {indices.i}</span>
          <span> {indices.j}</span>
          <span> [{mergers.map((n, i) => <span key={i}>{n},</span>)}]</span>
          <span> [{merging.map((n, i) => <span key={i}>{n},</span>)}]</span>
        </h1>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default App;