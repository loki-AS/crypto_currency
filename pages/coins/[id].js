import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { CryptoState } from '../../contexts/CryptoContext'
import { SingleCoin } from '../../config/api'
import axios from 'axios'
import Image from 'next/image'
import Footer from '../../components/Footer'
import CoinInfo from '../../components/CoinInfo'
 
const Coin = () => {

  const [coin, setCoin] = useState()

  const router = useRouter()
  const { id } = router.query

  const { currency, symbol } = CryptoState();

  const fetchCoin = async() => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  return (
    <>
    <Header />
    <div className='grid gap-1 grid-cols-1 md:grid-cols-3 dark:bg-[#0d1116]'>
      <div className='grid  justify-center my-5 w-full'>
      <div>
      <div className="relative h-64 w-64">
        <Image
          layout='fill'
          objectFit='cover'
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        </div>
        <h1 className='grid justify-center text-gray-500 text-4xl tracking-[5px] uppercase'>{coin?.name}</h1>
        {/* <h3 className='w-52 mt-5 text-sm font-mono'>{parse(coins?.description.en.split(". ")[0])}</h3> */}
        <div>
           <h3 className='mt-5 flex justify-start text-xl text-center font-poppins'>Rank <span className='ml-3 justify-center font-poppins'>{coin?.market_cap_rank}</span></h3>
           <h3 className='mt-5 flex justify-start text-xl text-center font-poppins'>Current Price <span className='ml-3 justify-center font-poppins'>{symbol}{" "} {coin?.market_data.current_price[currency.toLowerCase()]}</span></h3>
           <h3 className='mt-5 flex justify-start text-xl text-center font-poppins'>Market Cap <span className='ml-3 justify-center font-poppins'>{symbol}{" "} {coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)}</span></h3>
        </div>
       
        </div>
      </div>
      <div className='grid col-span-2 mt-5'>
        <CoinInfo coin={coin} id={coin?.id} />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Coin