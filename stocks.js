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
const quoteBtn = document.getElementById("quote-button");
const newsCard = document.getElementById("news-card");
const selectNews = document.getElementById("select-news");
const newsBtn = document.getElementById("news-button");
const overviewBtn = document.getElementById("overview-button");
const companyDataTable = document.getElementById("company-data");
const selectedCompany = document.getElementById("select-company");
const selectedCompanyIncome = document.getElementById("select-company-income");
const startDate = document.getElementById("select-date");
const endDate = document.getElementById("end-date");
const incomeBtn = document.getElementById("income-button");
const incomeCard = document.getElementById("income-cards");

//======================================================================
// ALL Variables
//======================================================================

let currentQuote = "7TEC.BO";
let currentInterval = "4hour";
let companyNews = "ABNB";
let companyOverview = "AAPL";
let currentStartDate = "2022";
let currentEndDate = "2023";
companyIncome = "AAPL"

//======================================================================
// ALL FUNCTIONS
//======================================================================

const checkData = async () => {
  const url = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=MARKET_INDEXES&country=us&language=en';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f14849f1dfmsh3f22c5c2d433db2p1e8a11jsn1335810beaec',
      'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Change this line to parse the response as JSON
    console.log("Trends array: ", result);

    const trendsArray = result.data.trends;
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

// checkData();

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
    quoteRow.innerHTML = "";

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
            <p class="price">$${data.volume}</p>
          </div>
        `;
    });
  } catch (error) {
    console.error("Error fetching current stock data:", error);
  }

  //Fetch historical stock data
  const historicalStockUrl = `https://real-time-quotes1.p.rapidapi.com/api/v1/historical/stock?interval=${currentInterval}&symbol=${currentQuote}`;
  const historicalStockOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
      "x-rapidapi-host": "real-time-quotes1.p.rapidapi.com",
    },
  };
};

// Function to get historical Data
const getHistoricalData = async () => {
  const url = `https://real-time-quotes1.p.rapidapi.com/api/v1/historical/stock?interval=${currentInterval}&symbol=${currentQuote}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
      "x-rapidapi-host": "real-time-quotes1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const historicalStockData = await response.json();
    stockTable.innerHTML = "";
    const limitedData = historicalStockData.slice(0, 10);

    historicalStockData.forEach((data) => {
      stockTable.innerHTML += `
        <tr>
          <td>${data.date}</td>
          <td>$${data.open}</td>
          <td>$${data.close}</td>
          <td>$${data.low}</td>
          <td>$${data.high}</td>
          <td>$${data.volume}</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error is", error);
  }
};

// Swiper Functionality
let swiperCards = new Swiper(".card__content", {
  loop: false, // Disable loop mode initially
  spaceBetween: 32,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    600: {
      slidesPerView: 1,
    },
    968: {
      slidesPerView: 3,
    },
  },
});

// Function to format date
function getFormattedDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to get news and display dynamically
const getNews = async () => {
  const url = 'https://financial-news6.p.rapidapi.com/news/stock?limit=20&page=1&lang=en';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f14849f1dfmsh3f22c5c2d433db2p1e8a11jsn1335810beaec',
      'x-rapidapi-host': 'financial-news6.p.rapidapi.com'
    }
  };

  // Show loading animation
  const newsContainer = document.querySelector(".swiper-wrapper");
  newsContainer.innerHTML = `<div class="loader"><span></span></div>`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Clear loading animation
    newsContainer.innerHTML = ``;

    // Check if result is an array
    if (!Array.isArray(result) || result.length === 0) {
      newsContainer.innerHTML = `<p>No news available</p>`;
      return;
    }

    // Create news cards dynamically
    result.forEach((data) => {
      const article = document.createElement('article');
      article.classList.add('card__article', 'swiper-slide');
      article.innerHTML = `
        <div class="card__image">
          <img src="${data.imageUrl}" alt="image" class="card__img">
          <div class="card__shadow"></div>
        </div>
        <div class="card__data">
          <h3 class="card__name">${data.source.name}</h3>
          <p class="card__description">${data.title}</p>
          <p class="card__date card__description">${getFormattedDate(data.publishedAt)}</p>
          <a href="${data.url}" class="card__button" target="_blank">Read More</a>
        </div>
      `;
      newsContainer.appendChild(article);
    });

    // Check if there are enough slides to enable loop mode
    if (result.length > 3) { // Adjust this value based on the max slidesPerView
      swiperCards.params.loop = true;
      swiperCards.loopCreate(); // Re-create the loop
    }

    // Update swiper instance
    swiperCards.update();
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
  } 
};

