import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../Button/Button';

function AdminLogin({ onLogin }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message || t('adminLogin.error'));
        setLoading(false);
        return;
      }

      const { token } = await res.json();
      onLogin(token);
    } catch (e) {
      setError(t('adminLogin.errorNetwork'));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="aam_admin-login-form">
      <label htmlFor="username">{t('adminLogin.username')}</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        disabled={loading}
        autoComplete="username"
        required
      />

      <label htmlFor="password">{t('adminLogin.password')}</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
        autoComplete="current-password"
        required
      />

      <Button
        type="submit"
        disabled={loading}
        variant="green"
        label={loading ? t('adminLogin.loading') : t('adminLogin.submit')}
      >
        {loading ? t('adminLogin.loading') : t('adminLogin.submit')}
      </Button>

      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default AdminLogin;
