
import DraggableRanking from "./DraggableRanking";
import {Link, useParams} from "react-router-dom";


const Ranking = () => {
    const {id} = useParams()
    const data = JSON.parse(localStorage.getItem('rankingList'))
    const index = data.findIndex(ranking => ranking.id == id)
    const items = data[index].items

    const handleDrop = (order) => {
        data[index].items = order.map(i => items[i])
        localStorage.setItem('rankingList', JSON.stringify(data))
    }

    return (
        <div>
            <h1>
                {data[index].name}
            </h1>
            <DraggableRanking
                items={items}
                onDrop={handleDrop}
            />
        </div>
    )
}

export default Ranking