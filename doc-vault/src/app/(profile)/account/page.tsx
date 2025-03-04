import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Settings = () => {
  return (
    <div className="text-darkblue max-container padding-container mt-8">
          <Link className="flex" href="/dashboard">
            <ChevronLeft />
            <span className="px-5">Dashboard</span>
          </Link>
          <div className="p-4 pt-10">
            <h1 className="text-4xl font-bold text-lighterred">Account</h1>
          </div>
    </div>
  )
}

export default Settings