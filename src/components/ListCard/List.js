import React from 'react';
import Card from './Card';
import './List.css';

const List = ({ data }) => {
  return (
    <div className="divList">
      <Card data={data} />
    </div>
  );
};

export default List;
