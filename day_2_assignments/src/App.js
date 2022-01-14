
import '../src/components/styles.css';
import { Todo } from '../src/components/ToDo'
import { Home } from '../src/components/Home'

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<Todo />}/>
      </Routes>
    </div>
  );
}

export default App;
