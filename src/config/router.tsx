import { createBrowserRouter } from 'react-router-dom';
import GamePage from 'src/pages/GamePage';
import HomePage from 'src/pages/HomePage';


const router = createBrowserRouter([
  {
    path:"/",
    element :<HomePage/>,

  },
  {
    path: "/game",
    element: <GamePage/>
  },


]);

export default router;