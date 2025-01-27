import {createContext} from 'react'

const Context=createContext({
    usersData:[],
    updateUsersData:()=>{},
    updateUserEditData:()=>{}
})

export default Context