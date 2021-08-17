import { Redirect, Route } from 'react-router-dom';
import { useUser } from './useUser';

export const PublicRoute = props => {
    const user = useUser();

    if (user) return <Redirect to="/" />

    return <Route {...props} />
}