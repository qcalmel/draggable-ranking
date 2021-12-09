import {useRef} from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import {useGesture} from 'react-with-gesture'
import {animated, interpolate, useSprings} from 'react-spring'
import './styles.css'
import RankingItem from "./RankingItem";


const fn = (order, down, originalIndex, curIndex, y) => index =>
    down && index === originalIndex
        ?
        {y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex'}
        : {y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false}


const DraggableRanking = ({items,onDrop}) => {

    const order = useRef(items.map((_, index) => index))
    const [springs, setSprings] = useSprings(items.length, fn(order.current))
    const bind = useGesture(({args: [originalIndex], down, delta: [, y]}) => {
        const curIndex = order.current.indexOf(originalIndex)
        const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
        const newOrder = swap(order.current, curIndex, curRow)
        /*
          Curry all variables needed for the truthy clause of the ternary expression from fn,
          so that new objects are fed to the springs without triggering a re-render.
        */
        setSprings(fn(newOrder, down, originalIndex, curIndex, y))
        // Settles the new order on the end of the drag gesture (when down is false)
        if (!down) {
            order.current = newOrder
            onDrop(newOrder)
        }
    });
    return (
        <div className="container">
            <div className="position">
                {items.map((_, i) => (
                    <div key={i}>
                        <div>
                            {i+1}
                        </div>
                    </div>
                ))}
            </div>
            <div className="content" style={{height: items.length * 100}}>
                {springs.map(({zIndex, shadow, y, scale}, i) => (
                    <animated.div
                        {...bind(i)}
                        key={i}
                        style={{
                            zIndex,
                            boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                            transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
                        }}
                        children={<RankingItem item={items[i]}/>}

                    />
                ))}
            </div>
        </div>
    )
}

export default DraggableRanking;