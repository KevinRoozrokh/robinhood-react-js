import React, { useState, useEffect } from "react";
import "./Newsfeed.css";
import Article from "./Article";
import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import LineGraph from "./LineGraph";
import Chip from '@material-ui/core/Chip';
import TimeLine from './TimeLine'


function Newsfeed() {
  const [popularTopics, setTopics] = useState([
    "Technology",
    "Finance",
    "Upcoming Earnings",
    "Crypto",
    "Cannabis",
    "ETFs",
    "Index ETFs",
    "Technology",
    "AltCoins",
    "Pharma",
  ]);

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="newsfeed">
      <div className="newsfeed__container">
        <div className="newsfeed__chart__section">
          <div className="newsfeed_price_asset">

            <h1>$2,397,224.70</h1>
            
          </div>
          <div className="newsfeed__change__section">
          <p> -$56,095.05 (-2.34%) Today </p>
</div>
          <div className="newsfeed__chart">
            <LineGraph />
            <TimeLine />
          </div>
        </div>
        <div className="newsfeed__buying__section">
          <h2> Buying Power</h2>
          <h2> $12,234,857.07</h2>
        </div>
        
          <div className="newsfeed__link__box">
          <a href="https://kevinroozrokh.github.io/" target="blank" rel="noreferrer"><p>Robinhood App Clone v1.00</p><br></br></a>
            <h2>This Robinhood App Clone challenge was coded in JavaScript by Kevin Roozrokh. Click here to go back to https://kevinroozrokh.github.io/
                          </h2>
          </div>
        
        <div className="newsfeed__market__section">
          <div className="newsfeed__market__box">
            <p>Why Robinhood?</p>
            <h2> You can buy or sell Dogecoin and other crypto commission-free!</h2>
          </div>
        </div>
        <div className="newsfeed__popularlists__section">
          <div className="newsfeed__popularlists__intro">
            <h1>Popular lists</h1>
            <p>Show More</p>
          </div>
          <div className="newsfeed_popularlists_badges">
            {popularTopics.map((topic) => (
              <Chip 
                className="topic__badge"
                variant="outlined"
                label={topic}
                avatar={<Avatar
                  src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                />} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsfeed;
