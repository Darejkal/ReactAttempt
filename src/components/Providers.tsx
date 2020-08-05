import React from 'react'
import { NewRoutes } from './newdirection/NewRoutes';
import NewAuthProvider from './newdirection/NewAuthProvider';

interface ProvidersProps {

}

export const Providers: React.FC<ProvidersProps> = ({ }) => {
    return (
        <NewAuthProvider>
            <NewRoutes />
        </NewAuthProvider>);
}



 