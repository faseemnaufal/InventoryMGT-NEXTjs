
import CreateItemForm from '@/components/dashboard/CreateItemForm'
import FormHeader from '@/components/dashboard/FormHeader'
import { getData } from '@/lib/getData'


export default async function NewItem() {

  const categories = (await getData()) || []
  console.log(categories)
  const units = []
  const brands = []
  const warehouses = []
  const suppliers = []


  return (
    <div>
      {/* Header */}
      <FormHeader 
      title="New Item" href="/dashboard/inventory"/>
      {/* Form */}
      <CreateItemForm categories={categories} units={units}
      brands={brands} warehouses={warehouses} suppliers={suppliers}/>
    </div>
  )
}
