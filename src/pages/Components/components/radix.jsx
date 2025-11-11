 import { useState } from "react"

const radixcounter = () => {

    //    getter , setter
    const [value, setValue] = useState(0)

    const minusClicked = () => {
        console.log('-')
        if (value <= 0){
            setValue( 4095 )
        } else{
          setValue(value - 1) // set direct to value
        }
    }



    const resetClicked = () => {
        console.log('reset')
        setValue(0) // set direct to value
    }

    const plusClicked = () => {
        console.log('+')
        if (value >= 4095 ){
            setValue( 0 )
        } else {
          setValue(value + 1) // set direct to value
        }
    }  
    
    return (
        // container
        <div className="border border-2 border-black rounded-3 p-3 m-auto" style={{ width: '400px' }}>
            {/* title */}
            <div className='text-center fw-bold fs-4'>Radix Counter</div>

            {/* body */}
            <div className='d-flex justify-content-between mt-3'>
                <div className="text-center"><div className="fw-bold">[HEX]</div><div className="font-monospace">{value.toString(16).toUpperCase().padStart(3, '0')}</div></div>
                <div className="text-center"><div className="fw-bold">[DEX]</div><div className="font-monospace text-primary fw-bold">{value.toString().padStart(4, '0')}</div></div>
                <div className="text-center"><div className="fw-bold">[OCT]</div><div className="font-monospace ">0000</div></div>
                <div className="text-center"><div className="fw-bold">[BIN]</div><div className="font-monospace">000000000000</div></div>
            </div>

            {/* bottons */}
            <div className="mt-3 d-flex justify-content-around gap-3">
                <button className="btn btn-danger px-4" onClick={minusClicked}>&minus;</button>
                <button className="btn btn-secondary px-4" onClick={resetClicked}>RESET</button>
                <button className="btn btn-success px-4" onClick={plusClicked}>+</button>
            </div>
        </div>
    )


}

export default radixcounter