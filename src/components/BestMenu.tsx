import React from "react";
import type { Menu } from '../model/Mine'

interface OwnProps extends Omit<Menu, 'detail'>{
    showMyMenu(name:string): string;
}
// extends is a type inheiritance.(ofcourse, Omit is here too) 

const BestMenu:React.FC<OwnProps> = ({name}) => {
    return(
        <div>
            <span>{name}</span>
        </div>
    )
}

export default BestMenu