import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar'

function Upcoming({ rendered }) {
    const { upcomingAnime, isSearch, searchResults } = useGlobalContext()

    const conditionalRender = () => {
        if (!isSearch && rendered === 'upcoming') {
            if (upcomingAnime.length !== 0) {
                return upcomingAnime?.map((anime) => {
                    return (
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <img src={anime.images.jpg.large_image_url} alt="" />
                        </Link>
                    )
                })
            } else {
                return (
                    <div className="exu" style={{ gridColumn: 'span 2' }}>
                        <img src="/exusiai.png" alt="" style={{ width: '100%', height: '100%' }} />
                    </div>
                )
            }
        } else {
            if (!isSearch && rendered === 'upcoming') {
                return searchResults?.map((anime) => {
                    return (
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <img src={anime.images.jpg.large_image_url} alt="" />
                        </Link>
                    )
                })
            } else {
                return (
                    <div className="exu" style={{ gridColumn: 'span 2' }}>
                        <img src="/exusiai.png" alt="" style={{ width: '100%', height: '100%' }} />
                    </div>
                )
            }
        }
    }

    return (
        <PopularStyled>
            <div className="upcoming-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;
    .upcoming-anime {
        margin-top: 0rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
        row-gap: 0px;
        background-color: #000000;
        border-top: 5px solid #38a8d1;
    }
    a {
        height: 180px;
        border-radius: 7px;
    }
    .upcoming-anime img {
        width: 90%; /* Adjust the image size by changing the width value */
        height: auto; /* Maintain aspect ratio */
    }
    .exu {
        display: flex;
        justify-content: center;
        padding-left:rem;
        height: 130px; /* Adjust the height value as needed */
        width: 210px; /* Adjust the width value as needed */
    }
    @media (min-width: 640px) {
        .upcoming-anime {
            margin-top: 2rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
            padding-left: 5rem;
            padding-right: 5rem;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 2rem;
            background-color: #000000;
            border-top: 5px solid #38a8d1;
        }
        .exu {
            display: flex;
            justify-content: center;
            padding-right: rem;
            height: 900px; /* Adjust the height value as needed */
            width: 1600px; /* Adjust the width value as needed */
        }
        a {
            height: 500px;
            border-radius: 7px;
        }
        a img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px;
        }
    }
`;

export default Upcoming;
