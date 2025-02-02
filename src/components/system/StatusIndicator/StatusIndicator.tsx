import React from "react";

interface IStatusIndicator {
  color: string;
}

export const StatusIndicator: React.FC<IStatusIndicator> = ({ color }) => (
  
    <svg width="20" height="20" viewBox="0 0 100 100" style={{verticalAlign: 'middle'}}>
      <circle cx="50" cy="50" r="20" fill={color} />
    </svg>
  
);
