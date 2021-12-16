import './styles.css';
import Ranking from "./Ranking";
import {Routes,Route,Link} from "react-router-dom";
import RankingMenu from "./RankingMenu";

function App() {
  return (
    <div className="App">
        <Link to="/"><h1>Draggable Ranking App</h1></Link>
        <Routes>
            <Route path="/" element={ <RankingMenu/>}/>
            <Route path="/:id" element={<Ranking/>}/>
        </Routes>

    </div>
  );
}

export default App;
