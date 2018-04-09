import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContentText from '../presentation/ContentText';
import FlatButton from '../presentation/FlatButton';

export default class NoItemsParagraph extends React.Component {
  render() {
    return (
      <div>
        <ContentText>{this.props.message}</ContentText>
        <Link to="/inventory/add">
          <FlatButton>
            {this.props.buttonLabel}
          </FlatButton>
        </Link>
      </div>
    );
  }
}

NoItemsParagraph.propTypes = {
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
