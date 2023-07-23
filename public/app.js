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

fetchData("SL1 5BW")
