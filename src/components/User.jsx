import React from 'react';
import {getImageOrDefault} from '../utility/utility.js'

export default function User({ name, image, children }) {
    return (
      <div className="d-flex align-items-center text-black text-decoration-none py-1">
        <img
          src={getImageOrDefault(image)}
          className="avatar me-2"
          alt=''
        />
        <strong>{name}</strong>
        {children}
      </div>
    );
  }