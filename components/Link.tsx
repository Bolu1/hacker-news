import React from 'react';

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div className='text-center m-5 p-4 rounded-md bg-gray-100'>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;
