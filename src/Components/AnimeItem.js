import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function AnimeItem() {
    const { id } = useParams();

    //state
    const [anime, setAnime] = React.useState({});
    const [characters, setCharacters] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

    //destructure anime
    const {
        title,
        synopsis,
        trailer,
        duration,
        aired,
        season,
        images,
        rank,
        score,
        scored_by,
        popularity,
        status,
        rating,
        source,
    } = anime;

    //get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
    };

    //get characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        console.log(data.data);
    };

    //initial render
    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, []);

    return (
        <AnimeItemStyled>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} 
                        alt="" 
                        style={{ width: '250px', height: '350px' }}/>
                    </div>
                    <div className="anime-details">
                        <p>
                            <span>Aired:</span>
                            <span>{aired?.string}</span>
                        </p>
                        <p>
                            <span>Rating:</span>
                            <span>{rating}</span>
                        </p>
                        <p>
                            <span>Rank:</span>
                            <span>{rank}</span>
                        </p>
                        <p>
                            <span>Score:</span>
                            <span>{score}</span>
                        </p>
                        <p>
                            <span>Scored By:</span>
                            <span>{scored_by}</span>
                        </p>
                        <p>
                            <span>Popularity:</span>
                            <span>{popularity}</span>
                        </p>
                        <p>
                            <span>Status:</span>
                            <span>{status}</span>
                        </p>
                        <p>
                            <span>Source:</span>
                            <span>{source}</span>
                        </p>
                        <p>
                            <span>Season:</span>
                            <span>{season}</span>
                        </p>
                        <p>
                            <span>Duration:</span>
                            <span>{duration}</span>
                        </p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? (
                    <iframe
                        src={trailer?.embed_url}
                        title="Inline Frame Example"
                        width="100%"
                        height="0"
                        style={{ paddingBottom: '0%' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <h3>Trailer not available</h3>
                )}
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const { role } = character;
                    const { images, name, mal_id } = character.character;
                    return (
                        <Link to={`/character/${mal_id}`} key={index}>
                            <div className="character">
                                <img src={images?.jpg.image_url} alt="" />
                                <h4>{name}</h4>
                                <p>{role}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </AnimeItemStyled>
    );
}

const AnimeItemStyled = styled.div`

    padding: 3rem 2rem;
    background-color: #000000;
    h1 {
        display: inline-block;
        font-size: 2rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        color: #38a8d1;
        transition: all 0.4s ease-in-out;
        &:hover {
            transform: skew(-3deg);
        }
    
    }
    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        color: #38a8d1;
    }

    .description {
        margin-top: 2rem;
        font-size: 1rem;
        color: #adabab;
        line-height: 1.7rem;
        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1rem;
            color: #38a8d1;
            font-weight: 500;
        }
    }

    .trailer-con {
        position: relative;
        left: 34%;
        width: 40%;
        height: 500px;
        padding-bottom: 1%;
        margin-top: 3rem;
        
    
        iframe {
            position: relative;
            
            right: 80%;
            width: 240%;
            height: 60%;
            outline: none;
            border: none;
            border-radius: 10px;
            background-color: #2d2d2d;
        }
    }
    

    .details {
        background-color: #2d2d2d;
        border-radius: 20px;
        padding: 2rem;

        .detail {
            display: grid;
            grid-template-columns: repeat(100px, 1fr);
            img {
                border-radius: 7px;
            }
        }
        .anime-details {
            display: flex;
            padding-top: 3rem;
            flex-direction: column;
            align-items: left;
            justify-content: space-between;
            p {
                display: absolute;
                gap: 1rem;
                justify-content: left;
                font-size: 1rem;
                
            }
            p span:first-child {
                font-weight: 550;
                color: #adabab;
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        grid-gap: 1 rem;
        background-color: #2d2d2d;
        padding: 0rem;
        border-radius: 20px;
        border: 5px solid #2d2d2d;
        .character {
            padding: 1.4rem 0.6rem;
            border-radius: 7px;
            background-color: #2d2d2d;
            transition: all 0.4s ease-in-out;
            img {
                width: 100%;
            }
            h4 {
                padding: 0.5rem 0;
                font-size: 0.9rem;
                color: #adabab;
            }
            p {
                font-size: 0.9rem;
                color: #38a8d1;
            }
            &:hover {
                transform: translateY(-5px);
            }
        }
    }                                           

@media (min-width: 640px) {
    padding: 3rem 2rem;
    background-color: #000000;
    h1 {
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        color: #38a8d1;
        transition: all 0.4s ease-in-out;
        &:hover {
            transform: skew(-3deg);
        }
    }
    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        color: #38a8d1;
    }

    .description {
        margin-top: 2rem;
        color: #adabab;
        line-height: 1.7rem;
        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #38a8d1;
            font-weight: 600;
        }
    }

    .trailer-con {
        position: relative;
        left: 15%;
        width: 70%;
        height: 700px;
        padding-bottom: 1%;
        margin-top: 3rem;
        
    
        iframe {
            position: relative;
            
            left: 0%;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            border-radius: 10px;
            background-color: #2d2d2d;
        }
    }
    

    .details {
        background-color: #2d2d2d;
        border-radius: 20px;
        padding: 2rem;

        .detail {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img {
                border-radius: 7px;
            }
        }
        .anime-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                display: flex;
                gap: 1rem;
            }
            p span:first-child {
                font-weight: 600;
                color: #adabab;
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 0 rem;
        background-color: #2d2d2d;
        padding: -20rem;
        border-radius: 20px;
        border: 5px solid #2d2d2d;
        .character {
            padding: 1.4rem 0.6rem;
            border-radius: 7px;
            background-color: #2d2d2d;
            transition: all 0.4s ease-in-out;
            img {
                width: 100%;
            }
            h4 {
                padding: 0.5rem 0;
                color: #adabab;
            }
            p {
                color: #38a8d1;
            }
            &:hover {
                transform: translateY(-5px);
            }
        }
    }                                           }
`;

export default AnimeItem;
