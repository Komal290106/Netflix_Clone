import React, { useRef, useEffect, useState } from 'react';
import './TitleCard.css';
import { Link } from 'react-router-dom';

const TitleCard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res); // log to inspect
        setApiData(res.results || []);
      })
      .catch(err => console.error('API Error:', err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
  <div className='title-card'>
    <h2>{title ? title : "Popular on Netflix"}</h2>
    <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index) =>{
        return<Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
      })}
    </div>
  </div>
)
}

export default TitleCard;


