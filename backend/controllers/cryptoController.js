import { fetchCoinById, fetchMarketCap, fetchTopCoins, searchCoin } from "../services/coinGeckoService.js"

export const getTopCoins = async(req,res) =>
{
    try {
        const data = await fetchTopCoins()
        res.json({
            success: true,
            count: data.length,
            details: data
        })
    } catch (error) {
        console.error('error fetching top coins ', error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMarketPrice = async(req,res) =>
{
    try {
        const data = await fetchMarketCap()
        res.json({
            success: true,
            count: data.length,
            details: data
        })
    } catch (error) {
        console.error('error fetching global price ', error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//search coin
export const getCoin = async(req,res) =>
{
    const {coin} = req.query

    try {
        const data = await searchCoin(coin)
        res.json({
            success: true,
            count: data.length,
            details: data
        })

    } catch (error) {
        console.error(`error fetching the ${coin}`, error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get coin by id
export const getCoinById = async(req,res) =>
{
    const {coinId} = req.params

    try {
        const data = await fetchCoinById(coinId)

        res.json({
            success: true,
            details: data
        })
    } catch (error) {
        console.error(`error fetching coin ${coinId}:`, error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}