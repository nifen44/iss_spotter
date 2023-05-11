const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip)=>{
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// fetchCoordsByIP('67.225.63.118', (error, data)=>{
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked! Returned Position: ", data);
// });

// fetchISSFlyOverTimes({ latitude: '50.4452112', longitude: '-104.6188944' }, (error, data)=>{
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked! Returned Times: ", data);
// });

nextISSTimesForMyLocation((error, passTimes)=>{
    if (error) {
        return console.log("It didn't work!", error);
      }
      // success, print out the deets!
      printPassTimes(passTimes);
})

const printPassTimes = (passTimes)=>{
    for(const time of passTimes){
        const datetime = new Date(0);
        datetime.setUTCSeconds(time.risetime);
        const duration = time.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
}

