"use client"
import ImageInput from '@/components/FormInputs/ImageInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import FormHeader from '@/components/dashboard/FormHeader'
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'
import { Pencil, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function NewItem() {

  const [imageUrl, setImageUrl] = useState("")

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
  const suppliers = [
    {
      label: "Supplier A",
      value: "supa"
    },
    {
      label: "Supplier B",
      value: "supb"
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
    data.imageUrl=imageUrl
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
       
       {/* <div className="col-span-full">
          <div className="flex justify-between items-center mb-4">
            <label
              htmlFor="course-image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Item Image
            </label>
            {imageUrl && (
              <button
                onClick={() => setImageUrl("")}
                type="button"
                className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
              >
                <Pencil className="w-5 h-5" />
                <span>Change Image</span>
              </button>
            )}
          </div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Item image"
              width={1000}
              height={667}
              className="w-full h-64 object-cover"
            />
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
                // Do something with the response
                console.log("Files: ", res);
                console.log("Upload Completed");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div> */}

        <ImageInput 
          label="Item Image" 
          imageUrl={imageUrl} 
          setImageUrl={setImageUrl}
          endpoint="imageUploader"
        />

        </div>
        <SubmitButton isLoading={loading} title="Item"/>
      </form>
    </div>
  )
}
