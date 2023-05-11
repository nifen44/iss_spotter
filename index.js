const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip)=>{
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP: ", ip);
});

fetchCoordsByIP('67.225.63.118', (error, data)=>{
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("It worked! Returned Position: ", data);
});

fetchISSFlyOverTimes({ latitude: '50.4452112', longitude: '-104.6188944' }, (error, data)=>{
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("It worked! Returned Times: ", data);
});