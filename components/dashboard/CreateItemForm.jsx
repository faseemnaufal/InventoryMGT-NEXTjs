"use client"
import ImageInput from '@/components/FormInputs/ImageInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import { makePostRequest } from '@/lib/apiRequest'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateItemForm({categories,units,brands,warehouses,suppliers}) {

  const [imageUrl, setImageUrl] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)

  async function onSubmit(data){
    data.imageUrl=imageUrl
    console.log(data)
    makePostRequest(
      setLoading,
      "/api/items",
      data,
      "Item",
      reset
    )
  }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='w-full max-w-4xl p-4 bg-white border my-3 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
       
            <TextInput label="Item Title" name="title"
            register={register} errors={errors} className='w-full'/>

        <SelectInput name="categoryId" label="Select the Item Category" 
        register={register} className='w-full' options={categories}/>

        <TextInput label="Item SKU" name="sku"
            register={register} errors={errors} className='w-full'/>

            <TextInput 
            label="Warehouse Location" 
            name="location"
            register={register} 
            errors={errors} 
            className='w-full'
            />

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

            <SelectInput name="supplierId" label="Select the Item Supplier" 
            register={register} className='w-full' options={suppliers}/>

            <TextInput label="Re-Order Point" name="reOrderPoint"
            register={register} errors={errors} className='w-full' type='number'/>

            <SelectInput name="warehouseId" label="Select the Item Warehouse" 
            register={register} className='w-full' options={warehouses}/>

            <TextInput label="Item Weight in Kgs" name="weight"
            register={register} errors={errors} className='w-full' type='number'/>

            <TextInput label="Item Dimensions in cm (20 x 30 x 100)" name="dimensions"
            register={register} errors={errors} className='w-full'/>

            <TextInput label="Item Tax Rate in %" name="taxRate"
            register={register} errors={errors} className='w-full' type='number'/>

            <TextareaInput label="Item Description" name="description"
            register={register} errors={errors}/>

            <TextareaInput label="Item Notes" name="notes"
            register={register} errors={errors}/>

            <ImageInput 
            label="Item Image" 
            imageUrl={imageUrl} 
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
            />

        </div>
        <SubmitButton isLoading={loading} title="Item"/>
    </form>
  )
}
