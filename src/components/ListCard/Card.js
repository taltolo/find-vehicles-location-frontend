import React from 'react';
import './Card.css';

const Card = ({ data }) => {
  return data
    ? data.map((vehicle, index) => {
        return (
          <div
            className="card"
            style={{
              background: vehicle.state === 'online' ? '	#00FA9A' : '	#FF4500',
            }}
          >
            <div className="card_body">
              <h1 className="card_title">VEHICLE {index + 1}</h1>
              <h3>id : {vehicle.id}</h3>
              <p className="card_p">state : {vehicle.state}</p>
            </div>
          </div>
        );
      })
    : null;
};
export default Card;
