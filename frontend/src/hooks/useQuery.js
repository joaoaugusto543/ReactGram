import {useCallback, useEffect, useState} from 'react'
import userService from '../services/userService'

export default function useQuery(query){

    const [users,setUsers]=useState([])

    const token= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null

    const loadData=useCallback(async ()=>{
        if(token){
            const usersQuery=await userService.searchUsers(query,token)
            setUsers(usersQuery)
        }
    },[query,token])

    useEffect(()=>{
        loadData()
    },[query,loadData])

    return {users}
}
