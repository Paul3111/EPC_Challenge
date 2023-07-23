// Function that fetches EPC data
function fetchData(postCode) {
  const apiKey = '3c323f56a61174e6b2da8aef5502e693aeef2b1e'
  const apiUrl = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postCode}`

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData)
    })
    .catch((error) => {
        console.error("Cannot fetch data",error)
    }) 
}

fetchData("SL1")
