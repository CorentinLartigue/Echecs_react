import { createBrowserRouter } from 'react-router-dom';
import GamePage from 'src/pages/GamePage';
import HomePage from 'src/pages/HomePage';
import StatistiquePage from 'src/pages/StatistiquePage';


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


]);

export default router;