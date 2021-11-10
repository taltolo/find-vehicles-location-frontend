import React from 'react';
import './Card.css';
import { AiOutlineCar } from 'react-icons/ai';

const Card = ({ data }) => {
  return data
    ? data?.map((vehicle, index) => {
        return (
          <div
            className="card"
            style={{
              background: vehicle.state === 'online' ? '	#00FA9A' : '	#FF4500',
            }}
          >
            <div className="card_body">
              <div className="div_title">
                <div>
                  <AiOutlineCar className="icon_car" />
                </div>
                <h1 className="card_title">VEHICLE {index + 1}</h1>
              </div>
              <p className="card_p">id : {vehicle.id}</p>
              <p className="card_p">state : {vehicle.state}</p>
            </div>
          </div>
        );
      })
    : null;
};
export default Card;
