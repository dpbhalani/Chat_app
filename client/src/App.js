import "./App.css";
import ChatsPage from "./pages/ChatsPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";


function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path='/chats' element={<ChatsPage />} />
    </Routes>
  </div>;
}

export default App;
