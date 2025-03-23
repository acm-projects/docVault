"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUser } from '@/context/UserContext'
import { ChevronDown, ChevronLeft, CircleUserRound } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const icon =  <CircleUserRound strokeWidth={1.5} size={180}/>;

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { firstName, lastName, setFirstName, setLastName } = useUser();

  return (
    <div className="text-darkblue max-container padding-container mt-8">
      <Link className="flex" href="/personal">
        <ChevronLeft />
        <span className="px-5">Back</span>
      </Link>
      <div className="p-4 py-10">
        <h1 className="text-4xl font-bold text-lighterred">Account</h1>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/3 flex flex-col items-center">
          <span>{icon}</span>
          <h2 className="pb-3 text-2xl">{firstName} {lastName}</h2>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <div className="flexCenter">
                  <Button className="justify-between border border-lighterred bg-lighterred text-white shadow-none font-light text-lg hover:bg-red transition-all">
                      <ChevronDown className="ml-auto" />
                      <span>Personal</span>
                  </Button>
                  
                  </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                  side="bottom"
                  className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Personal</span>
                </DropdownMenuItem>
                  
                <DropdownMenuItem>
                  <span>Student</span>
                </DropdownMenuItem>
                  
                <DropdownMenuItem>
                  <span>Business</span>
                </DropdownMenuItem>
                
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-2/3 flex flex-col justify-center py-5 rounded-md border border-middlegray">
          <h2 className="pb-10 flex justify-center text-4xl">Hello, {firstName} {lastName}!</h2>
          <form
            onSubmit = {(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
            className="flex flex-col items-center gap-y-10"
          >
            <label className="block text-lg font-medium leading-6 text-gray-900">
              First Name: {" "}
              {isEditing ? (
                <input 
                  placeholder={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="border border-middlegray block w-1/2 rounded-md py-1.5 px-3 text-gray-900 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              ) : (
                <b>{firstName}</b>
              )}
            </label>
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Last Name: {" "}
              {isEditing ? (
                <input 
                  placeholder={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="border border-middlegray block w-1/2 rounded-md py-1.5 px-3 text-gray-900 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              ) : (
                <b>{lastName}</b>
              )}
            </label>
            <div>
              <Button type="submit">{isEditing ? "Save" : "Edit"} Profile</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Account