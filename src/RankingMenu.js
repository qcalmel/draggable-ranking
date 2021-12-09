import initialData from './data/rankingFixtures.json'
import {useState} from "react";
import {Link} from "react-router-dom";

if(!localStorage.getItem('rankingList')){
    localStorage.setItem('rankingList',JSON.stringify(initialData))
}



const RankingMenu = () => {
    const [data,setData] = useState(() => JSON.parse(localStorage.getItem('rankingList')))
    console.log(data)
    return (
        <div>
            <ul>
                {data.map((ranking)=>{
                    return <li key={ranking.id}><Link to={"/"+ ranking.id}>{ranking.name}</Link></li>
                })}
            </ul>
        </div>
    )
}

export default RankingMenu