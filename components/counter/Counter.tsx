'use client'

import { useCounterStore } from "@/store/counter/counterStore"


export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="p-4 border rounded w-fit">
      <p className="text-lg">Count: {count}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={increment} className="bg-green-500 px-2 py-1 rounded text-white">+</button>
        <button onClick={decrement} className="bg-red-500 px-2 py-1 rounded text-white">-</button>
        <button onClick={reset} className="bg-gray-500 px-2 py-1 rounded text-white">Reset</button>
      </div>
    </div>
  )
}
