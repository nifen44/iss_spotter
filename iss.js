const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body)=>{
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fecthing IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(null, ip);
    
  });
};

const fetchCoordsByIP = (ip, callback)=>{
  request(`http://ipwho.is/${ip}`, (error, response, body)=>{
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.success) {
      const msg = data.message;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback)=>{
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body)=>{
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fecthing Times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.response);

  });
};

const nextISSTimesForMyLocation = (callback)=>{
    fetchMyIP((error, ip)=>{
        if(error){
            return callback(error, null);
        }

        fetchCoordsByIP(ip, (error, loc)=>{
            if(error){
                return callback(error, null);
            }

            fetchISSFlyOverTimes(loc, (error, timeArray)=>{
                if(error){
                    return callback(error, null);
                }

                callback(null, timeArray);
            })
        })
    })
}

// fetch("")
// .then(() => fetch(""))
// .then(() => fetch(""))
// .then

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
