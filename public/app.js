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
      console.log(jsonData)
    })
    .catch((error) => {
        console.error("Cannot fetch data", error)
    }) 
}

// Function that displays the data on the page
function displayData(postCode, jsonData) {
  const locationElement = document.getElementById("location");
  //const rows = jsonData.rows
  //const columns = jsonData["column-names"]
  locationElement.textContent = `Data for ${postCode}: ${jsonData}`;
}

// Calling fetchData for default postcode
fetchData("SL1 5BW")
  .then((jsonData) => {
    displayData("SL1 5BW", jsonData)
  })
