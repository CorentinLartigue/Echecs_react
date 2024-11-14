import { createBrowserRouter } from 'react-router-dom';
import GamePage from 'src/pages/GamePage';
import HomePage from 'src/pages/HomePage';
import StatistiquePage from 'src/pages/StatistiquePage';
import ExplicationJeux from 'src/pages/ExplicationJeux';


const router = createBrowserRouter([
  {
    path:"/",
    element :<HomePage/>,

  },
  {
    path: "/game",
    element: <GamePage/>
  },
  {
    path: "/stat",
    element: <StatistiquePage/>
  },
  {
    path: "/explication",
    element: <ExplicationJeux/>
  },
  


]);

export default router;