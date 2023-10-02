import './App.css';
import './assets/css/master.css'
import Main from './components/Main';
import Sidebar from './components/Sidebar';



const user = {
  name: "Lucio",
  id: 1,
  image: "https://github.com/freewebsolution.png"
}

function App() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Sidebar user={user} />
        <Main />
      </div>
    </div>
  )
}



export default App;
