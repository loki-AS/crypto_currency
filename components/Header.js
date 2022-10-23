import React, { useEffect, useState } from 'react' 
import { AiOutlineDown } from 'react-icons/ai'
import { MdArrowUpward } from 'react-icons/md'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'
import { CryptoState } from '../contexts/CryptoContext'

const Header = () => {

  const[options, setOption] = useState(false)
  const [mounted, setMounted] = useState(false);

  const  { currency, setCurrency } = CryptoState()

  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme()

  const renderThemeChanger = () => {
    if(!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark'){
      return(
        <button 
        className='mt-2 px-3'
        onClick={() => setTheme('light')}
        >
        <BsFillSunFill size={25} className="text-yellow-400" />  
        </button> 
      )
    }else{
      return(
        <button 
        className='mt-2 px-3'
        onClick={() => setTheme('dark')}
        >
          <BsFillMoonFill size={25} />
        </button>
      )
    }
  }

  return (
    <header className='sticky top-0 grid grid-cols-2 z-50 bg-white dark:bg-[#0d1116] shadow-md py-5 px-5 md:px-10'>
      <div>
        <h1 className='text-bold font-poppins text-3xl'>Crypto</h1>
      </div>

      <div 
      className='relative flex justify-end text-left'
      >
      <div className='border-2 mr-6 rounded-full bg-gray-200 dark:border-0 dark:bg-black  transition transform duration-200 ease-out hover:scale-105'>
          {renderThemeChanger()}
      </div>

      <div className=''>
        <select 
        id="currency" 
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        className='mt-1 cursor-pointer border-2 p-1 font-poppins text-lg dark:bg-black dark:border-0'>
          <option value={"INR"} className='font-poppins'>INR</option>
          <option value={"USD"} className='font-poppins'>USD</option>
        </select>
      </div>

  </div>
    </header>
  )
}

export default Header