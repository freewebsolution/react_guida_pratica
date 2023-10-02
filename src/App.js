
import './App.css';

function AppTitle() {
  return <h1>Todo App</h1>;
}

const defaultImage = "https://via.placeholder.com/32x32.png";

function getiamgeOrDeafault(imageurl){
  try{
    new URL(imageurl);
    return imageurl;
  }catch {
    return defaultImage;
  }
}

const user = {
  name: "Lucio",
  id:1,
  image:"https://github.com/freewebsolution.png"
}

function AppMessage({user:{id,name,image}}) {

  return <p>
    <span className='welcome'>{id}</span>{" "}
    <span className='name'>{name}</span>
    <img src={getiamgeOrDeafault(image)} width="32" alt='user.name' height="32"/>
  </p>;
}

function App() {
  return (
    <div>
      <AppTitle />
      <AppMessage user={user}/>
    </div>
  );
}



export default App;
