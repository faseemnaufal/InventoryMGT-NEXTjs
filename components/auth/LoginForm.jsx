"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {useForm} from "react-hook-form"
import {signIn} from "next-auth/react"
import toast from "react-hot-toast"


export default function LoginForm() {
    const router = useRouter()
    const{
        register,
        handleSubmit,
        formState:{errors},
    } = useForm()
    const [loading, setLoading] = useState(false)
    console.log(loading)
    async function onSubmit(data){
        try{
            console.log(data.email, data.password)
            setLoading(true)
            const loginData = await signIn("credentials", {
                ...data,
                redirect: false,
            })
            if(loginData){
                setLoading(false)
                router.push("/dashboard/home/overview")
            }
        }catch (error){
            setLoading(false)
            console.error("Network Error:", error)
            toast.error("Something went wrong")
        }
    }
  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
        
    >
        <div>
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900
                dark:text-white"
            >
                Your email
            </label>
            <input 
                {...register("email", {required:true})}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                rounded-lg focus:ring-blue-600 focus:border-blue-600 block
                w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
            />
            {errors.email && (
                <small className="text-red-600 text-sm">
                    This field is required
                </small>
            )}
        </div>
        <div>
            <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900
                dark:text-white"
            >
                Password
            </label>
            <input 
                {...register("password", {required:true})}
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                rounded-lg focus:ring-blue-600 focus:border-blue-600 block
                w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500"
                placeholder=".........."
                required=""
            />
            {errors.password && (
                <small className="text-red-600 text-sm">
                    This field is required
                </small>
            )}
        </div>
        {loading ? (
            <button
                disabled
                type="button"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                rounded-lg focus:ring-blue-600 focus:border-blue-600
                w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500 inline-flex items-center"
            >
            <svg 
                height="210" 
                width="400" 
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                fill="none"
            >
            <path 
                d="M150 0 L75 200 L225 200 Z" 
                style={{fill:'none',stroke:'green',strokeWidth:3}} />
            </svg>
        </button>
        ): (
           
                <button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700
                    rounded-lg focus:ring-blue-600 focus:border-blue-600
                    w-full p-2.5 mt-2 sm:mt-4 transition-all duration-300 ease-in-out"
                >
                    Login
                </button>
            )}
                <p className="text-sm font-light text-gray-500 
                dark:text-gray-400 mt-2">
                    Already have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-blue-600 hover:underline
                        dark:text-blue-500"
                    >
                        Sign Up
                    </a>
                </p>

      
    </form>
  )
}

