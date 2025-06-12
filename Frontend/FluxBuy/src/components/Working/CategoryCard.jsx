import React from 'react';

const CategoryCard = ({ name, active }) => {
  return (
    <div
      style={{
        minWidth: '130px',
        height: '110px',
        border: active ? 'none' : '1px solid #ccc',
        backgroundColor: active ? '#ef4444' : '#fff',
        color: active ? '#fff' : '#000',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
      <p style={{ fontSize: '14px', fontWeight: 500 }}>{name}</p>
    </div>
  );
};

export default CategoryCard;
