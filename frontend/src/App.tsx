import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AddTask from "./pages/AddTask"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </div>
  )
}

export default App
