// Login.jsx
import React, {useCallback, useState} from 'react';

const Button = (function ({ onClick, label }) {
    console.log(`${label} Button rendered`);
    return <button onClick={onClick}>{label}</button>;
})

function Counter() {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(false);

    const handleIncrement = useCallback(() => {
        setCount(count + 1);
    }, [count]); // Only recreate if `count` changes

    return (
        <div>
            <p>Count: {count}</p>
            <Button onClick={handleIncrement} label="Increment" />
            <Button onClick={() => setOtherState(!otherState)} label="Toggle">Toggle Other State</Button>
        </div>
    );
}

export default Counter;