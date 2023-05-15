import './App.css'
import { Home } from './pages/Home/home'
import { DataContext } from './components/dataContext'

function App() {
  return (
    <>
    <DataContext>
      <Home/>
    </DataContext>
    </>
  )
}

export default App
