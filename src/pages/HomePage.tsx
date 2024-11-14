import { Link } from 'react-router-dom';
import Title from 'src/components/Shared/Title';

const HomePage: React.FC = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
      <div className="flex flex-col items-center justify-center h-screen "  >
        <Title text="Notre Jeux d'échecs en React"/>
        <Link to="/game" className="bg-gradient-to-r from-gray-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
          JOUER
        </Link>
        <Link to="/stat" className="bg-gradient-to-r from-gray-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
          STATISTIQUE
        </Link>
        <Link to="/explication" className="bg-gradient-to-r from-gray-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
          EXPLICATION REGLES
        </Link>
      </div>
    </div>
  );
};

export default HomePage;