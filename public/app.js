// Function that encodes authentication data
function encode(str) {
  return btoa(str);
}

// Function that fetches EPC data
function fetchData(postCode) {
  const email = "lazar_paul_2006@yahoo.com";
  const apiKey = '3c323f56a61174e6b2da8aef5502e693aeef2b1e';
  const encodedAuthData = encode(`${email}:${apiKey}`);
  const apiUrl = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postCode}`;
  const headers = {
    "Accept": "application/json",
    "Authorization": `Basic ${encodedAuthData}`
  }

  return fetch(apiUrl, {headers})
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      return jsonData;
    })
    .catch((error) => {
        console.error("Cannot fetch data", error)
    }) 
}

// Function that displays the data on the page
function displayData(postCode, data) {
  const locationElement = document.getElementById("location");
  const rows = data.rows
  const headerElement = document.getElementById("header")
  
  // Creating a container div to hold all div elements
  const divs = document.createElement("div")

  headerElement.textContent = `Data for: ${postCode}`

  rows.forEach((row) => {
    const elementDiv = document.createElement("div"); // Creates a div for each item
    elementDiv.textContent = row["address"];
    elementDiv.classList.add("element-div")

    elementDiv.addEventListener("click", () => {
      console.log(`Selected ${row["address"]}`)
    })

    divs.appendChild(elementDiv); // Appends the item div to div container
  })

  locationElement.appendChild(divs);
}

// Calling fetchData for default postcode
fetchData("SL1 5BW")
  .then((data) => {
    displayData("SL1 5BW", data)
  })

// Form that allows user to enter a post code
function handleFormSubmit(event) {
  event.preventDefault();

  const postCodeInput = document.getElementById("inputBox");
  const postCode = postCodeInput.value;

  fetchData(postCode)
    .then((data) => {
      displayData(postCode, data)
      postCodeInput.value = ""
  })
}

const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit)