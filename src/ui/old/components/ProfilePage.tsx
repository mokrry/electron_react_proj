import React, { useState, useEffect } from 'react';

interface ProfilePageProps {
    onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNicknameChange, onNavigate }) => {
    const [nickname, setNickname] = useState("");

    // Запрос ника при монтировании компонента
    useEffect(() => {
        window.electron.getNickname()
            .then((fetchedNickname: string) => {
                setNickname(fetchedNickname);
            })
            .catch((error: Error) => {
                console.error("Ошибка получения ника:", error);
            });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
        window.electron.updateNickname(newNickname);
        onNicknameChange(e);
    };

    return (
        <div>
            <label>Никнейм:</label>
            <input type="text" value={nickname} onChange={handleInputChange} />
            {/* Если ник пустой, выводим сообщение */}
            {!nickname.trim() && <div style={{ color: 'red' }}>Ник не может быть пустой</div>}
            <br />
            <button onClick={() => onNavigate('menu')}>Главное меню</button>
        </div>
    );
};

export default ProfilePage;
