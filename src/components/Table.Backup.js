import React, { useEffect, useState } from "react";
import {
  popularStocks,
  optionsYahoo,
  urlYahoo,
  specilStocksOptions,
  urlDayLosers,
  urlDayGainers,
  urlTechGrowth,
  urlUndervaluedLargeCap,
  urlUndervaluedGrowth,
  popularStocksDescription,
} from "../utils/fetchOptions";
import { formatDataList, formatDataDayMovers } from "../utils/formatData";
import styled from "styled-components";
import Row from "./Row";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SortButtons } from "./SortButtons";
import Spinner from "./Spinner";

export default function Table({ type, list }) {
  const [tableStocks, setTableStocks] = useState([]);
  const [isLoading, setIsloading] = useState();
  const [sortedBy, setSortedBy] = useState();
  const [description, setDescription] = useState("");
  const [initialOrder, setInitialOrder] = useState([]);
  const formatedData = [
    {
      symbol: "AAPL",
      regularMarketPrice: 160.24,
      fiftyTwoWeekHigh: 165.7,
      fiftyTwoWeekLow: 116.21,
      shortName: "Apple",
      marketCap: "2.629 T",
      marketCaptoSort: 2628961697792,
      regularMarketChangePercent: "2.19",
      priceRelativeToYear: 8.064102564102598,
    },
    {
      symbol: "MSFT",
      regularMarketPrice: 336.63,
      fiftyTwoWeekHigh: 349.67,
      fiftyTwoWeekLow: 209.11,
      shortName: "Microsoft",
      marketCap: "2.527 T",
      marketCaptoSort: 2527411306496,
      regularMarketChangePercent: "2.11",
      priceRelativeToYear: 9.779141104294462,
    },
    {
      symbol: "BKNG",
      regularMarketPrice: 2182.01,
      fiftyTwoWeekHigh: 2687.29,
      fiftyTwoWeekLow: 1860.73,
      shortName: "Booking",
      marketCap: "89.59 B",
      marketCaptoSort: 89592897536,
      regularMarketChangePercent: "1.23",
      priceRelativeToYear: 0.6358454718176068,
    },
    {
      symbol: "GOOG",
      regularMarketPrice: 2922.28,
      fiftyTwoWeekHigh: 3037,
      fiftyTwoWeekLow: 1699,
      shortName: "Alphabet",
      marketCap: "1.935 T",
      marketCaptoSort: 1935291711488,
      regularMarketChangePercent: "2.32",
      priceRelativeToYear: 10.663179916318011,
    },
    {
      symbol: "AMZN",
      regularMarketPrice: 3561.57,
      fiftyTwoWeekHigh: 3773.08,
      fiftyTwoWeekLow: 2881,
      shortName: "Amazon",
      marketCap: "1.806 T",
      marketCaptoSort: 1806243201024,
      regularMarketChangePercent: "1.63",
      priceRelativeToYear: 3.217672923266044,
    },
    {
      symbol: "FB",
      regularMarketPrice: 338.03,
      fiftyTwoWeekHigh: 384.33,
      fiftyTwoWeekLow: 244.61,
      shortName: "Meta",
      marketCap: "940.32 B",
      marketCaptoSort: 940318326784,
      regularMarketChangePercent: "1.47",
      priceRelativeToYear: 2.017710583153346,
    },
    {
      symbol: "BRK-B",
      regularMarketPrice: 282.12,
      fiftyTwoWeekHigh: 295.65,
      fiftyTwoWeekLow: 221.26,
      shortName: "Berkshire",
      marketCap: "631.55 B",
      marketCaptoSort: 631550967808,
      regularMarketChangePercent: "-0.34",
      priceRelativeToYear: 4.498152254249825,
    },
    {
      symbol: "TSLA",
      regularMarketPrice: 1136.99,
      fiftyTwoWeekHigh: 1243.49,
      fiftyTwoWeekLow: 539.49,
      shortName: "Tesla",
      marketCap: "1.142 T",
      marketCaptoSort: 1141833465856,
      regularMarketChangePercent: "5.09",
      priceRelativeToYear: 5.610328638497653,
    },
    {
      symbol: "NVDA",
      regularMarketPrice: 333.76,
      fiftyTwoWeekHigh: 346.47,
      fiftyTwoWeekLow: 115.665,
      shortName: "Nvidia",
      marketCap: "831.73 B",
      marketCaptoSort: 831729958912,
      regularMarketChangePercent: "5.95",
      priceRelativeToYear: 17.15932336742717,
    },
    {
      symbol: "V",
      regularMarketPrice: 196.29,
      fiftyTwoWeekHigh: 252.67,
      fiftyTwoWeekLow: 192.55,
      shortName: "Visa",
      marketCap: "427.15 B",
      marketCaptoSort: 427150606336,
      regularMarketChangePercent: "-0.69",
      priceRelativeToYear: 0.06633557999290494,
    },
    {
      symbol: "BABA",
      regularMarketPrice: 131.61,
      fiftyTwoWeekHigh: 274.29,
      fiftyTwoWeekLow: 130.55,
      shortName: "Alibaba",
      marketCap: "356.78 B",
      marketCaptoSort: 356782866432,
      regularMarketChangePercent: "-1.30",
      priceRelativeToYear: 0.00742921222315673,
    },
    {
      symbol: "JNJ",
      regularMarketPrice: 159.75,
      fiftyTwoWeekHigh: 179.92,
      fiftyTwoWeekLow: 145.86,
      shortName: "Johnson",
      marketCap: "420.56 B",
      marketCaptoSort: 420557848576,
      regularMarketChangePercent: "0.35",
      priceRelativeToYear: 0.688646504709965,
    },
    {
      symbol: "WMT",
      regularMarketPrice: 142.63,
      fiftyTwoWeekHigh: 153.66,
      fiftyTwoWeekLow: 126.28,
      shortName: "Walmart",
      marketCap: "397.72 B",
      marketCaptoSort: 397723762688,
      regularMarketChangePercent: "-1.57",
      priceRelativeToYear: 1.4823209428830455,
    },
    {
      symbol: "MA",
      regularMarketPrice: 323.01,
      fiftyTwoWeekHigh: 401.5,
      fiftyTwoWeekLow: 312.38,
      shortName: "Mastercard",
      marketCap: "317.38 B",
      marketCaptoSort: 317375741952,
      regularMarketChangePercent: "-0.36",
      priceRelativeToYear: 0.13543126512931578,
    },
    {
      symbol: "NSRGY",
      regularMarketPrice: 130.32,
      fiftyTwoWeekHigh: 135.48,
      fiftyTwoWeekLow: 104.5,
      shortName: "Nestle",
      marketCap: "358.44 B",
      marketCaptoSort: 358439944192,
      regularMarketChangePercent: "-0.07",
      priceRelativeToYear: 5.00387596899225,
    },
    {
      symbol: "DIS",
      regularMarketPrice: 147.81,
      fiftyTwoWeekHigh: 203.02,
      fiftyTwoWeekLow: 144.25,
      shortName: "Disney",
      marketCap: "268.67 B",
      marketCaptoSort: 268668321792,
      regularMarketChangePercent: "-0.20",
      priceRelativeToYear: 0.06448107226951642,
    },
    {
      symbol: "ADBE",
      regularMarketPrice: 687.49,
      fiftyTwoWeekHigh: 699.54,
      fiftyTwoWeekLow: 420.78,
      shortName: "Adobe",
      marketCap: "327.11 B",
      marketCaptoSort: 327107739648,
      regularMarketChangePercent: "3.83",
      priceRelativeToYear: 22.13360995850631,
    },
    {
      symbol: "PYPL",
      regularMarketPrice: 187.24,
      fiftyTwoWeekHigh: 310.16,
      fiftyTwoWeekLow: 182.43,
      shortName: "Paypal",
      marketCap: "219.99 B",
      marketCaptoSort: 219993915392,
      regularMarketChangePercent: "-0.29",
      priceRelativeToYear: 0.039131142206313065,
    },
    {
      symbol: "NFLX",
      regularMarketPrice: 663.84,
      fiftyTwoWeekHigh: 700.99,
      fiftyTwoWeekLow: 478.54,
      shortName: "Netflix",
      marketCap: "294.05 B",
      marketCaptoSort: 294049251328,
      regularMarketChangePercent: "-0.27",
      priceRelativeToYear: 4.987886944818308,
    },
    {
      symbol: "NKE",
      regularMarketPrice: 169.87,
      fiftyTwoWeekHigh: 179.1,
      fiftyTwoWeekLow: 125.44,
      shortName: "Nike",
      marketCap: "268.87 B",
      marketCaptoSort: 268873613312,
      regularMarketChangePercent: "1.10",
      priceRelativeToYear: 4.813651137594806,
    },
    {
      symbol: "CSCO",
      regularMarketPrice: 55.76,
      fiftyTwoWeekHigh: 60.27,
      fiftyTwoWeekLow: 43.01,
      shortName: "Cisco",
      marketCap: "235.17 B",
      marketCaptoSort: 235173920768,
      regularMarketChangePercent: "1.99",
      priceRelativeToYear: 2.827050997782702,
    },
    {
      symbol: "KO",
      regularMarketPrice: 54.58,
      fiftyTwoWeekHigh: 57.56,
      fiftyTwoWeekLow: 48.11,
      shortName: "Coca-cola",
      marketCap: "235.75 B",
      marketCaptoSort: 235753947136,
      regularMarketChangePercent: "1.58",
      priceRelativeToYear: 2.1711409395973122,
    },
    {
      symbol: "PEP",
      regularMarketPrice: 164.14,
      fiftyTwoWeekHigh: 166.8,
      fiftyTwoWeekLow: 128.32,
      shortName: "Pepsico",
      marketCap: "226.95 B",
      marketCaptoSort: 226948169728,
      regularMarketChangePercent: "1.86",
      priceRelativeToYear: 13.466165413533705,
    },
    {
      symbol: "INTC",
      regularMarketPrice: 50,
      fiftyTwoWeekHigh: 68.49,
      fiftyTwoWeekLow: 45.24,
      shortName: "Intel",
      marketCap: "203.35 B",
      marketCaptoSort: 203349999616,
      regularMarketChangePercent: "2.50",
      priceRelativeToYear: 0.25743645213628985,
    },
    {
      symbol: "RYDAF",
      regularMarketPrice: 21.48,
      fiftyTwoWeekHigh: 25,
      fiftyTwoWeekLow: 17.16,
      shortName: "Shell",
      marketCap: "164.17 B",
      marketCaptoSort: 164166270976,
      regularMarketChangePercent: "5.45",
      priceRelativeToYear: 1.2272727272727275,
    },
    {
      symbol: "SHOP",
      regularMarketPrice: 1567.02,
      fiftyTwoWeekHigh: 1762.918,
      fiftyTwoWeekLow: 1005.14,
      shortName: "Shopify",
      marketCap: "197.47 B",
      marketCaptoSort: 197469601792,
      regularMarketChangePercent: "-0.61",
      priceRelativeToYear: 2.8682273428008465,
    },
    {
      symbol: "MCD",
      regularMarketPrice: 250.3,
      fiftyTwoWeekHigh: 257.79,
      fiftyTwoWeekLow: 202.73,
      shortName: "Mcdonald's",
      marketCap: "187.04 B",
      marketCaptoSort: 187035418624,
      regularMarketChangePercent: "0.12",
      priceRelativeToYear: 6.351134846461944,
    },
    {
      symbol: "TMUS",
      regularMarketPrice: 113.4,
      fiftyTwoWeekHigh: 150.2,
      fiftyTwoWeekLow: 110.345,
      shortName: "T-mobile",
      marketCap: "141.64 B",
      marketCaptoSort: 141642268672,
      regularMarketChangePercent: "-0.11",
      priceRelativeToYear: 0.08301630434782631,
    },
    {
      symbol: "AMD",
      regularMarketPrice: 161.91,
      fiftyTwoWeekHigh: 162.505,
      fiftyTwoWeekLow: 72.5,
      shortName: "AMD",
      marketCap: "195.52 B",
      marketCaptoSort: 195524132864,
      regularMarketChangePercent: "4.59",
      priceRelativeToYear: 150.2689075630255,
    },
    {
      symbol: "SONY",
      regularMarketPrice: 121.44,
      fiftyTwoWeekHigh: 125.76,
      fiftyTwoWeekLow: 91.75,
      shortName: "Sony",
      marketCap: "150.62 B",
      marketCaptoSort: 150617178112,
      regularMarketChangePercent: "0.14",
      priceRelativeToYear: 6.872685185185173,
    },
    {
      symbol: "SBUX",
      regularMarketPrice: 110.73,
      fiftyTwoWeekHigh: 126.32,
      fiftyTwoWeekLow: 95.92,
      shortName: "Starbucks",
      marketCap: "129.91 B",
      marketCaptoSort: 129908441088,
      regularMarketChangePercent: "0.06",
      priceRelativeToYear: 0.9499679281590772,
    },
    {
      symbol: "IBM",
      regularMarketPrice: 118.5,
      fiftyTwoWeekHigh: 146.11855,
      fiftyTwoWeekLow: 112.19885,
      shortName: "IBM",
      marketCap: "106.21 B",
      marketCaptoSort: 106213916672,
      regularMarketChangePercent: "2.32",
      priceRelativeToYear: 0.2281491968260465,
    },
    {
      symbol: "OGZPY",
      regularMarketPrice: 9.035,
      fiftyTwoWeekHigh: 10.72,
      fiftyTwoWeekLow: 4.81,
      shortName: "Gazprom",
      marketCap: "108.31 B",
      marketCaptoSort: 108307963904,
      regularMarketChangePercent: "4.81",
      priceRelativeToYear: 2.5074183976261124,
    },
    {
      symbol: "SBRCY",
      regularMarketPrice: 16.94,
      fiftyTwoWeekHigh: 21.63,
      fiftyTwoWeekLow: 13.62,
      shortName: "Sberbank",
      marketCap: "92.09 B",
      marketCaptoSort: 92090245120,
      regularMarketChangePercent: "5.12",
      priceRelativeToYear: 0.7078891257995743,
    },
    {
      symbol: "ABNB",
      regularMarketPrice: 180.08,
      fiftyTwoWeekHigh: 219.94,
      fiftyTwoWeekLow: 121.5,
      shortName: "Airbnb",
      marketCap: "114.42 B",
      marketCaptoSort: 114420850688,
      regularMarketChangePercent: "3.58",
      priceRelativeToYear: 1.4696437531359767,
    },
    {
      symbol: "UBER",
      regularMarketPrice: 39.7,
      fiftyTwoWeekHigh: 64.05,
      fiftyTwoWeekLow: 38.08,
      shortName: "Uber",
      marketCap: "77.02 B",
      marketCaptoSort: 77022765056,
      regularMarketChangePercent: "-2.02",
      priceRelativeToYear: 0.06652977412731026,
    },
    {
      symbol: "DELL",
      regularMarketPrice: 57.57,
      fiftyTwoWeekHigh: 58.286873,
      fiftyTwoWeekLow: 35.002533,
      shortName: "Dell",
      marketCap: "44.05 B",
      marketCaptoSort: 44047728640,
      regularMarketChangePercent: "2.47",
      priceRelativeToYear: 31.48042540310489,
    },
    {
      symbol: "ZM",
      regularMarketPrice: 218.98,
      fiftyTwoWeekHigh: 451.77,
      fiftyTwoWeekLow: 195.8,
      shortName: "Zoom",
      marketCap: "65.25 B",
      marketCaptoSort: 65254944768,
      regularMarketChangePercent: "-0.56",
      priceRelativeToYear: 0.09957472400017174,
    },
    {
      symbol: "TWTR",
      regularMarketPrice: 45.78,
      fiftyTwoWeekHigh: 80.75,
      fiftyTwoWeekLow: 44.4,
      shortName: "Twitter",
      marketCap: "36.61 B",
      marketCaptoSort: 36606144512,
      regularMarketChangePercent: "-2.74",
      priceRelativeToYear: 0.03946239633971983,
    },
    {
      symbol: "ADDDF",
      regularMarketPrice: 290.3,
      fiftyTwoWeekHigh: 406.19,
      fiftyTwoWeekLow: 279.31,
      shortName: "Adidas",
      marketCap: "56.63 B",
      marketCaptoSort: 56627658752,
      regularMarketChangePercent: "0.87",
      priceRelativeToYear: 0.09483130554836491,
    },
    {
      symbol: "HMC",
      regularMarketPrice: 27.59,
      fiftyTwoWeekHigh: 33.42,
      fiftyTwoWeekLow: 26.33,
      shortName: "Honda",
      marketCap: "47.44 B",
      marketCaptoSort: 47437967360,
      regularMarketChangePercent: "-1.39",
      priceRelativeToYear: 0.21612349914236725,
    },
    {
      symbol: "SPOT",
      regularMarketPrice: 246.6,
      fiftyTwoWeekHigh: 387.44,
      fiftyTwoWeekLow: 201.678,
      shortName: "Spotify",
      marketCap: "47.24 B",
      marketCaptoSort: 47237218304,
      regularMarketChangePercent: "-1.71",
      priceRelativeToYear: 0.31895768247656914,
    },
    {
      symbol: "HPQ",
      regularMarketPrice: 35.93,
      fiftyTwoWeekHigh: 36.21,
      fiftyTwoWeekLow: 22.08,
      shortName: "HP",
      marketCap: "41.41 B",
      marketCaptoSort: 41410039808,
      regularMarketChangePercent: "3.90",
      priceRelativeToYear: 49.464285714285516,
    },
    {
      symbol: "MDB",
      regularMarketPrice: 525.98,
      fiftyTwoWeekHigh: 590,
      fiftyTwoWeekLow: 238.01,
      shortName: "MongoDB",
      marketCap: "34.81 B",
      marketCaptoSort: 34808356864,
      regularMarketChangePercent: "1.42",
      priceRelativeToYear: 4.498125585754454,
    },
    {
      symbol: "U",
      regularMarketPrice: 170.33,
      fiftyTwoWeekHigh: 210,
      fiftyTwoWeekLow: 76,
      shortName: "Unity",
      marketCap: "48.72 B",
      marketCaptoSort: 48716255232,
      regularMarketChangePercent: "-5.31",
      priceRelativeToYear: 2.3778674061003287,
    },
    {
      symbol: "EA",
      regularMarketPrice: 124.88,
      fiftyTwoWeekHigh: 150.3,
      fiftyTwoWeekLow: 123.07,
      shortName: "EA",
      marketCap: "35.32 B",
      marketCaptoSort: 35317063680,
      regularMarketChangePercent: "-0.87",
      priceRelativeToYear: 0.07120377655389462,
    },
    {
      symbol: "YNDX",
      regularMarketPrice: 72,
      fiftyTwoWeekHigh: 87.11,
      fiftyTwoWeekLow: 58.91,
      shortName: "Yandex",
      marketCap: "25.82 B",
      marketCaptoSort: 25816967168,
      regularMarketChangePercent: "2.21",
      priceRelativeToYear: 0.8663136995367309,
    },
    {
      symbol: "CAJ",
      regularMarketPrice: 21.95,
      fiftyTwoWeekHigh: 25.94,
      fiftyTwoWeekLow: 17.98,
      shortName: "Canon",
      marketCap: "23.01 B",
      marketCaptoSort: 23009087488,
      regularMarketChangePercent: "-2.27",
      priceRelativeToYear: 0.9949874686716784,
    },
    {
      symbol: "PINS",
      regularMarketPrice: 40.54,
      fiftyTwoWeekHigh: 89.9,
      fiftyTwoWeekLow: 40.47,
      shortName: "Pinterest",
      marketCap: "26.44 B",
      marketCaptoSort: 26440026112,
      regularMarketChangePercent: "-5.28",
      priceRelativeToYear: 0.001418152350081043,
    },
    {
      symbol: "SNAP",
      regularMarketPrice: 48.85,
      fiftyTwoWeekHigh: 83.34,
      fiftyTwoWeekLow: 43.38,
      shortName: "Snap",
      marketCap: "78.64 B",
      marketCaptoSort: 78638727168,
      regularMarketChangePercent: "-1.83",
      priceRelativeToYear: 0.1585966946941142,
    },
  ];
  const specilaStocks = {
    techGrowth: urlTechGrowth,
    undervaluedLargeCap: urlUndervaluedLargeCap,
    dayGainers: urlDayGainers,
    dayLosers: urlDayLosers,
    undervaluedGrowth: urlUndervaluedGrowth,
  };
  // let formatedData;

  const fetchData = async () => {
    setIsloading(true);

    // if (list) {
    //   try {
    //     const res = await axios.get(urlYahoo, optionsYahoo(list));
    //     formatedData = formatDataList(res);
    //     if (list === popularStocks) {
    //       setDescription(popularStocksDescription);
    //     }
    //   } catch (err) {
    //     alert(err);

    //     console.log(err);
    //   }
    // }
    // if (type) {
    //   try {
    //     const res = await axios.get(specilaStocks[type], specilStocksOptions);
    //     formatedData = formatDataDayMovers(res);
    //     setDescription(res.data.description.replace(".", ""));
    //   } catch (err) {
    //     alert(err);
    //     console.log(err);
    //   }
    // }
    // console.log(formatedData);

    setTableStocks(formatedData);
    setInitialOrder(formatedData);
    setIsloading(false);
  };

  const sort = (type, order) => {
    if (type + order === sortedBy) {
      setTableStocks(initialOrder);
      setSortedBy("");
      return;
    }

    let sorted;
    switch (type) {
      case "name":
        sorted = [...tableStocks].sort((a, b) =>
          a.shortName > b.shortName ? 1 : -1
        );
        break;
      case "cap":
        sorted = [...tableStocks].sort(
          (a, b) => b.marketCaptoSort - a.marketCaptoSort
        );
        break;
      case "price":
        sorted = [...tableStocks].sort(
          (a, b) => b.regularMarketPrice - a.regularMarketPrice
        );
        break;
      case "todayChange":
        sorted = [...tableStocks].sort(
          (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
        );
        break;
      case "yearRange":
        sorted = [...tableStocks].sort(
          (a, b) => b.priceRelativeToYear - a.priceRelativeToYear
        );
        break;
      default:
        break;
    }
    if (order === "Asc") {
      sorted.reverse();
    }
    setTableStocks(sorted);

    setSortedBy(type + order);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, list]);
  return isLoading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <h1 className='description'>{description}</h1>
      <div className='header-table'>
        <div className='rank'>Rank</div>
        <div className='name_logo'>
          <SortButtons type='name' currentSort={sortedBy} sort={sort} />
          Name
        </div>
        <div className='market-cap'>
          <SortButtons type='cap' currentSort={sortedBy} sort={sort} />
          Market Cap
        </div>
        <div className='price'>
          <SortButtons type='price' currentSort={sortedBy} sort={sort} />
          Price
        </div>
        <div className='day-change'>
          <SortButtons type='todayChange' currentSort={sortedBy} sort={sort} />
          Today
        </div>
        <div className='price-slider'>
          <SortButtons type='yearRange' currentSort={sortedBy} sort={sort} />
          52 weeks range
        </div>
      </div>
      <div className='rows'>
        {tableStocks?.map((company, i) => {
          return <Row {...company} rank={i + 1} key={uuidv4()}></Row>;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .description {
    text-align: center;
    margin: 3rem 0 2rem;
    font-size: 2.5rem;
    font-family: "Cabin";
    letter-spacing: 1px;
  }
  .rows {
    font-family: var(--ff-primary);
    font-size: 2rem;
    display: grid;
    grid-template-columns: 85%;
    grid-auto-rows: min-content;
    justify-content: center;
    gap: 2px;
    background-color: transparent;
  }

  .header-table {
    width: 85%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    margin: 10px auto 2px;
    justify-content: space-around;
    background-color: var(--clr-primary);
    font-size: 1.8rem;
    font-family: var(--ff-primary);
    letter-spacing: 1px;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    line-height: 6.5rem;
    text-transform: capitalize;

    .rank {
      margin-left: 0.5rem;
    }
    .name_logo {
      width: 18rem;
      margin-left: -3rem;
      margin-right: 3rem;
    }

    .market-cap {
      width: 13rem;
      text-align: right;
      margin-left: 0rem;
    }
    .price {
      width: 8.2rem;
    }
    .day-change {
      width: 7.5rem;
    }
    .price-slider {
      font-size: 1.6rem;
      width: 20rem;
      margin-right: 4.5rem;
    }

    .sort_icons {
      display: inline-block;
      cursor: pointer;
      position: relative;
      top: 0.7rem;
      right: 5px;
      /* cursor: pointer; */

      svg {
        display: block;
        font-size: 1.8rem;
        &:first-of-type {
          margin-bottom: -0.8rem;
        }
        /* position: absolute; */
        /* z-index: 100000; */
        /* left: 25%; */
      }
    }
  }
`;