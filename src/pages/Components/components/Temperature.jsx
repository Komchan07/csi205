import { useState } from "react"
import Value from "./Value"

const Temperature = () => {
  const toNumber = (v) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }

  const [celsius, setCelsius] = useState(25)

  const fFromC = (c) => Number((c * 9 / 5 + 32).toFixed(2))
  const cFromF = (f) => Number(((f - 32) * 5 / 9).toFixed(2))
  const kFromC = (c) => Number((c + 273.15).toFixed(2))
  const cFromK = (k) => Number((k - 273.15).toFixed(2))

  // wrappers so Value can control F/K while canonical state is Celsius
  const setF = (updater) => {
    setCelsius(prevC => {
      const prevF = fFromC(prevC)
      const nextF = typeof updater === "function" ? updater(prevF) : toNumber(updater)
      return cFromF(nextF)
    })
  }

  const setK = (updater) => {
    setCelsius(prevC => {
      const prevK = kFromC(prevC)
      const nextK = typeof updater === "function" ? updater(prevK) : toNumber(updater)
      return cFromK(nextK)
    })
  }

  return (
    <div className="border border-black border-2 rounded-3 mx-auto mt-3 p-3" style={{ width: "fit-content" }}>
      <h1 className="text-center">{'TEMPERATURE'}</h1>

      <div className="d-flex justify-content-between align-items-center mb-3 " style={{ minWidth: 420 }}>
        <div className="badge bg-primary fs-5 ">C = {celsius} °C</div>
        <div className="badge bg-primary fs-5 ">F = {fFromC(celsius)} °F</div>
        <div className="badge bg-primary fs-5 ">K = {kFromC(celsius)} K</div>
      </div>

      <div className="d-flex gap-2">
        <Value name={'CELSIUS'} value={celsius} setValue={setCelsius} type="real" />
        <Value name={'FAHRENHEIT'} value={fFromC(celsius)} setValue={setF} type="real" />
        <Value name={'KELVIN'} value={kFromC(celsius)} setValue={setK} type="real" />
      </div>
    </div>
  )
}

export default Temperature