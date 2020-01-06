const path = require('path');
module.exports = (production)=>{
return {
    contentBase: path.resolve(__dirname,"../"),
    host: process.env.HOST || '0.0.0.0',
    watchContentBase: true,
    compress: true,
    port: 7777,
    overlay: { 
      warnings: true,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
