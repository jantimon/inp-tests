import { freezeMainThread } from "@/freezeMainThread";
import { useEffect, useState, useTransition } from "react";

export default function PageWithState() {

    const [, startTransition ] = useTransition()
    const [count, setCount] = useState(0);
    const count2 = useIncreasedState(count);
    const count3 = useIncreasedState(count2);
    const count4 = useIncreasedState(count3);

    return (
        <div>
            <h1>Count: {count}</h1>
            <h1>Count2: {count2}</h1>
            <h1>Count3: {count3}</h1>
            <h1>Count4: {count4}</h1>
            <button id="state" onClick={() => setCount(count + 1)}>Increase count</button>
            <button id="transition" onClick={() => startTransition(() => setCount(count + 1))}>Increase count with transition</button>
        </div>
    );

}


const useIncreasedState = (state: number) => {
    // Usually you would use useMemo here, but in order to have a slow useEffect
    // we are going to use useState instead
    const [increasedState, setIncreasedState] = useState(state);
    useEffect(() => {
        freezeMainThread(50);
        setIncreasedState(state + 1);
    }, [state]);
    return increasedState;
}