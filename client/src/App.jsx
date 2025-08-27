import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Pages/Dashboard'
import Classes from './Components/Pages/Classes'
import Budget from './Components/Pages/Budget'
import Planner from './Components/Pages/Planner'
import Quiz from './Components/Pages/Quiz'
import GlobalTimer from './Components/Common/GlobalTimer'

function App() {
 

  return (
    <Router>
      <div className='min-h-screen' >
        <div>
          <GlobalTimer></GlobalTimer>
        </div>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>} ></Route>
        <Route path='/classes' element={<Classes></Classes>} ></Route>
        <Route path='/budget' element={<Budget></Budget>} ></Route>
        <Route path='/planner' element={<Planner></Planner>} ></Route>
        <Route path='/quiz' element={<Quiz></Quiz>} ></Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
