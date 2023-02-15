import React from 'react';
import ContentLoader from 'react-content-loader';

function Skeleton(props) {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="127" cy="127" r="127" />
      <rect x="0" y="NaN" rx="0" ry="0" width="261" height="NaN" />
      <rect x="0" y="287" rx="0" ry="0" width="277" height="0" />
      <rect x="3" y="258" rx="10" ry="10" width="280" height="19" />
      <rect x="-1" y="283" rx="0" ry="0" width="280" height="88" />
      <rect x="5" y="379" rx="10" ry="10" width="95" height="25" />
      <rect x="138" y="427" rx="0" ry="0" width="0" height="6" />
      <rect x="140" y="379" rx="22" ry="22" width="135" height="40" />
    </ContentLoader>
  );
}

export default Skeleton;
