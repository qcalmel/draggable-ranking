
import DraggableRanking from "./DraggableRanking";
import initialData from './data/rankingFixtures.json'
import {useState} from "react";


const Ranking = () => {
    if(!localStorage.getItem('rankingList')){
        localStorage.setItem('rankingList',JSON.stringify(initialData))
    }
    const [data,setData] = useState(() => JSON.parse(localStorage.getItem('rankingList')))
    return (
        <div>
            <h1>
                {data[0].name}
            </h1>
            <DraggableRanking
                items={data[0].items}
            />
        </div>
    )
}

export default Ranking