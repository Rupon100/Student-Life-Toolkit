import React from 'react';
import useAuth from './useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log("location from private route: ", location);
        if(loading){
        return <h2>Loading....</h2>
    }
    if(user){
        return children;
    }

    return <Navigate to={'/login'} state={location?.pathname} replace> </Navigate>
};

export default PrivateRoute;