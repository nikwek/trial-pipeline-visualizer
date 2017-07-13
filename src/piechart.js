// Modified and simplified version of
// https://github.com/cedricdelpoux/react-svg-piechart

import React from 'react';
import PropTypes from 'prop-types';

class PieChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      color: PropTypes.string,
    })),
    sectorStrokeColor: PropTypes.string,
    sectorStrokeWidth: PropTypes.number,
    viewBoxWidth: PropTypes.number
  };

  static defaultProps = {
    data: [],
    sectorStrokeWidth: 3,
    sectorStrokeColor: '#FFF',
    viewBoxWidth: 300,
  };

  getSectors() {
    const { data, palette, sectorStrokeWidth, sectorStrokeColor, viewBoxWidth } = this.props
    const total = Math.ceil(data.reduce((n, d) => d.value + n, 0))
    const center = viewBoxWidth / 2
    let startAngle = 0
    let endAngle = 0

    return (
      data.map((d, i) => {
        const angle = 360 * d.value / total
        const largeArc = (d.value / total) <= 0.5 ? 0 : 1

        startAngle = endAngle
        endAngle = startAngle + angle

        const x1 = Math.round(center + center * Math.cos(Math.PI * startAngle / 180))
        const y1 = Math.round(center + center * Math.sin(Math.PI * startAngle / 180))

        const x2 = Math.round(center + center * Math.cos(Math.PI * endAngle / 180))
        const y2 = Math.round(center + center * Math.sin(Math.PI * endAngle / 180))

        const dPath =
          'M' + center + ',' + center + ' ' +
          'L' + x1 + ',' + y1 + ' ' +
          'A' + center + ',' + center + ' 0 ' + largeArc + ',1 ' + x2 + ',' + y2 + ' ' +
          'z'

        return (
          <path
            key={ 'sector' + i }
            d={ dPath }
            fill={ d.color || palette[i % palette.length] }
            stroke={ sectorStrokeColor }
            strokeWidth={ sectorStrokeWidth } />
        )
      })
    )
  }

  render() {
    const { viewBoxWidth, props } = this.props
    return (
      <svg viewBox={ `0 0 ${viewBoxWidth} ${viewBoxWidth}` } { ...props }>
        { this.getSectors() }
      </svg>
  )}
}

export default PieChart;