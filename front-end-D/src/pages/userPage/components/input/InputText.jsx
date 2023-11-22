import React, { useState } from 'react';


const InputText = ({
  title, id, errors, touched, ...props
}) => {
  
    const handleInputChange = (event) => {        
    };
  return (

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-1" htmlFor={id}>
        {title}
      </label>
      {errors && touched ? (<div className="text-sm text-red-700 mb-1">{errors}</div>) : (<div className="mb-3"></div>) }
      <input 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id={id} {...props}
      onChange={handleInputChange}
      />
    </div>
  );
};

export default InputText;
