const sourceCurrencyName = document.getElementById("source-currency-name");
const targetCurrencyName = document.getElementById("target-currency-name");
const priceTargetCurrency = document.getElementById("price-target-currency");
const sourceFlag = document.getElementById("source-flag");
const targetFlag = document.getElementById("target-flag");
const sourceCurrency = document.getElementById("source-currency");
const targetCurrency = document.getElementById("target-currency");
const sourceCurrencyAmount = document.getElementById("source-currency-amount");
const targetCurrencyAmount = document.getElementById("target-currency-amount");
const swapButton = document.getElementById("swap");
const reset = document.getElementById("reset");
const menuBtn = document.getElementById("menu-btns");
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");
const allLinks = document.querySelectorAll('a')
// ==============================================================================================================
// Required Variables
// ==============================================================================================================

let currentSourceCurrency = "SAR";
let currentTargetCurrency = "PKR";
let currentSourceCurrencyAmount = 1;
let currentTargetCurrencyAmount = 0;
let currentTargetCurrencyprice = null;
let currentSourceflag = "SA";
let currenttargetFlag = "PK";
let targetSourceFlag = "PK";
let currentSourceFlag = "SA";

console.log(sourceCurrencyName);
// ==============================================================================================================
// All Functions
// ==============================================================================================================

const updateAllData = async (sourceCurrAmount, sourceCurr, targetCurr) => {
  try {
    const response = await fetch(
      `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${sourceCurr}&to=${targetCurr}&amount=1`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1026ba2127msh3939803cdcff002p1d91a3jsncf3de883f4e7",
          "x-rapidapi-host":
            "currency-conversion-and-exchange-rates.p.rapidapi.com",
        },
      }
    );

    const result = await response.json();
    currentTargetCurrencyprice = result.info.rate;
    priceTargetCurrency.innerHTML = `${currentTargetCurrencyprice}`;
    updateTargetCurrency(currentTargetCurrencyprice, sourceCurrAmount);
  } catch (error) {
    console.error(error);
  }
};

const updateTargetCurrency = (
  currentTargetCurrencyprice,
  currentSourceCurrencyAmount
) => {
  if (currentTargetCurrencyprice !== null) {
    const totalAmount = (
      currentSourceCurrencyAmount * currentTargetCurrencyprice
    ).toFixed(3);
    targetCurrencyAmount.value = totalAmount;
  } else {
    console.error("Target currency price is not available.");
  }
};

// ==============================================================================================================
// All Event Listeners
// ==============================================================================================================

// 1- Event Listener for Source currency change
sourceCurrency.addEventListener("change", (e) => {
  currentSourceCurrency = e.target.value;
  sourceCurrencyName.innerHTML = `${currentSourceCurrency}`;
  priceTargetCurrency.innerHTML = `${currentTargetCurrencyprice}`;

  currentSourceFlag = e.target.options[e.target.selectedIndex].dataset.isoCode;

  // Update the `src` attribute of the existing `img` element
  sourceFlag.src = `https://flagsapi.com/${currentSourceFlag}/shiny/64.png`;

  updateAllData(
    currentSourceCurrencyAmount,
    currentSourceCurrency,
    currentTargetCurrency
  );
  //await updateAllData(currentSourceCurrencyAmount); // Update data when source currency changes
});

// 2- Event Listener for Target currency change
targetCurrency.addEventListener("change", (e) => {
  currentTargetCurrency = e.target.value;
  targetCurrencyName.innerHTML = `${currentTargetCurrency}`;
  priceTargetCurrency.innerHTML = `${currentTargetCurrencyprice}`;

  targetSourceFlag = e.target.options[e.target.selectedIndex].dataset.isoCode;

  // Update the `src` attribute of the existing `img` element
  targetFlag.src = `https://flagsapi.com/${targetSourceFlag}/shiny/64.png`;

  updateAllData(
    currentSourceCurrencyAmount,
    currentSourceCurrency,
    currentTargetCurrency
  );
  //await updateAllData(currentSourceCurrencyAmount); // Update data when target currency changes
});

// 3- Event Listener for Source currency amount change
sourceCurrencyAmount.addEventListener("input", (e) => {
  currentSourceCurrencyAmount = parseFloat(e.target.value) || 1;
  updateTargetCurrency(currentTargetCurrencyprice, currentSourceCurrencyAmount);
});

// 4 - Event Listener For Swap
swapButton.addEventListener("click", (e) => {
  let tempCurrency = currentSourceCurrency;
  currentSourceCurrency = currentTargetCurrency;
  currentTargetCurrency = tempCurrency;

  targetCurrencyName.innerHTML = `${currentTargetCurrency}`;
  sourceCurrencyName.innerHTML = `${currentSourceCurrency}`;

  sourceCurrency.value = `${currentSourceCurrency}`;
  targetCurrency.value = `${currentTargetCurrency}`;

  let tempFlag = currentSourceFlag;
  currentSourceFlag = targetSourceFlag;
  targetSourceFlag = tempFlag;

  targetFlag.src = `https://flagsapi.com/${targetSourceFlag}/shiny/64.png`;
  sourceFlag.src = `https://flagsapi.com/${currentSourceFlag}/shiny/64.png`;

  updateAllData(
    currentSourceCurrencyAmount,
    currentSourceCurrency,
    currentTargetCurrency
  );
});

// 5 - Event Listener on RESET button
reset.addEventListener("click", (e) => {
  currentSourceCurrencyAmount = 1;
  currentSourceCurrency = "SAR";
  currentTargetCurrency = "PKR";
  sourceCurrency.value = `${currentSourceCurrency}`;
  targetCurrency.value = `${currentTargetCurrency}`;
  sourceCurrencyName.innerHTML = `${currentSourceCurrency}`;
  targetCurrencyName.innerHTML = `${currentTargetCurrency}`;
  sourceFlag.src = `https://flagsapi.com/SA/shiny/64.png`;
  targetFlag.src = `https://flagsapi.com/PK/shiny/64.png`;
  targetSourceFlag = "PK";
  currentSourceFlag = "SA";
  updateAllData(
    currentSourceCurrencyAmount,
    currentSourceCurrency,
    currentTargetCurrency
  );
});

// 6 - Event Listener to hide nav-links to make responsive
menuBtn.addEventListener('click', e =>{ 
    if(!navLinks.classList.contains('show')){
        navLinks.classList.add('show');
        menuIcon.classList = "fa-solid fa-xmark";
        // console.log("error",navLinks.classList);
    }
    else{
        navLinks.classList.remove('show');
        menuIcon.classList = "fa-solid fa-bars";
    }
    })

allLinks.forEach(
    link => link.addEventListener('click', e=>{
        navLinks.classList.remove('show');
        menuIcon.classList = "fa-solid fa-bars";
        
    })
)
    


// Init
updateAllData(
  currentSourceCurrencyAmount,
  currentSourceCurrency,
  currentTargetCurrency
);
