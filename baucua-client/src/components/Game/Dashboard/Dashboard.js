import React, { useEffect, useContext } from "react";
import SocketContext from "contexts/socket-context";
import "./Dashboard.css";

// Images - Dollars
import k1  from "assets/money/1k.jpg";
import k2  from "assets/money/2k.jpg";
import k5  from "assets/money/5k.jpg";
import k10 from "assets/money/10k.jpg";
import k20 from "assets/money/20k.jpg";
import k50 from "assets/money/50k.jpg";

// Images - Disabled Dollars
import k1_disabled   from  "assets/money/1k-disabled.jpg";
import k2_disabled    from  "assets/money/2k-disabled.jpg";
import k5_disabled   from  "assets/money/5k-disabled.jpg";
import k10_disabled    from "assets/money/10k-disabled.jpg";
import k20_disabled   from  "assets/money/20k-disabled.jpg";
import k50_disabled    from "assets/money/50k-disabled.jpg";

// Images - Dollars (Mobile)
import OneDollarVert from "assets/money/one-dollar-vert.png";
import FiveDollarVert from "assets/money/five-dollar-vert.png";
import TenDollarVert from "assets/money/ten-dollar-vert.png";
import TwentyDollarVert from "assets/money/twenty-dollar-vert.png";
import FiftyDollarVert from "assets/money/fifty-dollar-vert.png";
import HundredDollarVert from "assets/money/hundred-dollar-vert.png";

// Images - Disabled Dollars (Mobile)
import OneDollarDisabledVert from "assets/money/one-dollar-disabled-vert.png";
import FiveDollarDisabledVert from "assets/money/five-dollar-disabled-vert.png";
import TenDollarDisabledVert from "assets/money/ten-dollar-disabled-vert.png";
import TwentyDollarDisabledVert from "assets/money/twenty-dollar-disabled-vert.png";
import FiftyDollarDisabledVert from "assets/money/fifty-dollar-disabled-vert.png";
import HundredDollarDisabledVert from "assets/money/hundred-dollar-disabled-vert.png";

