import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../context/global';


function Sidebar() {
    const {popularAnime} = useGlobalContext()

    const sorted = popularAnime?.sort((a,b) => {
        return b.score - a.score
    })

    return (
        <SidebarStyled>
            <h3>Top 5 
            </h3>
            <h3>Anime
            </h3>
            <div className="anime">
                {sorted?.slice(0,5).map((anime) => {
                    return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                        <h5>
                            {anime.title}
                        </h5>
                    </Link>
                })}
            </div>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`

    margin-top: 0rem;
    background-color: #2d2d2d;
    border-top: 5px solid #38a8d1;
    padding-right: 0rem;
    padding-left: 1rem;
    padding-top: 2rem;
    .anime{
        display: flex;
        flex-direction: column;
        grid-gap: 2rem;
        width: 80px;
        img{
            width: 100%;
            height:auto;
            border-radius: 5px;
   
        }
        a{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .2rem;
            color: #adabab;
            padding-right: 1rem;
                font-size: 13px;
            
        }
        }
    }

@media (min-width: 640px) {
    margin-top: 2rem;
    background-color: #2d2d2d;
    border-top: 5px solid #38a8d1;
    padding-right: 0rem;
    padding-left: 2rem;
    padding-top: 2rem;
    .anime{
        display: flex;
        flex-direction: column;
        grid-gap: 5rem;
        width: 150px;
        img{
            width: 100%;
            height:auto;
            border-radius: 5px;
   
        }
        a{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            color: #adabab;
            padding-right: 2rem;
            h4{
                font-size: 1.1rem;
            }
    
            }
        }
    }
`;

export default Sidebar