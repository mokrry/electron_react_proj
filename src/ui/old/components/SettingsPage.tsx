import React from 'react';

interface SettingsPageProps {
    volume: number;
    onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNavigate: (page: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ volume, onVolumeChange, onNavigate }) => {
    return (
        <div>
            <label>Громкость: {volume}</label>
            <br />
            <input type="range" min="0" max="100" value={volume} onChange={onVolumeChange} />
            <br />
            <button onClick={() => onNavigate('menu')}>Главное меню</button>
        </div>
    );
};

export default SettingsPage;