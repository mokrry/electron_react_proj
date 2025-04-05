interface GamePageProps {
    onNavigate: (page: string) => void;
}

const GamePage: React.FC<GamePageProps> = ({ onNavigate }) => {

    return (
        <div>
            <h1>Игра</h1>
            {/* Кнопка для возврата в главное меню */}
            <button onClick={() => onNavigate('menu')}>Главное меню</button>
        </div>
    );
};

export default GamePage;