function Dashboard(props) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("showtimesup", () => {
      var dashboard = document.getElementById("dashboard");

      var dollars = document.getElementsByClassName("dollar-active");
      if (dollars.length > 0) {
        dollars[0].classList.remove("dollar-active");
      }
      dashboard.style.zIndex = -1;
    });

    socket.on("nextround", () => {
      var dashboard = document.getElementById("dashboard");
      dashboard.style.zIndex = 0;
    });
  }, [socket]);

  // useEffect - check and handle which dollars are available in real time
  useEffect(() => {
    const player = props.gamestate.players.filter((p) => props.id === p.id)[0];

    var dollars = document.getElementsByClassName("dollar");
    console.log(dollars)

    for (let i = 0; i < dollars.length; i++) {
      console.log(document.getElementById(dollars[i].id + "-disabled-vert"))

      var dollar1 = document.getElementById(dollars[i].id + "-disabled-vert");

      var dollar2 = document.getElementById(dollars[i].id + "-disabled");

      if (player.total < parseInt(dollars[i].id)) {
        dollars[i].style.display = "none";
        dollars[i].classList.remove("dollar-active");
        dollar1.style.display = "inline-block";
        dollar2.style.display = "inline-block";
      } else {
        dollars[i].style.display = "inline-block";
        dollar1.style.display = "none";
        dollar2.style.display = "none";
      }
    }

    var bet_btn = document.getElementById("bet-btn");
    if (player.bankrupt) {
      bet_btn.classList.add("bet-btn-disabled");
    }
  }, [props.gamestate, props.id]);

  // useEffect - If the player is ready, prevent the dashboard from being clickable
  useEffect(() => {
    var dashboard = document.getElementById("dashboard");
    var bet_btn = document.getElementById("bet-btn");

    if (props.ready) {
      var dollars = document.getElementsByClassName("dollar-active");
      if (dollars.length > 0) {
        dollars[0].classList.remove("dollar-active");
      }
      dashboard.style.zIndex = -1;
    } else {
      dashboard.style.zIndex = 0;
      bet_btn.classList.remove("bet-btn-active");
    }
  }, [props.ready]);

  const handleDollarClick = (event) => {
    var dollars = document.getElementsByClassName("dollar-active");
    if (dollars.length > 0) {
      dollars[0].classList.remove("dollar-active");
    }

    var dollar = document.getElementById(event.target.id);
    dollar.classList.add("dollar-active");

    props.handleBetting(parseInt(event.target.id));
  };

  const handleBetClick = () => {
    var bet_btn = document.getElementById("bet-btn");
    var dollars = document.getElementsByClassName("dollar-active");

    if (dollars.length > 0) {
      dollars[0].classList.remove("dollar-active");
    }

    bet_btn.classList.add("bet-btn-active");
    props.handleReady();
  };

  return (
    <div id="dashboard" className="dashboard-container">
      <div className="dashboard-content">
        <div className="dollars">
          <img
            id="1000"
            className="dollar"
            src={k1}
            alt="one-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="2000"
            className="dollar"
            src={k2}
            alt="five-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="5000"
            className="dollar"
            src={k5}
            alt="ten-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="10000"
            className="dollar"
            src={k10}
            alt="twenty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="20000"
            className="dollar"
            src={k20}
            alt="fifty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="50000"
            className="dollar"
            src={k50}
            alt="hundred-dollar"
            onClick={handleDollarClick}
          />

          <img
            id="1000-disabled"
            className="dollar-disabled"
            src={k1_disabled}
            alt="one-dollar-disabled"
          />
          <img
            id="2000-disabled"
            className="dollar-disabled"
            src={k2_disabled}
            alt="five-dollar-disabled"
          />
          <img
            id="5000-disabled"
            className="dollar-disabled"
            src={k5_disabled}
            alt="ten-dollar-disabled"
          />
          <img
            id="10000-disabled"
            className="dollar-disabled"
            src={k10_disabled}
            alt="twenty-dollar-disabled"
          />
          <img
            id="20000-disabled"
            className="dollar-disabled"
            src={k20_disabled}
            alt="fifty-dollar-disabled"
          />
          <img
            id="50000-disabled"
            className="dollar-disabled"
            src={k50_disabled}
            alt="hundred-dollar-disabled"
          />
        </div>

        {/* Mobile */}
        <div className="dollars-mobile">
          <img
            id="1000"
            className="dollar"
            src={OneDollarVert}
            alt="one-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="2000"
            className="dollar"
            src={FiveDollarVert}
            alt="five-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="5000"
            className="dollar"
            src={TenDollarVert}
            alt="ten-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="10000"
            className="dollar"
            src={TwentyDollarVert}
            alt="twenty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="20000"
            className="dollar"
            src={FiftyDollarVert}
            alt="fifty-dollar"
            onClick={handleDollarClick}
          />
          <img
            id="50000"
            className="dollar"
            src={HundredDollarVert}
            alt="hundred-dollar"
            onClick={handleDollarClick}
          />

          <img
            id="1000-disabled-vert"
            className="dollar-disabled"
            src={OneDollarDisabledVert}
            alt="one-dollar-disabled"
          />
          <img
            id="2000-disabled-vert"
            className="dollar-disabled"
            src={FiveDollarDisabledVert}
            alt="five-dollar-disabled"
          />
          <img
            id="5000-disabled-vert"
            className="dollar-disabled"
            src={TenDollarDisabledVert}
            alt="ten-dollar-disabled"
          />
          <img
            id="10000-disabled-vert"
            className="dollar-disabled"
            src={TwentyDollarDisabledVert}
            alt="twenty-dollar-disabled"
          />
          <img
            id="20000-disabled-vert"
            className="dollar-disabled"
            src={FiftyDollarDisabledVert}
            alt="fifty-dollar-disabled"
          />
          <img
            id="50000-disabled-vert"
            className="dollar-disabled"
            src={HundredDollarDisabledVert}
            alt="hundred-dollar-disabled"
          />
        </div>

        <button id="bet-btn" className="bet-btn" onClick={handleBetClick}>
          BET
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
