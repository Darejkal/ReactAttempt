import React from 'react'
// import { AuthProvider } from './olddirection/AuthProvider';
//import { Routes } from "./olddirection/Routes";
import { NewRoutes } from './newdirection/NewRoutes';
import NewAuthProvider from './newdirection/NewAuthProvider';

interface ProvidersProps {

}

export const Providers: React.FC<ProvidersProps> = ({ }) => {
    // return (<AuthProvider>
    //     <Routes />
    // </AuthProvider>);
    return (
        <NewAuthProvider>
            <NewRoutes />
        </NewAuthProvider>);
}