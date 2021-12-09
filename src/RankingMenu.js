import initialData from './data/rankingFixtures.json'
import {useState} from "react";
import {Link} from "react-router-dom";

if(!localStorage.getItem('rankingList')){
    localStorage.setItem('rankingList',JSON.stringify(initialData))
}



const RankingMenu = () => {
    const [data,setData] = useState(() => JSON.parse(localStorage.getItem('rankingList')))
    return (
        <div className="ranking-menu">
                {data.map((ranking)=>{
                    return <Link key={ranking.id} to={"/"+ ranking.id}><div>{ranking.name}</div></Link>
                })}
        </div>
    )
}

export default RankingMenu