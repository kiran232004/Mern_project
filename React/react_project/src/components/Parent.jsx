import React from 'react'
import Child from './Child'
import State from './State'
const Parent=()=>{
    return(
        <div>
            hello world,
            I am In parent folder...
            <Child name='john' age={30}/>
            <State/>
        </div>
    )
}

export default Parent;