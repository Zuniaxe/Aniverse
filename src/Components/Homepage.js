import React from 'react'
import { useGlobalContext } from '../context/global'
import Popular from './Popular'
import styled from 'styled-components'
import Upcoming from './Upcoming'
import Airing from './Airing'

function Homepage() {

    const { handleSubmit, search, searchAnime, handleChange, getUpcomingAnime, getAiringAnime, getPopularAnime } = useGlobalContext()

    const [rendered, setRendered] = React.useState('popular')

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }

    return (
        <HomepageStyled>
            <header>
                <div className="logo">
                <h1>
                       <img src="/Aniverse.png" 
                       width="100%"
                       height="100%">
                       </img>
                    </h1>
                </div>
                <div className="search-container">
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="filter-btn popular-filter">
                        <button onClick={() => {
                            setRendered('popular')
                        }}>Popular<i className="fas fa-fire"></i></button>
                    </div>
                    <div className="filter-btn airing-filter">
                        <button onClick={() => {
                            setRendered('airing')
                            getAiringAnime()
                        }}>Airing</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() => {
                            setRendered('upcoming')
                            getUpcomingAnime()
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomepageStyled>
    )
}

const HomepageStyled = styled.div`
    background-color: #000000;
    header {
        width: 100%;
        margin: 0;
        padding: 4rem 1rem;
        transition: all .4s ease-in-out;
        @media (min-width: 640px) {
            padding: 10rem 0rem;
            padding-right: 2rem;
            width: 90%;
            margin: 0 auto;
        }
        .logo {
            margin-bottom: 3rem;
            font-size: 15px;
            display: flex;
            align-items: left;
            justify-content: left;
            @media (min-width: 640px) {
                font-size: 25px;
            }
        }
        .search-container {
            flex-direction: column;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: .20rem 3rem;
        }
        
        @media (min-width: 640px) {
            .search-container {
                flex-direction: row;
                padding: .7rem 3rem;
            }
        }
            button {
                display: flex;
                align-items: center;
                gap: .2rem;
                padding: .7rem 3rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                color: #fff;
                background-color: #000000;
                cursor: pointer;
                transition: all .4s ease-in-out;
                font-family: inherit;
                border: 5px solid #e5e7eb;
                background-color: #38a8d1;
                color: #fff;
                border-color: #38a8d1;
            }
            form {
                order: -1;
                @media (min-width: 640px) {
                    order: 0;
                }
                position: relative;
                width: 100%;
                .input-control {
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                input[type="text"] {
                    width: 100%;
                    padding: .7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    background-color: #fff;
                    border: 5px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                button[type="submit"] {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
`

export default Homepage
