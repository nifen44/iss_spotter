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

module.exports = { fetchMyIP };
