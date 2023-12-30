"use client"
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import FormHeader from '@/components/dashboard/FormHeader'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function NewItem() {

  const categories =[
    {
      label: "Electronics",
      value: "eet"
    },
    {
      label: "Clothes",
      value: "drs"
    },
  ]
  const units =[
    {
      label: "Kg",
      value: "kilo"
    },
    {
      label: "Pcs",
      value: "ps"
    },
  ]
  const brands =[
    {
      label: "HP",
      value: "eet"
    },
    {
      label: "Dell",
      value: "drs"
    },
  ]
  const warehouses = [
    {
      label: "Warehouse A",
      value: "wrhsa"
    },
    {
      label: "Warehouse B",
      value: "wrhsb"
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
      const response = await fetch(`${baseUrl}/api/items`,{
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
    <div>
      {/* Header */}
      <FormHeader 
      title="New Item" href="/dashboard/inventory"/>
      {/* Form */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='w-full max-w-4xl p-4 bg-white border my-3 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
       
        <TextInput label="Item Title" name="title"
        register={register} errors={errors} className='w-full'/>

       <SelectInput name="categoryId" label="Select the Item Category" 
       register={register} className='w-full' options={categories}/>

       <TextInput label="Item SKU" name="sku"
        register={register} errors={errors}/>

        <TextInput label="Warehouse Location" name="location"
        register={register} errors={errors} className='w-full'/>

        <TextInput label="Item Barcode" name="barcode"
        register={register} errors={errors} className='w-full'/>

        <TextInput label="Item Quantity" name="qty"
        register={register} errors={errors} className='w-full'/>

        <SelectInput name="unitId" label="Select the Item Unit" 
       register={register} className='w-full' options={units}/>

       <SelectInput name="brandId" label="Select the Item Brand" 
       register={register} className='w-full' options={brands}/>

       <TextInput label="Buying Price" name="buyingPrice"
        register={register} errors={errors} className='w-full' type='number'/>

        <TextInput label="Selling Price" name="sellingPrice"
        register={register} errors={errors} className='w-full' type='number'/>

        <TextInput label="Re-Order Point" name="reOrderPoint"
        register={register} errors={errors} className='w-full' type='number'/>

        <SelectInput name="warehouseId" label="Select the Item Warehouse" 
         register={register} className='w-full' options={warehouses}/>

        <TextareaInput label="Warehouse Description" name="description"
        register={register} errors={errors}/>
       
        </div>
        <SubmitButton isLoading={loading} title="Category"/>
      </form>
    </div>
  )
}
