import axios from 'axios'
import NodeCache from 'node-cache'

const cache = new NodeCache({stdTTL:60})
const searchCache = new NodeCache({ stdTTL: 300 }) 

//top 9 coins
export const fetchTopCoins = async() =>{
   try{

      const cachedData = cache.get('top9')

      if(cachedData)
      {
         console.log('✅ Serving from cache')
         return cachedData
      }

      console.log('🔄 Cache miss - fetching from CoinGecko')

      const uri = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1&sparkline=false&price_change_percentage=24h'
      const response = await axios.get(uri)

      cache.set('top9', response.data)

      return response.data
   }
   catch(error)
   {
      throw new Error(`failed to fetch top coins : ${error.message}`)
   }
}

//all coin price
export const fetchMarketCap = async() =>
{
   try {
      const cachedData = cache.get('price')
      if(cachedData)
      {
         console.log('✅ Serving from cache')
         return cachedData
      }
      const uri = 'https://api.coingecko.com/api/v3/global'
      const response = await axios.get(uri)

      cache.set('price', response.data)

      return response.data

   } catch (error) {
      throw new Error(`failed to fetch global price : ${error.message}`)
   }
}

//fetch searched coin
export const searchCoin = async(coin) =>
{
   try {
      const cacheKey = `search_${coin}`  
      const cachedData = searchCache.get(cacheKey) 
      if(cachedData)
      {
         return cachedData
      }

      const uri = `https://api.coingecko.com/api/v3/search?query=${coin}`
      const response = await axios.get(uri)

      searchCache.set(cacheKey, response.data)

      return response.data

   } catch (error) {
      throw new Error(`failed to fetch ${coin} : ${error.message}`)
   }
}

//get coin by id
export const fetchCoinById = async(coinId) =>
{
   try {
      const cacheKey = `coin_${coinId}`
      const cachedData = cache.get(cacheKey)

      if(cachedData)
      {
         return cachedData
      }

      const uri = `https://api.coingecko.com/api/v3/coins/${coinId}`
      const response = await axios.get(uri)

      cache.set(cacheKey, response.data, 3600)
      return response.data

   } catch (error) {
      throw new Error(`failed to fetch coin ${coinId}: ${error.message}`)
   }
}