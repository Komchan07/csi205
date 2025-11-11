import { useEffect, useState } from "react"

const Value = ({ name, initial = 0, type = "int", value: propValue, setValue: propSetValue }) => {
    const toNumber = (v) => {
        const n = Number(v)
        return Number.isFinite(n) ? n : 0
    }

    const isControlled = typeof propValue !== "undefined" && typeof propSetValue === "function"

    const [internal, setInternal] = useState(() => toNumber(initial))

    useEffect(() => {
        if (!isControlled) setInternal(toNumber(initial))
    }, [initial, isControlled])

    const current = isControlled ? toNumber(propValue) : internal
    const step = type === "real" ? 0.1 : 1

    const handleDelta = (delta) => {
        if (isControlled) {
            propSetValue(prev => {
                const next = toNumber(prev) + delta
                return Number(next.toFixed(10))
            })
        } else {
            setInternal(prev => {
                const next = toNumber(prev) + delta
                return Number(next.toFixed(10))
            })
        }
    }

    return (
        <div
            className="border border-black border-2 rounded-3
        mx-auto p-2 bg-secondary-subtle mt-3"
            style={{ width: "fit-content" }}>
            <h1 className='text-primary text-center'>{name || "VALUE"}</h1>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <button className="btn btn-danger" onClick={() => handleDelta(-step)}>&minus;</button>
                <div className='fs-3 fw-bold'>
                    {type === 'real' ? Number(current).toFixed(2) : Math.round(Number(current))}
                </div>
                <button className="btn btn-success" onClick={() => handleDelta(step)}>+</button>
            </div>
        </div>
    )
}

export default Value
