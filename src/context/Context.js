import {createContext} from 'react'

const Context=createContext({
    usersData:[],
    updateUsersData:()=>{},
    updateUser:()=>{}
})

export default Context