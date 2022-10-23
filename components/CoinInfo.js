import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../contexts/CryptoContext';
import { Line } from 'react-chartjs-2'
import { chartDays } from "../config/data";

const CoinInfo = ({ id }) => {

  const[historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setflag(true);
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className='flex justify-center  text-center w-full sm:w-[75%]'>
      {
        !historicalData ? (
          <CircularProgress
          style={{ color: "gold" }}
          size={250}
          thickness={1}        
          />
        ):(
          <>
          <Line 
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],         
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
          />
        <div>
        {chartDays.map((day) => (
                <button
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </button>
              ))}        
        </div>
          </>
        )
      }
    </div>
  )
}

export default CoinInfo