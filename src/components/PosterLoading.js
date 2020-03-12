import React from "react";
import genericPoster from '../media/film-poster-placeholder.png';
import '../style/PosterLoading.css';

export default function PosterLoading(props) {
  return (
    <div className="loader-container">
      <img alt="loading" className="feed__loading-item" src={genericPoster} width="100%" />
      <div className="loader" onClick={() => props.detailsHandler(props.movieId)}>
      <div className="lds-ripple"><div></div><div></div></div>
        {/* <ul>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
          <li><div></div></li>
        </ul> */}
      </div>
    </div>  
  );
}
