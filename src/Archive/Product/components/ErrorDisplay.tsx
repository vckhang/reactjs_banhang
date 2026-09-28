import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="text-center py-40 text-red-500">
      <p className="text-lg font-medium">Có lỗi xảy ra</p>
      <p className="text-sm mt-4">{error}</p>
    </div>
  );
};

export default ErrorDisplay;