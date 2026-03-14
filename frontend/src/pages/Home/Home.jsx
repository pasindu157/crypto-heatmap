import React, { useEffect, useRef, useState } from 'react'
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {

  const [coinData, setCoinData] = useState([])
  const [marketCap, setMarketCap] = useState(null)
  const [totalVolume, setTotalVolume] = useState(null)
  const [marketcapPercentage, setMarketcapPercentage] = useState(null)
  const [volumeChangePercentage, setVolumeChangePercentage] = useState(null)
  const [searchCoin, setSearchCoin] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedCoinData, setSelectedCoinData] = useState(null)

  const searchResultRef = useRef(null)

  //format price
  const formatMarketCap = (cap) => {
    if (cap > 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap > 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    if (cap > 1e6) return `$${(cap / 1e6).toFixed(2)}M`
    return `$${cap.toFixed(2)}`
  }

  //=========================================== fetch top 12 coins ====================================================
  const fetchCoins = async () => {
    try {
      console.log('API URL being used:', import.meta.env.REAL_API)
      const response = await axios.get(`${import.meta.env.REAL_API}/crypto/heatmap`)

      if (response.data.success) {
        setCoinData(response.data.details)

        console.log(response.data.details);
      }

    } catch (error) {
      toast.error('error occured while fetching the data')
      console.error(error.message);
    }
  }

  //======================================= fetch market cap =================================================
  const fetchMarketCap = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REAL_API}/crypto/market-cap`)

      if (response.data.success) {
        setMarketCap(formatMarketCap(response.data.details.data.total_market_cap.usd))
        setTotalVolume(formatMarketCap(response.data.details.data.total_volume.usd))
        setMarketcapPercentage(response.data.details.data.market_cap_change_percentage_24h_usd)
        setVolumeChangePercentage(response.data.details.data.volume_change_percentage_24h_usd)
        console.log(response.data.details);
      }

    } catch (error) {
      toast.error('error occured while fetching the data')
      console.error(error.message);
    }
  }

  useEffect(() => {

    fetchCoins()
    fetchMarketCap()

    const coinInterval = setInterval(fetchCoins, 10000) // 10 seconds
    const capInterval = setInterval(fetchMarketCap, 10000)

    return () => clearInterval(coinInterval, capInterval)


  }, [])

  //========================================= coin search ==============================================================
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchCoin && searchCoin.trim().length > 1) {
        setSearching(true)
        try {
          const response = await axios.get(`${import.meta.env.REAL_API}/crypto/search?coin=${searchCoin}`)
          if (response.data.success) {
            setSearchResults(response.data.details.coins || [])
          }

        } catch (error) {
          console.error('Search error:', error)
          toast.error('Search failed')
        } finally {
          setSearching(false)
        }
      }
      else {
        setSearchResults([])
      }
    }, 500)
    return () => clearTimeout(searchTimer)
  }, [searchCoin])

  //======================================= fetch the coin data from selected coin from search result ===================================
  const handleCoinSelect = async (coin) => {
    try {
      const response = await axios.get(`${import.meta.env.REAL_API}/crypto/coin/${coin.id}`)

      if (response.data.success) {
        setSelectedCoinData(response.data.details)
        console.log(response.data.details);

      }

    } catch (error) {
      console.error('Search error:', error)
      toast.error('coin data selecting occured error')
    }
  }
  //======================================use effect to dissapear the search result when click outside ================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
        setSearchCoin('')
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const clearSelectedData = () => {
    setSelectedCoinData(null)
    setSearchResults([])
    setSearchCoin('')
  }
  //========================================================================================================
  return (
    <div className='home-body'>
      <div className="mobile-home-container">
        <div className='home-items market-cap'>
          <p
            style={{
              fontSize: '0.7rem',
              color: '#6e6e6e'
            }}
          >
            MARKET CAP</p>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'white'
            }}
          >
            {marketCap || '$0.00'}</p>
          <p
            style={{
              color: '#00c257',
              fontSize: '0.7rem'
            }}
          >
            {marketcapPercentage !== null ? (
              `${marketcapPercentage.toFixed(2)}%`
            ) : '0.00%'}
          </p>
        </div>
        <div className='home-items daily-volume'>
          <p
            style={{
              fontSize: '0.7rem',
              color: '#6e6e6e'
            }}
          >
            24H VOLUME</p>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'white'
            }}
          >
            {totalVolume || '$0.00'}</p>
          <p
            style={{
              color: '#00c257',
              fontSize: '0.7rem'
            }}
          >
            {volumeChangePercentage !== null ? (
              `${volumeChangePercentage.toFixed(2)}%`
            ) : '0.00%'}
          </p>
        </div>

        <div className='home-items search-coins'>
          <FontAwesomeIcon icon={faMagnifyingGlass} size='sm' style={{ color: "rgb(93, 139, 221)", }} />
          <input
            onChange={(e) => setSearchCoin(e.target.value)}
            value={searchCoin}
            type="search" placeholder='Search Coins' />

          {searching && <span style={{ color: '#808080' }}>Searching...</span>}

        </div>

        {selectedCoinData !== null && (
          <div className='home-items clear-selected-coin'>
            <p>{selectedCoinData.id}</p>
            <p>({selectedCoinData.symbol})</p>
            <button
              onClick={clearSelectedData}
            >
              <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: "rgb(255, 100, 76)", }} />
            </button>
          </div>
        )}

        {searchCoin && searchCoin.trim() !== '' && (
          <div className='search-result' ref={searchResultRef}>
            {searchResults.length > 0 ? (
              <>
                {searchResults.map((coin, index) => (
                  <div
                    key={index}>
                    <button
                      onClick={() => handleCoinSelect(coin)}
                    >
                      {coin.id}</button>
                  </div>
                ))}
              </>
            ) : (
              <p>No coins found for "{searchCoin}"</p>
            )}
          </div>
        )}

        <div className='home-items heatmap'>

          {selectedCoinData !== null ? (
            <div
              style={{
                overflow: 'hidden',
                backgroundColor: selectedCoinData.market_data.price_change_percentage_24h > 0 ? '#00c853' :
                  selectedCoinData.market_data.price_change_percentage_24h < 0 ? '#ff3b30' :
                    selectedCoinData.market_data.price_change_percentage_24h == 0 ? '#4a5568' : '#4a5568',
                border: '1px solid gold'
              }}
              className='tile'>
              <p
                style={{
                  color: 'white',
                  fontWeight: 600
                }}
              >
                {selectedCoinData.symbol.toUpperCase()}</p>
              <p
                style={{
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              >
                ${selectedCoinData.market_data.current_price.usd.toFixed(3)}</p>
              <p
                style={{
                  color: 'white',
                  fontSize: '0.8rem',
                }}
              >
                <span
                  style={{
                    color: selectedCoinData.market_data.price_change_percentage_24h > 0 ? '#00ff55' : '#be2300'
                  }}
                >
                  {selectedCoinData.market_data.price_change_percentage_24h > 0 ? '↑' :
                    selectedCoinData.market_data.price_change_percentage_24h < 0 ? '↓' : '-'
                  }
                </span>
                {selectedCoinData.market_data.price_change_percentage_24h ?
                  selectedCoinData.market_data.price_change_percentage_24h.toFixed(2) :
                  ('N/A')}%
              </p>

              <img
                style={{
                  width: '20px',
                  height: '20px',
                  float: 'right'
                }}
                src={selectedCoinData.image.small} alt="" />
            </div>
          ) : (
            <>
              {coinData.length > 0 ? (
                coinData && coinData.map((item, index) => (
                  <div
                    style={{
                      overflow: 'hidden',
                      backgroundColor: item.price_change_percentage_24h > 0 ? '#00c853' :
                        item.price_change_percentage_24h < 0 ? '#ff3b30' :
                          item.price_change_percentage_24h == 0 ? '#4a5568' : '#4a5568'
                    }}
                    className='tile'
                    key={index}>
                    <p
                      style={{
                        color: 'white',
                        fontWeight: 600
                      }}
                    >
                      {item.symbol.toUpperCase()}</p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: '0.7rem'
                      }}
                    >
                      ${item.current_price.toFixed(3)}</p>
                    <p
                      style={{
                        color: 'white',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span
                        style={{
                          color: item.price_change_percentage_24h > 0 ? '#009933' : '#7e1700'
                        }}
                      >
                        {item.price_change_percentage_24h > 0 ? '↑' :
                          item.price_change_percentage_24h < 0 ? '↓' : '-'
                        }
                      </span>
                      {item.price_change_percentage_24h ?
                        item.price_change_percentage_24h.toFixed(2) :
                        ('N/A')}%
                    </p>
                    <img
                      style={{
                        width: '20px',
                        height: '20px',
                        float: 'right'
                      }}
                      src={item.image} alt="" />
                  </div>
                ))
              ) : (
                <p
                  style={{ color: 'white' }}
                >
                  no coins to display</p>
              )}

            </>
          )}


        </div>
      </div>
    </div>
  )
}

export default Home
