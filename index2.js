const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation().then(passTimes=>{
    printPassTime(passTimes)
}).catch(error=>{
    console.log(`It didn't work: ${error.message}`);
})