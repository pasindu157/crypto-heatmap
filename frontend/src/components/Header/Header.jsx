import React, { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { navLinks } from '../../assets/data.js';
import { motion } from 'framer-motion'

const Header = () => {

    const [activeIndex, setActiveIndex] = useState(null)

    const whenTap = (index) => {
        setActiveIndex(index)

    }

    return (
        <div>
            <div className="mob-nav-container">
                <motion.div
                initial={{opacity:0, y: "-120%"}}
                animate={{opacity:1, y: 0}}
                transition={{type:'spring', stiffness: 300, damping: 40, ease:'easeIn'}} 
                className="top-section">
                    <nav>
                        <ul>
                            <li>
                                <div className='logo'>
                                    <div className="logo-icon">C</div>
                                    <div className="brand">CryptoViz</div>
                                </div>
                            </li>
                            <div className="right">
                                <li>
                                    <button className='setting-btn'>
                                        <FontAwesomeIcon icon={faGear} style={{ color: "#88b0fb", }} />
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </nav>
                </motion.div>

                <motion.div 
                initial={{opacity:0, y: "120%"}}
                animate={{opacity:1, y: 0}}
                transition={{type:'spring', stiffness: 300, damping: 40, ease:'easeIn'}}
                className="bottom-section">
                    <nav>
                        <ul>
                            {navLinks.map((item) => (
                                <li key={item.id}>
                                    <Link to={item.path}>
                                        <motion.img
                                            whileTap={() => whenTap(item.id)}
                                            animate={activeIndex === item.id ? { backgroundColor: "#56d4f44a" } : {}}
                                            src={item.img} alt="" />
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.div>
            </div>
        </div>
    )
}

export default Header
