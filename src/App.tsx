import React, { useState } from 'react'
import './App.css'
import Store from './components/Store'
import Docker from './components/Docker'
import BestMenu from './components/BestMenu'

// type import
import type {Mine, Address} from './model/Mine'

// https://ahnlab.recruiter.co.kr/mrs2/applicant/resume/writeResume

const data:Mine = {
  name:'jch',
  category: 'Personal',
  address:{
    city:'Osan',
    detail:'Chung-hak-ro',
    zipCode: 11111,
  },
  menu:[
    {
      name: 'exp',
      detail: '2.3'
    },{
      name: 'project',
      detail: '2'
    }
  ]
}

const App:React.FC = () => {
  const [myData, setMyData] = useState<Mine>(data);
  const changeAddress = (address: Address) => {
    setMyData({...myData, address: address})
  }

  const showMyMenu = (name:string) => {
    return name;
  }

  return (
    <>
      <div>
        <Store 
          info={myData}
          changeAddress={changeAddress}/>
        <BestMenu name="test" showMyMenu={showMyMenu}/>
        <Docker/>
      </div>
    </>
  )
}

export default App
