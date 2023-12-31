"use client"
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddInventoryForm() {

  const branches =[
    {
      label: "Branch A",
      value: "brncha"
    },
    {
      label: "Branch B",
      value: "branchb"
    },
    {
      label: "Main A",
      value: "maina"
    },
    {
        label: "Main B",
        value: "mainb"
      },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)

  async function onSubmit(data){
    console.log(data)
    setLoading(true)
    const baseUrl = "http://localhost:3000"
    try {
      const response = await fetch(`${baseUrl}/api/adjustments/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      if(response.ok){
        console.log(response)
        setLoading(false)
        reset()
      }
      
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='w-full max-w-4xl p-4 bg-white border my-3 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
       
        <TextInput 
          type='number'
          label="Enter Quantity of Stock to Add" 
          name="addStockQty"
          register={register} 
          errors={errors} 
          className='w-full'
        />

       <SelectInput 
        name="receivingWarehouseId" 
        label="Select the Warehouse that will receive the Stock" 
        register={register} 
        className='w-full' 
        options={branches}
       />

        <TextareaInput 
          label="Adjustment Notes" 
          name="notes"
          register={register} 
          errors={errors}
        />
       
        </div>
        <SubmitButton isLoading={loading} title="Adjustment"/>
      </form>
  )
}
