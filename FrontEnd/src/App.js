
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout/Layout';
import UserList from './components/View/UserList';
import NoteList from './components/View/NoteList';
import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/layout" element={<Layout />}>
          <Route index element={<UserList />} />
          <Route path="blogs" element={<NoteList/>} />
          <Route path="contact" element={"Contact"} />
          <Route path="*" element={"Nopage"} />
        </Route>
        {/* <Route > */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
