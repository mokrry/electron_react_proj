import React from 'react';

interface ProfilePageProps {
    nickname: string;
    onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ nickname, onNicknameChange, onNavigate }) => {
    return (
        <div>
            <label>Никнейм:</label>
            <input type="text" value={nickname} onChange={onNicknameChange} />
            <br />
            <button onClick={() => onNavigate('menu')}>Главное меню</button>
        </div>
    );
};

export default ProfilePage;