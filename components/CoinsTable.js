import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from "../contexts/CryptoContext";
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoSearch } from 'react-icons/go';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { currency, symbol } = CryptoState();

    const router = useRouter()

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
    
        setCoins(data);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchCoins();
      }, [currency]);

      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

  return (
    <>
    <Container style={{ textAlign: "center" }}>
    <div className="relative flex w-full flex-wrap items-stretch mb-3">
  <input 
  type="text" 
  placeholder="Search For a Crypto Currency.." 
  className="px-3 py-3 placeholder-slate-300 font-poppins dark:placeholder-gray-500 text-slate-600 relative bg-transparent rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
  onChange={(e) => setSearch(e.target.value)}
  />
  <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 dark:text-gray-500 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
    <GoSearch className="cursor-pointer" />
  </span>
</div>
    <TableContainer component={Paper}>
    {loading ? (
      <LinearProgress style={{ backgroundColor: "gold" }} />
    ) : (
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "#EEBC1D" }}>
          <TableRow>
            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
              <TableCell
                style={{
                  color: "black",
                  fontWeight: "700",
                }}
                className="font-poppins"
                key={head}
                align={head === "Coin" ? "" : "right"}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className="dark:bg-[#0d1116] bg-gray-100 ">
          {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10)
          .map((row) => {
              const profit = row.price_change_percentage_24h > 0;
              return (
                <TableRow
                  key={row.name}
                  className="cursor-pointer hover:bg-gray-300 dark:hover:bg-[#040404]"
                  onClick={() => router.push(`/coins/${row.id}`)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      display: "flex",
                      gap: 15,
                    }}
                  >
                  <div className='relative h-14 w-14'>
                    <Image
                      layout="fill"
                      objectFit='cover'
                      src={row?.image}
                      alt={row.name}
                      height="50"
                      style={{ marginBottom: 10 }}
                    />                    
                  </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span
                        style={{
                          textTransform: "uppercase",
                          fontSize: 22,
                        }}
                        className="dark:text-white"
                      >
                        {row.symbol}
                      </span>
                      <span style={{ color: "darkgrey" }}>
                        {row.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="right" className="dark:text-white">
                    {symbol}{" "}
                    {numberWithCommas(row.current_price.toFixed(2))}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {profit && "+"}
                    {row.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell align="right" className="dark:text-white">
                    {symbol}{" "}
                    {numberWithCommas(
                      row.market_cap.toString().slice(0, -6)
                    )}
                    M
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    )}
  </TableContainer>
  </Container>
  <Pagination 
  count={(coins?.length/10).toFixed(0)}
  color="secondary"
  className="p-10 flex text-center justify-center w-full"
  onChange={(_, value) => {
    setPage(value);
    window.scroll(0, 350);
  }}
  />

  </>
  )
}

export default CoinsTable