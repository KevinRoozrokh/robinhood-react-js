import React, { useState, useEffect } from "react";
import "./Stats.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AdbIcon from '@material-ui/icons/Adb';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import AddIcon from '@material-ui/icons/Add';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import StatsRow from "./StatsRow";
import { key } from "./api";
import axios from "axios";
import { db } from "./firebase";
import firebase from "./firebase";
import ShowChartIcon from '@material-ui/icons/ShowChart';

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;


const testData = []; 

function Stats() {
  const [stocksData, setStocksData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const getMyStocks = () => {
    db
    .collection('myStocks')
    .onSnapshot(snapshot => {
        let promises = [];
        let tempData = []
        snapshot.docs.map((doc) => {
          promises.push(getStocksData(doc.data().ticker)
          .then(res => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data
            })
          })
        )})
        Promise.all(promises).then(()=>{
          setMyStocks(tempData);
        })
    })
  }

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}${KEY_URL}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  useEffect(() => {
    const stocksList = [ "AMZN", "SPY", "COIN", "INTC", "NVDA", "AMD"];

    getMyStocks();
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock)
        .then((res) => {
          testData.push({
            name: stock,
            ...res.data
          });
        })
      )
    });

    Promise.all(promises).then(()=>{
      console.log(testData);
      setStocksData(testData);
    })
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
        <ShowChartIcon /><h3>My Stocks</h3>
          <AddIcon />
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__lists">
        <EmojiObjectsIcon />&nbsp;&nbsp;<p>Stonks</p><MoreHorizIcon /><ExpandLessIcon />
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stocksData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}

</div>
          <div className="stats__header stats__lists">
          <FlashOnIcon /><p>My First List</p><ExpandMoreIcon />
        </div>
        <div className="stats__content"></div>

        </div>
        <div className="stats__header stats__lists">
          <AdbIcon /><p>Cryptos to Watch</p><ExpandMoreIcon />
        </div>
          </div>
        </div>
      
    
  );
}

export default Stats;