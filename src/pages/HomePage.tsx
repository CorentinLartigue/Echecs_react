import { Link } from 'react-router-dom';
import Title from 'src/components/Shared/Title';

const HomePage: React.FC = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
      <div className="flex flex-col items-center justify-center h-screen "  >
        <Title text="Notre Jeux d'échecs en React"/>
        <Link to="/game" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          JOUER
        </Link>
        <Link to="/stat" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4">
          STATISTIQUE
        </Link>
      </div>
    </div>
  );
};

export default HomePage;