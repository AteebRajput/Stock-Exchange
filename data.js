
const quoteName = document.getElementById("select-quote")
const interval = document.getElementById("interval")

const collectData = async () => {
  const url =
    "https://real-time-quotes1.p.rapidapi.com/api/v1/symbol/stock?includeNames=false";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
      "x-rapidapi-host": "real-time-quotes1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    result.forEach(element => {
        console.log(`<option value="${element}">${element}</option>`);
    });
  } catch (error) {
    console.error(error);
  }
};

//collectData();

let currentQuote = null
let currentInterval = null

const getStocks = async () => {

}

quoteName.addEventListener('change',e => {
    currentQuote = e.target.value
    console.log(currentQuote);
})

interval.addEventListener('change',e=> {
    currentInterval = e.target.value
    console.log(currentInterval);
})



//======================================================================
// All DOM Elements
//======================================================================

const tableContent = document.getElementById("table-body");
const btnIcon = document.getElementById("btn-icon");
const sideIcon = document.getElementById("side-icon");
const sideBar = document.getElementById("side-bar");
const barsIcon = document.querySelector(".bars-icon");
const sideBarLinks = document.querySelectorAll("a");
const quoteName = document.getElementById("select-quote");
const interval = document.getElementById("interval");
const quoteRow = document.getElementById("quoteCardRow");
const stockTable = document.getElementById("stock-interval-table");

//======================================================================
// ALL Variables
//======================================================================

let currentQuote = null;
let currentInterval = null;

//======================================================================
// ALL FUNCTIONS
//======================================================================

const checkData = async () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "x-apihub-key",
    "pM8u7mAURikTNTWRXeQb9AmM5ItJEdHeAl75ldN-1QTovvINNi"
  );
  myHeaders.append("x-apihub-host", "Real-Time-Finance-Data.allthingsdev.co");
  myHeaders.append("x-apihub-endpoint", "72bead47-9ea9-473c-ac20-89a3becc1358");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://Real-Time-Finance-Data.proxy-production.allthingsdev.co/v1/market-trends?trend_type=MARKET_INDEXES&country=us&language=en",
      requestOptions
    );
    const result = await response.json();

    const trendsArray = result.data.trends;
    console.log("Trends array: ", trendsArray);

    tableContent.innerHTML = "";

    // Iterate over the trends array and populate the table
    trendsArray.forEach((element) => {
      tableContent.innerHTML += `
                <tr>
                    <td>${element.symbol}</td>
                    <td>${element.name}</td>
                    <td>$${element.price}</td>
                    <td>$${element.previous_close}</td>
                    <td>$${element.change}</td>
                    <td>${element.change_percent}%</td>
                    <td>${element.timezone}</td>
                </tr>
            `;
    });
  } catch (error) {
    console.error("Error fetching the API response:", error);
  }
};

//checkData();

const getStock = async () => {
    // Fetch current stock data
    const currentStockUrl = `https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/stock?symbols=${currentQuote}`;
    const currentStockOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
        "x-rapidapi-host": "real-time-quotes1.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(currentStockUrl, currentStockOptions);
      const currentStockData = await response.json();
      quoteRow.innerHTML = '';
      
      currentStockData.forEach((data) => {
        quoteRow.innerHTML += `
          <div class="data-card">
            <h3>Symbol</h3>
            <p class="price">${data.symbol}</p>
          </div>
          <div class="data-card">
            <h3>Price</h3>
            <p class="price">$${data.price}</p>
          </div>
          <div class="data-card">
            <h3>Volume</h3>
            <p class="price">${data.volume}</p>
          </div>
        `;
      });
    } catch (error) {
      console.error("Error fetching current stock data:", error);
    }
  
    // Fetch historical stock data
    const historicalStockUrl = `https://real-time-quotes1.p.rapidapi.com/api/v1/historical/stock?interval=${currentInterval}&symbol=${currentQuote}`;
    const historicalStockOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
        "x-rapidapi-host": "real-time-quotes1.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(historicalStockUrl, historicalStockOptions);
      const historicalStockData = await response.json(); 
      stockTable.innerHTML = '';
      
      historicalStockData.forEach((data) => {
        stockTable.innerHTML += `
          <tr>
            <td>${data.date}</td>
            <td>${data.open}</td>
            <td>${data.close}</td>
            <td>${data.low}</td>
            <td>${data.high}</td>
            <td>${data.volume}</td>
          </tr>
        `;
      });
    } catch (error) {
      console.error("Error fetching historical stock data:", error);
    }
  };
  
//======================================================================
// ALL EVENT LISTENER
//======================================================================

// 1 - Event Listener to toggle the Sidebar
btnIcon.addEventListener("click", () => {
  console.log("Event listener triggered");
  if (!sideBar.classList.contains("show")) {
    sideBar.classList.add("show");
    sideIcon.classList.remove("fa-bars");
    sideIcon.classList.add("fa-times");
  } else {
    sideBar.classList.remove("show");
    sideIcon.classList.remove("fa-times");
    sideIcon.classList.add("fa-bars");
  }
});

// 2 - Event Listener to close the side bar when click on any link in sidebar

sideBarLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    sideBar.classList.remove("show");
    sideIcon.classList.remove("fa-times");
    sideIcon.classList.add("fa-bars");
  })
);

// 3 - Event Listener to get selected Quote

quoteName.addEventListener("change", (e) => {
    currentQuote = e.target.value;
    console.log(currentQuote);
    getStock(); // Fetch data when quote changes
  });

  // 4 - Event Listener to get
  interval.addEventListener("change", (e) => {
    currentInterval = e.target.value;
    console.log(currentInterval);
    getStock(); // Fetch data when interval changes
  });
  
