import React from 'react';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './Loading.css';

const Loading = () => {
  return (
    <Loader
      className="loading"
      type="Circles"
      color="#00BFFF"
      height={200}
      width={100}
    />
  );
};
export default Loading

