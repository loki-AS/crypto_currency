import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { CryptoState } from "../contexts/CryptoContext";
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import Image from 'next/image';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SmallCard = () => {
  const [trending, setTrending] = useState([])
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async() => {
    const { data } = await axios.get(TrendingCoins(currency))

    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const items = trending.map((coin) => {

    let profit = coin?.price_change_percentage_24h >= 0;

    return(
      <div key={coin.name}>
      <div className='relative h-20 w-20 flex justify-center text-center'>
      <Image
      layout='fill'
      objectFit='cover'
      src={coin?.image}
      alt={coin.name}
      // className="h-20 w-20 flex text-center justify-center"
    />          
      </div>
     <span className='flex text-right'>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>  
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
    </div>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  

  return (
    <div className='mt-5 pb-10'>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      />
    </div>
  )
}

export default SmallCard