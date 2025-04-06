import React from 'react';

interface LogoutPageProps {
    onNavigate: (page: string) => void;
}

const LogoutPage: React.FC<LogoutPageProps> = ({ onNavigate }) => {
    const handleQuit = () => {
        // Вызываем функцию для завершения работы приложения

        window.electron.quitApp();
    };
    handleQuit();
    return (
        <div>
        </div>
    );
};

export default LogoutPage;