// Call the getNews function to fetch and display news



// Event listener for the button
document.getElementById('news-button').addEventListener('click', getNews);


// Function to get company data

const getCompanyData = async () => {
  const url = `https://real-time-finance-data.p.rapidapi.com/stock-overview?symbol=${companyOverview}%3ANASDAQ&language=en`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f14849f1dfmsh3f22c5c2d433db2p1e8a11jsn1335810beaec",
      "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    companyDataTable.innerHTML = ``;
    const data = result.data;
    Object.entries(data).forEach(([key, value]) => {
      companyDataTable.innerHTML += `
                  <tr>
                    <td class="parameter">${key}</td>
                    <td>${value}</td>
                  </tr>
      `;
    });
  } catch (error) {
    console.error(error);
  }
};
// Function to Formal large Number
function formatNumber(num) {
  if (num === null || num === undefined) return null;

  num = parseFloat(num);
  if (isNaN(num)) return num;

  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else {
    return num;
  }
}

const getIncomeStatement = async (start, end) => {
  const url = `https://public-company-financials.p.rapidapi.com/annual/income_statement?ticker=${companyIncome}&end=${end}-12-31&start=${start}-01-01`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f14849f1dfmsh3f22c5c2d433db2p1e8a11jsn1335810beaec",
      "x-rapidapi-host": "public-company-financials.p.rapidapi.com",
    },
  };
  console.log(url);

  try {
   const response = await fetch(url, options);
    const result = await response.json();
    const data = result[0].metrics;
    let filteredData = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        filteredData[key] = formatNumber(value);
      }
    }
    console.log("filtered", filteredData);

    // Build HTML string
    let htmlString = '';
    Object.entries(filteredData).forEach(([key, value]) => {
      htmlString += `
      <div class="card">
  <div class="first-content">
    <span>${key}</span>
  </div>
  <div class="second-content">
<span>$${value}</span>
  </div>


</div>
      `
    });

    // Set the innerHTML of incomeCard
    incomeCard.innerHTML = htmlString;
  } catch (error) {
    console.error(error);
  }
};


// getIncomeStatement(currentStartDate,currentEndDate);

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
  // Fetch data when quote changes
});

// 4 - Event Listener to get the interval
interval.addEventListener("change", (e) => {
  currentInterval = e.target.value;
  console.log(currentInterval);
  // Fetch data when interval changes
});

// 5 = Event Listener when click on get quote button
quoteBtn.addEventListener("click", (e) => {
  getStock();
  getHistoricalData();
});
// 6 - Event Listener to get the company name for news
selectNews.addEventListener("change", (e) => {
  companyNews = e.target.value;
});

// 7 - Event Listener to get the news
newsBtn.addEventListener("click", (e) => {
  getNews();
});
// 6 - Event Listener to get the company name for news
selectedCompany.addEventListener("change", (e) => {
  companyOverview = e.target.value;
});

// 8 - Event Listener to get the Company Overview
overviewBtn.addEventListener("click", (e) => {
  getCompanyData();
});

// 9 - Get StartDate for income statement
startDate.addEventListener("change", (e) => {
  currentStartDate = e.target.value;
  getIncomeStatement(currentStartDate, currentEndDate);
});
// 9 - Get EndDate for income statement
endDate.addEventListener("change", (e) => {
  currentEndDate = e.target.value;
  getIncomeStatement(currentStartDate, currentEndDate);
});

// 10 - Event Listener to get the income statement
incomeBtn.addEventListener("click", (e) => {
  getIncomeStatement(currentStartDate, currentEndDate);
});
// 11 - Selected Company for income statement
selectedCompanyIncome.addEventListener('change', (e) => {
  companyIncome = e.target.value;
})

//==========================================================================
// init
//==========================================================================

checkData()
getStock();
getHistoricalData();
getNews();
getCompanyData();
getIncomeStatement(currentStartDate,currentEndDate)



