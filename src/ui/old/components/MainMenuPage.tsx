import React from 'react';

interface MainMenuPageProps {
    onNavigate: (page: string) => void;
}

const MainMenuPage: React.FC<MainMenuPageProps> = ({ onNavigate }) => {
    return (
        <div>
            <button onClick={() => onNavigate('game')}>Играть</button>
            <br />
            <button onClick={() => onNavigate('settings')}>Настройки</button>
            <br />
            <button onClick={() => onNavigate('profile')}>Профиль</button>
            <br />
            <button onClick={() => window.electron.quitApp()}>Выйти</button>
        </div>
    );
};

export default MainMenuPage;