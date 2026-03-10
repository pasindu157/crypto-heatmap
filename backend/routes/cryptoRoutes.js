import express from 'express'
import { getCoin, getCoinById, getMarketPrice, getTopCoins } from '../controllers/cryptoController.js'
const cryptoRouter = express.Router()

cryptoRouter.get('/heatmap', getTopCoins)
cryptoRouter.get('/market-cap', getMarketPrice)
cryptoRouter.get('/search', getCoin)
cryptoRouter.get('/coin/:coinId', getCoinById)

export default cryptoRouter