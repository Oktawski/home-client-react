import { Navigate } from 'react-router-dom';
import { authenticationService } from '../services/authentication.service';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    if (!authenticationService.isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
}
