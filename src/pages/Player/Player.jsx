import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjk4YzhjZDY1N2QxNGFjOWViMjhjYTZlZDQ1MmE2ZSIsIm5iZiI6MTc1MDY5OTY5MS40LCJzdWIiOiI2ODU5OGVhYjJlZTY2YTAwOGNiMzQwN2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pmD2JIxoILKMHRFOppBhUDhvKpLBQthahln3EL9bWyo'
  }
};

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        const trailer = res.results?.find(
          video => video.site === "YouTube" && video.type === "Trailer"
        );
        if (trailer) setApiData(trailer);
        else console.warn("No trailer found for this movie.");
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate('/')} />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: 'white' }}>Trailer not available</p>
      )}
      <div className='player-info'>
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name }</p>
        <p>{apiData.type }</p>
      </div>
    </div>
  );
};

export default Player;


