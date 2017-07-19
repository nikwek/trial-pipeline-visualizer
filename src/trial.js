import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PieChart from './piechart';
import colors from './colors';
import Color from 'color';

class Trial extends React.PureComponent {
  static propTypes = {
    trial: PropTypes.shape({
      name: PropTypes.string,
      state: PropTypes.string,
      slug: PropTypes.string,
      age: PropTypes.number,
      agents_count: PropTypes.number,
      pipelines_count: PropTypes.number,
      invites_count: PropTypes.number,
      builds_count: PropTypes.number,
      passed_builds_count: PropTypes.number,
    }).isRequired
  };

  render() {
    return (
      <div className={classNames("Trial", `Trial--state-${this.props.trial.state}`)} title={this.props.trial.name}>
        <div style={{ position:'absolute', top:0, left:0, width: '100%', height: '100%', zIndex: 2 }}>
          {this._chartLabel(this._agentsCount(), {top:-5, left:'calc(50% - 1.25em)', borderColor: this._agentsColor(), color: this._agentsColor()}, 'Agents')}
          {this._chartLabel(this._buildsCount(), {top:'55%', left:-2, borderColor: this._buildsColor(), color: this._buildsLabelColor()}, 'Ran a Passing Build')}
          {this._chartLabel(this._invitesCount(), {top:'55%', right:-2, borderColor: this._membersColor(), color: this._membersColor()}, 'Invites')}
        </div>
        <div style={{ position:'absolute', top:0, left:0, zIndex: 1, width: '100%', height: '100%', transform: 'rotate(210deg)' }}>
          <PieChart
            data={ this._chartData() }
            sectorStrokeColor={colors.background}
            viewBoxWidth={85}
            sectorStrokeWidth={1} />
        </div>
        <div className="Trial__name">
          <a href={"https://buildkite.com/admin/accounts/"+this.props.trial.slug}>{this.props.trial.name}</a>
        </div>
        <div className="Trial__age" style={{ color: this._idColor() }}>{this.props.trial.age}d</div>
      </div>
    )
  }

  _chartData() {
    return [
      {value: 100, color: this._agentsColor()},
      {value: 100, color: this._membersColor()},
      {value: 100, color: this._buildsColor()}
    ]
  }

  _color(activeColor, isActive) {
    if (this.props.trial.state == 'active') {
      return isActive ? colors.gold : colors.darkGold
    } else if (this.props.trial.state == 'trial_expired') {
      return isActive ? Color(activeColor).darken(0.75).string() : colors.inactive;
    } else {
      return isActive ? activeColor : colors.inactive;
    }
  }

  _idColor() {
    if (this.props.trial.state == 'trial_expired')
      return '#444'
    else
      return '#aaa'
  }

  _agentsColor() {
    return this._color(colors.agents, this.props.trial.agents_count > 0);
  }

  _membersColor() {
    return this._color(colors.members, this.props.trial.invites_count > 0);
  }

  _buildsColor() {
    return this._color(colors.builds, this.props.trial.passed_builds_count > 0);
  }

  _buildsLabelColor() {
    return this.props.trial.passed_builds_count != 0 ? this._buildsColor() : this._color(colors.builds_not_passing, true);
  }

  _agentsCount() {
    return this.props.trial.agents_count
  }

  _buildsCount() {
    return this.props.trial.passed_builds_count != 0 ? this.props.trial.passed_builds_count : this.props.trial.builds_count
  }

  _invitesCount() {
    return this.props.trial.invites_count
  }

  _chartLabel(number, style, title) {
    if (number > 0) {
      return (
        <span className="Trial__chart-label" style={style} title={title}>{number}</span>
      )
    }
  }
}


export default Trial;
