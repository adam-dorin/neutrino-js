module.exports = (production)=>{
    return {
       runtimeChunk: 'single',
       splitChunks: {
         cacheGroups: {
           vendor: {
             test: /[\\\/]node_modules[\\\/]/,
             name: 'vendors',
             chunks: 'all'
           }
         }
       }
     }
   }
   