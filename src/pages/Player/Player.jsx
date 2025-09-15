import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams, useNavigate } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
       const res = await fetch(
  `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
);
        if (!res.ok) throw new Error("Failed to fetch videos");

        const data = await res.json();
        const trailer = data.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        setApiData(trailer || null);
      } catch (err) {
        setError("Could not load trailer. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="player">
      {/* Back Button */}
      <img
        src={back_arrow_icon}
        alt="Go back"
        onClick={() => navigate(-1)}
        className="back-btn"
      />

      {/* Loading */}
      {loading && <p style={{ color: "white" }}>Loading trailer...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Trailer or Fallback */}
      {!loading && !error && (
        <>
          {apiData ? (
            <iframe
              width="90%"
              height="90%"
              src={`https://www.youtube.com/embed/${apiData.key}`}
              title={apiData.name || "Trailer"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p style={{ color: "white" }}>Trailer not available</p>
          )}

          {/* Trailer Info */}
          <div className="player-info">
            <p>{apiData?.published_at?.slice(0, 10)}</p>
            <p>{apiData?.name}</p>
            <p>{apiData?.type}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
