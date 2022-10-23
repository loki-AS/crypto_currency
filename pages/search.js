import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { GoSearch } from 'react-icons/go'
import { CryptoState } from '../contexts/CryptoContext'
import { LinearProgress } from '@mui/material'
import axios from 'axios'
import { CoinList } from '../config/api'
import Image from 'next/image'
import Logo from '../public/coin.png'
import { useRouter } from 'next/router'

const search = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter()

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=0&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Header />
    <div className='h-full py-10 dark:bg-[#0d1116]'>
    <div className='flex items-center justify-center rounded-full mx-14'> 
        <input 
        type="text" 
        placeholder='Start your search' 
        onChange={handleChange}
        className='placeholder-gray-400  pl-5 bg-transparent outline-none'
        // value={searchInput}
        />
        <GoSearch 
        className='h-8 bg-red-400 text-white rounded-full w-8 p-2' />
        </div>
        <div className='h-1 w-full bg-gray-500 mt-10' />
        {!search ? (
          <div>
          <LinearProgress style={{ backgroundColor: "gold" }} />
          <h1 className='flex justify-center text-center mt-10 text-5xl font-mono tracking-[3px] text-gray-500'>Search for Crypto</h1>
          <div className='relative'>
            <Image 
            src={Logo}
            alt="hand"
            />
          </div>
          </div>
        ): (
          <>
      {filteredCoins.map(coin => {

      let profit = coin?.price_change_percentage_24h >= 0;

        return (
          <div
          onClick={() => router.push(`/coins/${coin.id}`)} 
          key={coin.id} 
          className="flex justify-center text-center  ">
            <div className='mt-5 flex space-x-4 border rounded-xl cursor-pointer hover:scale-110 transition duration-100 ease-out h-48 w-[420px] dark:hover:bg-[#0d1116]'>
              <div className='relative h-40 w-40 m-3'>
              <Image
                layout='fill'
                objectFit='cover'
                src={coin?.image}
                alt={coin.name}
              />
              </div>
              <div className='m-10'>
                <h1 className='text-2xl uppercase tracking-[2px]'>{coin?.name}</h1>
                <h4
                className='py-1'
                style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
                }}
                >
                {profit && "+"}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
                </h4>
                <h4 className='py-1 text-xl'>{symbol}{" "}{coin?.current_price.toFixed(2)}</h4>
              </div>
            </div>
          </div>
        );
      })}
          </>
        )}
    </div>
    <Footer />
    </>
  )
}

export default search