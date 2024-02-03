//import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export async function makePostRequest(setLoading,endPoint,data,resourceName,reset){

    try {
        setLoading(true)
        const baseUrl = "https://next-js-pos.vercel.app/"
        const response = await fetch(`${baseUrl}/${endPoint}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        })
        if(response.ok){
          console.log(response)
          setLoading(false)
          toast.success(`New ${resourceName} created successfully!`)
          reset()
        }else{
            setLoading(false)
            toast.error("Something Went Wrong")
        }
        
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
}


export async function makePutRequest(setLoading,endPoint,data,resourceName,redirect){

  try {
      setLoading(true)
      const baseUrl = "https://next-js-pos.vercel.app/"
      const response = await fetch(`${baseUrl}/${endPoint}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      if(response.ok){
        console.log(response)
        setLoading(false)
        toast.success(`${resourceName} updated successfully!`)
        redirect()
      }else{
          setLoading(false)
          toast.error("Something Went Wrong")
      }
      
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
}