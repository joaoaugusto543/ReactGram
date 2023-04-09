import { api } from "../api/api"

async function register(data){
    try {
        
      const response= await api.post('/users/register',data)

      const res=response.data

      if (res) { 
        localStorage.setItem("user", JSON.stringify(res))
      }
  
      return res

    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

async function login(data){
  try {
    const response=await api.post('/users/login',data)

    const res=response.data

    if (res) { 
      localStorage.setItem("user", JSON.stringify(res))
    }

    return res

  } catch (error) {
      console.log(error)
      return error.response.data
  }
}


const authService={
    register,
    login
}

export default authService