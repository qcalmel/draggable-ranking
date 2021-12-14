import initialData from './data/rankingFixtures.json'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import NewButton from "./NewButton";

if(!localStorage.getItem('rankingList')){
    localStorage.setItem('rankingList',JSON.stringify(initialData))
}



const RankingMenu = () => {
    const [data,setData] = useState(() => JSON.parse(localStorage.getItem('rankingList')))
    useEffect(()=>{
        localStorage.setItem('rankingList',JSON.stringify(data))
    },[data])
    const handleData = (nameList) => {
        const id = data.reduce((max,list)=>(list.id > max ? list.id : max),
            data[0].id)
        const newData = {name:nameList,id : id + 1,items:[]}
        setData([...data,newData])
    }
    return (
        <div className="ranking-menu">
                {data.map((ranking)=>{
                    return <Link key={ranking.id} to={"/"+ ranking.id}><div>{ranking.name}</div></Link>
                })}
            <NewButton onNewInput={handleData}/>
        </div>
    )
}

export default RankingMenu