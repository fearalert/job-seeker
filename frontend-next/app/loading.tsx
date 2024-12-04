import React from 'react';

const LoadingView = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-primary border-solid mb-4"></div>
        <p className="text-primary text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingView;
