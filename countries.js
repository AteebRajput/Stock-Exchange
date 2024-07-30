const generateOptions = async () => {
    // ====================================================================================================
    // GET ALL COUNTRIES CURRENCIES SYMBOL
    // ====================================================================================================
    let allSymbols
    try {
      const url =
        "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
          "x-rapidapi-host":
            "currency-conversion-and-exchange-rates.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
        allSymbols = data.symbols;
     // console.log("SYMBOLS >>", allSymbols);
    } catch (error) {
      console.error('Error fetching currency symbols:', error);
    }
  
    // ====================================================================================================
    // GET ALL COUNTRIES INFORMATION
    // ====================================================================================================
  
    try {
      const url = "https://country-info.p.rapidapi.com/";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "d237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa",
          "x-rapidapi-host": "country-info.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const allCountriesData = await response.json();
      //console.log("Countries Data", allCountriesData);
      
      //console.log(Array.isArray(allCountriesData));
      // ====================================================================================================
      // FILTER DATA WITH CURRENCY CODE
      // ====================================================================================================
      let filteredCountries = [];
      Object.entries(allSymbols).sort().forEach(([symbols,val])=>{

        Object.values(allCountriesData).forEach(country => {
            if (country.currencyCode === symbols) {
              filteredCountries.push(country);
            }
        });
        
      });
      //console.log("filtered Countries",filteredCountries);

      let allHTMLOptions = ``;
      filteredCountries.forEach(country => {
        allHTMLOptions += `<option value="${country.currencyCode}" data-iso-code="${country.code}"> ${country.dialCode} - ${country.name} - ${country.currencyCode}</option>\n`
      })
      console.log(allHTMLOptions);


  
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  };
  
  generateOptions();
  