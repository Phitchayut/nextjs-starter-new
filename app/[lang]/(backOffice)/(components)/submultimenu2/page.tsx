'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type FormData = {
  name: string
  sizes: {
    label: string
    stock: number
  }[]
}

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  sizes: z.array(z.object({
    label: z.string().min(1, { message: 'Required' }),
    stock: z.number().int().min(0, { message: 'Required' }),
  })).min(1, { message: 'Required' }),
})

function SubMultimenu2() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [sizes, setSizes] = useState([{ label: '', stock: 0 }])

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const handleAddSize = () => {
    setSizes([...sizes, { label: '', stock: 0 }])
  }

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Name:</span>
        <input type="text" {...register('name')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Sizes:</span>
        {sizes.map((size, index) => (
          <div key={index} className="mt-2 flex space-x-4">
            <input type="text" placeholder="Label" {...register(`sizes.${index}.label`)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            <input type="number" placeholder="Stock" {...register(`sizes.${index}.stock`)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            {errors.sizes && errors.sizes[index] && (
              <p className="mt-2 text-sm text-red-600">{errors.sizes[index].label?.message || errors.sizes[index].stock?.message}</p>
            )}
            <button type="button" onClick={() => handleRemoveSize(index)} className="flex-shrink-0 px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddSize} className="mt-2 flex-shrink-0 px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Add size</button>
      </label>
      <button type="submit" className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Submit</button>
    </form>
  )
}

export default SubMultimenu2