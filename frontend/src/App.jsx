import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Todos from "./pages/Todos"
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Signup />} path="/" />
      <Route element={<Signin />} path="/signin"></Route>
      <Route element={<Signup />} path="/signup" />
      <Route element={<Todos />} path="/todos" />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
