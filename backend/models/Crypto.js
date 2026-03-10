import mongoose from 'mongoose'

const cryptoSchema = new mongoose.Schema({
    coinId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    symbol: {type: String, required: true},
    currentPrice: {type: Number, required: true},
    priceChangePercentage24h: Number,
    marketCap: Number,
    marketRank: Number,
    image: String,
    lastUpdated: {type: Date, default: Date.now()}
})

const crypto = mongoose.model('crypto', cryptoSchema)
export default crypto
