import Styles from './App.module.css'
import Header from './components/Header'
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <Header/>
      <div className={Styles.main}>
        <Outlet />
      </div>
    </>
  )
}

export default App
