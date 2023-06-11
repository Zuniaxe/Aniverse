import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar'

function Popular({rendered}) {
    const {popularAnime,isSearch, searchResults} = useGlobalContext()

    const conditionalRender = () => {
        if(!isSearch && rendered === 'popular'){
            return popularAnime?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                </Link>
            })
        }else{
            return searchResults?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                </Link>
            })
        }
    }

    return (
        <PopularStyled>
            <div className="popular-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;
    .popular-anime{
        margin-top: 0rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 1rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
        row-gap: 0px;
        background-color: #000000;
        border-top: 5px solid #38a8d1;
    }
    a{
        height: 110px;
        border-radius: 7px;
    }
    .popular-anime img {
        width: 90%; /* Adjust the image size by changing the width value */
        height: 90%; /* Maintain aspect ratio */
    }
        @media (min-width: 640px) {
            .popular-anime{
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
                a{
                    height: 500px;
                    border-radius: 7px;
                }
                a img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 15px;
                }
            }
        }

     
        `;

export default Popular