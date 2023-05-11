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

    console.log(`body: ${body}, body type: ${typeof body}`);
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

module.exports = { fetchMyIP, fetchCoordsByIP };
