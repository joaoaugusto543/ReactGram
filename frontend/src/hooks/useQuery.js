import {useEffect, useState} from 'react'
import userService from '../services/userService'
import { useSelector } from 'react-redux'

export default function useQuery(query){

    const [users,setUsers]=useState([])

    const {user}=useSelector(state=>state.user)

    const token= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null

    async function loadData(){
        if(token){
            const usersQuery=await userService.searchUsers(query,token)
            setUsers(usersQuery)
        }
    }

    useEffect(()=>{
        loadData()
    },[query])

    return {users}
}
