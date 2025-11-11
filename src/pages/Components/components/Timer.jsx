import { useState, useEffect } from 'react'

const Timer = () => {
    const [seconds, setSeconds] = useState(0)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        if (!running) return
        const id = setInterval(() => setSeconds(s => s + 1), 1000)
        return () => clearInterval(id)
    }, [running])

    const convertToString = (sec) => {
        const SECOND = 1
        const MINUTE = 60 * SECOND
        const HOUR = 60 * MINUTE
        const DAY = 24 * HOUR

        const days = Math.floor(sec / DAY)
        const hours = Math.floor((sec % DAY) / HOUR)
        const minutes = Math.floor((sec % HOUR) / MINUTE)
        const secondsPart = sec % MINUTE

        
        return `${days}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`
    }

    return (
        <div className="border border-black border-2 rounded-3 mx-auto mt-5 p-3 text-center " style={{ width: 'fit-content' }}>
            <h1>Timer</h1>
            <input value={convertToString(seconds)} readOnly />
            <div className="mt-2 d-flex gap-2">
                <button
                    className="btn btn-danger"
                    onClick={() => { setSeconds(0); setRunning(false) }}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>&nbsp;Reset
                </button>
                <button
                    className={running ? "btn btn-warning" : "btn btn-success"}
                    onClick={() => setRunning(r => !r)}
                >
                    <i className={running ? "bi bi-pause-fill" : "bi bi-play-fill"}></i>&nbsp;{running ? 'Pause' : 'Run'}
                </button>
            </div>
        </div>
    )
}

export default Timer