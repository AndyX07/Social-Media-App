import {Routes, Route, useNavigate, RouterProvider} from 'react-router-dom';
import {router} from "./lib/routes";

function App() {
  return (
    <div className = "app">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
