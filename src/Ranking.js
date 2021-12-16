import DraggableRanking from "./DraggableRanking";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const Ranking = () => {
    const {id} = useParams()
    const data = JSON.parse(localStorage.getItem('rankingList'))
    const index = data.findIndex(ranking => ranking.id == id)
    const [items,setItems] = useState(data[index].items)
    const list = data[index]

    useEffect(()=>{
        data[index].items = items
        localStorage.setItem('rankingList',JSON.stringify(data))
    },[items])
    const handleDrop = (order) => {
        data[index].items = order.map(i => items[i])
        localStorage.setItem('rankingList', JSON.stringify(data))
    }

    const handleData = (itemName) => {
        setItems([...items,{name:itemName}])
    }

    return (
        <div key={items.length}>
            <h1>
                {list.name}
            </h1>
            <DraggableRanking
                items={items}
                onDrop={handleDrop}
                onNew={handleData}
            />
        </div>
    )
}

export default Ranking