import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Circle from '../presentation/Circle';

export default class CircleButton extends React.Component {
  render() {
    const { linkTo, ...props } = this.props;

    return (
      <Link to={linkTo}>
        <Circle isButton {...props}>
          {this.props.children}
        </Circle>
      </Link>
    );
  }
}

CircleButton.propTypes = {
  children: PropTypes.element.isRequired,
  linkTo: PropTypes.string.isRequired,
};
