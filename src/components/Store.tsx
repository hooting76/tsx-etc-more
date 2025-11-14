import React from "react";
import type {Mine, Address} from '../model/Mine'

interface OwnProps{
    info: Mine,
    changeAddress(address: Address): void
  // void is return type of function that does not return anything
}

const Store:React.FC<OwnProps> = ({info}) => {
    return(
        <div>
            <h1>this is info</h1>
            {info.name} - {info.category}
        </div>
    )
}

export default Store