import React from 'react';
import Card from './Card';
import './List.css';

const List = ({ data }) => {
  return (
    <div
      className="divList"
      style={{
        float: 'left',
        background: '#f5f5f5',
        width: '40vw',
        maxHeight: '650px',
        scrollbarWidth: 'none',
        overflowY: 'scroll',
        border: '1px solid black',
        alignContent: 'center',
      }}
    >
      <Card data={data} />
    </div>
  );
};

export default List;
