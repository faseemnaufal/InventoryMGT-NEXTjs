"use client"
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import FormHeader from '@/components/dashboard/FormHeader'
import { makePostRequest } from '@/lib/apiRequest'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function NewWarehouse() {

  const selectOptions =[
    {
      title: "Main",
      id: "main"
    },
    {
      title: "Branch",
      id: "branch"
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
    makePostRequest(
      setLoading,
      "/api/warehouse",
      data,
      "Warehouse",
      reset
    )
  }

  return (
    <div>
      {/* Header */}
      <FormHeader 
      title="New Warehouse" href="/dashboard/inventory/warehouse"/>
      {/* Form */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='w-full max-w-4xl p-4 bg-white border my-3 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
       
       <SelectInput name="type" label="Select the WareHouse Type" 
       register={register} className='w-full' options={selectOptions}/>

        <TextInput label="Warehouse Title" name="title"
        register={register} errors={errors} className='w-full'/>

        <TextInput label="Warehouse Location" name="location"
        register={register} errors={errors}/>

        <TextareaInput label="Warehouse Description" name="description"
        register={register} errors={errors}/>
       
        </div>
        <SubmitButton isLoading={loading} title="Warehouse"/>
      </form>
    </div>
  )
}