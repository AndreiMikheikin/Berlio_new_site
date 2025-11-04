import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import '../../../styles/components/ComplexComponents/LogBook/LogBookLogin.scss';

function LogBookLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/log-book-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Ошибка авторизации');
        setLoading(false);
        return;
      }

      onLogin(data.token, data.user);
    } catch (e) {
      setError('Ошибка сети. Попробуйте позже.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="aam_logbook-login__form" noValidate>
      <div className="aam_logbook-login__form--input">
        <label htmlFor="username">Логин</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
          required
          autoComplete="username"
        />
      </div>

      <div className="aam_logbook-login__form--input">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          required
          autoComplete="current-password"
        />
      </div>
      
      <Button
        type="submit"
        disabled={loading}
        variant="gray"
        label={loading ? 'Вход...' : 'Войти'}
      >
        {loading ? 'Вход...' : 'Войти'}
      </Button>

      {error && <p role="alert" className="aam_logbook-login__error">{error}</p>}
    </form>
  );
}

LogBookLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LogBookLogin;
