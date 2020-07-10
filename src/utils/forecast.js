const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ee70b1e80a2d6143c23f2640ef364791&query=' + longitude + ',' + latitude + '&units=f'
    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " +  body.current.temperature + " feels like " + body.current.feelslike)
        }
    })
}

module.exports = forecast 