import React, {useState} from 'react';

export const Test: React.FC<{initial: number}> = (props) => {
    const [count, setCount] = useState(props.initial);
    const inc = () => setCount(count + 1);

    return (
        <div>
            <div>initial: {props.initial}</div>
            <div>count: {count}</div>
            <button onClick={inc}>click</button>
        </div>
    );
}
