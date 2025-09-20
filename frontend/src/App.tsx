import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AddTask from "./pages/AddTask"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </div>
  )
}

export default App
