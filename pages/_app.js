import { ThemeProvider } from 'next-themes'
import CryptoContext from '../contexts/CryptoContext'
import '../styles/globals.css'
import 'react-alice-carousel/lib/alice-carousel.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
    <CryptoContext>
    <Component {...pageProps} />  
    </CryptoContext>  
    </ThemeProvider>
  )
}

export default MyApp
