import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        history.push('/');
    }

    /**
     * Sets Hard coded token to localStorage, Fake login
     */
    const handleLogin = () => {
        const hardCodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxNjIzOTAyMiwiZW1haWwiOiJhYmNAZXhhbXBsZS5jb20iLCJpbmZvIjp7Im5hbWUiOiJTaG9haWIgQWhtYWQiLCJmYXZvcml0ZUZvb2QiOiJNYW5nbyIsImhhaXJDb2xvciI6IlJlZCJ9fQ.Bb_96C75Bs_3b8mawvfJtybSdnjN-cYwGvm42VQ-jH8'
        setToken(hardCodedToken);
        localStorage.setItem('token', hardCodedToken);
        history.push('/');
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={handleLogin}>Log In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
        </div>
    );
}