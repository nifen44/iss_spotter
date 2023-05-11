const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip)=>{
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP: ", ip);
});

fetchCoordsByIP('67.225.63.118', (error, data)=>{
  console.log(data);
});