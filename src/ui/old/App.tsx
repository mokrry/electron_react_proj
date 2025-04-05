import React, { useState } from 'react';
import MainMenuPage from './components/MainMenuPage.tsx';
import GamePage from './components/GamePage.tsx';
import SettingsPage from './components/SettingsPage.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import LogoutPage from './components/LogoutPage.tsx';
import { AppState } from './types';
import './App.css';
 
const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        currentPage: 'menu',
        volume: 50,
        nickname: '',
    });

    const navigate = (page: string) => {
        setState({ ...state, currentPage: page });
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, volume: parseInt(event.target.value) });
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, nickname: event.target.value });
    };

    const renderPage = () => {
        switch (state.currentPage) {
            case 'menu':
                return <MainMenuPage onNavigate={navigate} />;
            case 'game':
                return <GamePage onNavigate={navigate} />;
            case 'settings':
                return (
                    <SettingsPage
                        volume={state.volume}
                        onVolumeChange={handleVolumeChange}
                        onNavigate={navigate}
                    />
                );
            case 'profile':
                return (
                    <ProfilePage
                        nickname={state.nickname}
                        onNicknameChange={handleNicknameChange}
                        onNavigate={navigate}
                    />
                );
            case 'logout':
                return <LogoutPage onNavigate={navigate} />;
            default:
                return null;
        }
    };

    return <div>{renderPage()}</div>;
};

export default App;


/*
import React from 'react';
import Game from "./components/TestComp/Game.tsx";

const App: React.FC = () => {
    return (
        <div>
            <Game/>
        </div>
    );
};

export default App;

 */