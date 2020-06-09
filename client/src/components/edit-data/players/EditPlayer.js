import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlayer, getPlayerById } from '../../../actions/player';
// import Moment from 'react-moment'

const EditPlayer = ({
  player: { player, loading },
  createPlayer,
  getPlayerById,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    avatar: '',
    birth: '',
  });
  // goals

  useEffect(() => {
    getPlayerById(player._id);

    setFormData({
      firstName: loading || !player.firstName ? '' : player.firstName,
      lastName: loading || !player.lastName ? '' : player.lastName,
      name: loading || !player.name ? '' : player.name,
      avatar: loading || !player.avatar ? '' : player.avatar,
      birth: loading || !player.birth ? '' : player.birth,
    });
  }, [loading, getPlayerById]);

  const { firstName, lastName, name, avatar, birth } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createPlayer(formData, true);
  };

  return (
    <div className='beginning'>
      <div className='darker-bg'>
        <Fragment>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <p className='lead'>
              <i className='fas fa-user'></i> Edycja zawodniczki
            </p>
            <div className='form-group'>
              <small className='form-text'>*Imię:</small>
              <input
                type='text'
                placeholder='Imię'
                name='firstName'
                value={firstName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>*Nazwisko:</small>
              <input
                type='text'
                placeholder='Nazwisko'
                name='lastName'
                value={lastName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>Pseudonim:</small>
              <input
                type='text'
                placeholder='Pseudonim'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>Zdjęcie:</small>
              <input
                type='text'
                placeholder='Zdjęcie'
                name='avatar'
                value={avatar}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>Data urodzenia:</small>
              <input
                type='text'
                placeholder='Data urodzenia'
                name='birth'
                value={birth}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className='btn btn-primary'
              value='Potwierdź'
            />{' '}
            <Link className='btn btn-warning my-1 white' to='edit-data'>
              Wróć do danych
            </Link>
          </form>
        </Fragment>
      </div>
    </div>
  );
};

EditPlayer.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  getPlayerById: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, { createPlayer, getPlayerById })(
  EditPlayer
);
