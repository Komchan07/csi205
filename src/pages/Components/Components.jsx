import './Components.css'
import Adder from './components/Adder.jsx'
import Temperature from './components/Temperature.jsx'
import Value from './components/Value.jsx'
import Timer from './components/Timer.jsx'
import { useState } from 'react'


function Components() {
    const [counter, setCounter] = useState(0)

    return (
        <div className="app-container">
            <div className="text-center mb-4">
                <h1 className="component-title d-inline-block">REACT COMPONENTS</h1>
            </div>
            <div className="components-grid">
                <div className="component-card">
                    <Value name={'COUNTER'} value={counter} setValue={setCounter} />
                </div>

                <div className="component-card">
                    <Timer />
                </div>

                <div className="component-card">
                    <Adder name="ADD" />
                </div>

                <div className="component-card">
                    <Temperature />
                </div>

                <div className="component-card footer-card">
                    <div className="text-center bg-dark text-white p-2 rounded">
                        67181966 นายคมชาญ จันทร์ศรี
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Components