import React from 'react';

interface LogoutPageProps {
    onNavigate: (page: string) => void;
}

const LogoutPage: React.FC<LogoutPageProps> = ({ onNavigate }) => {
    return (
        <div>
            <h1>Error 404</h1>
            <button onClick={() => onNavigate('menu')}>Главное меню</button>
        </div>
    );
};

export default LogoutPage;