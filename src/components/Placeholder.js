import React from "react";
import ContentLoader from "react-content-loader";
import PosterLoading from './PosterLoading'

export default function Placeholder() {
  return (
    <div className="card my-3">
      <div className="card-header p-0">
        <PosterLoading />
      </div>
      <div className="card-body">
        <ContentLoader
          width={100+'%'}
          height={60}
          speed={2}
          primary-color="#f3f3f3"
          secondary-color="#7c7c7c"
          style={{ marginBottom: "4px" }}
        >
          <rect x="5%" y="10" rx="10" ry="10" width="90%" height="40" />
        </ContentLoader>
      </div>
      <div className="card-footer">
        <ContentLoader
          width={100+'%'}
          height={20}
          speed={2}
          primary-color="#f3f3f3"
          secondary-color="#7c7c7c"
          style={{ marginBottom: "4px" }}
        >
          <rect x="5%" y="5" rx="10" ry="10" width="90%" height="10" />
        </ContentLoader>
      </div>
    </div>    
  );
}
