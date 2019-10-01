import React from 'react';

function PasteBin(props) {
  return (
    <textarea
      style={{
        width: '100%',
        margin: '12px 0',
        outline: 'none',
        padding: 12,
        border: '2px solid #eee',
        color: '#666',
        borderRadius: 4,
      }}
      rows={25}
      {...props}
    />
  );
}

export default PasteBin;
