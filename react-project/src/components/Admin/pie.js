import React from 'react';

export var myPalette = ['#FADAD8', '#7C7877'];

export function customizeTooltip(point) {
    return {
      text: `${point.argumentText} - ${(point.percent * 100).toFixed(2)}%`
    }
}

export function center(pieChart) {
  const url = '../../Asset/Asset_Logo_S.png'
  const vipnum = pieChart.getAllSeries()[0].getVisiblePoints()[0].data.value;
  return (
    <svg>
      <circle cx="0" cy="0" r={pieChart.getInnerRadius() - 6} fill="#eee"></circle>
      <image href={url} x="0" y="0" width="60" height="40" />
      <text textAnchor="middle" x="100" y="120" style={{ fontSize: 18, fill:'#494949' }}>
        <tspan x="100">VIP User</tspan>
        <tspan x="100" dy="20px" style={{ fontWeight: 600 }}>{
          vipnum
        }</tspan>
      </text>
    </svg>
  );
}

export const myformat = {
  type: "fixedPoint", 
  precision: 1
}