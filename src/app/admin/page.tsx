"use client"

import { useEffect, useState } from 'react'

const Page = () => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      page {data?.users[0].name}
    </div>
  )
}

export default Page
