import React from 'react';
import Sidebar from './Sidebar';
import Body from './Body';

const Main = () => {
  return (
    <div className="flex">
     
      <div className="flex-1">
        <Body />
      </div>
    </div>
  );
};

export default Main;
