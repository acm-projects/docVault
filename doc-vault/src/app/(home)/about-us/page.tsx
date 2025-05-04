import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className="text-darkblue flex flex-row md:gap-20 max-container padding-container mt-8">
          <div className="p-4 w-1/2">
            <h1 className="text-5xl font-bold text-lighterred">About Us</h1>
            <h2 className="py-8 text-2xl">Smart Organization, Designed for Simplicity</h2>
            <p>
              We are a passionate team dedicated to simplifying the way you organize and 
              navigate through an overwhelming sea of documents. In just under 10 weeks, we designed 
              and developed this entire platform from the ground up—crafting a streamlined, intuitive 
              system that makes managing files effortless. 
              <br></br><br></br>Our goal is to eliminate the frustration 
              of cluttered storage, giving you a seamless experience to categorize, access, and track 
              documents with ease. Whether for work, school, or personal use, our solution is built to 
              help you stay organized without the hassle. 
              <br></br><br></br>We're excited to continue refining and expanding 
              its capabilities. Welcome to a smarter way to manage your documents!
            </p>
          </div>

          <div className="p-4 flex justify-center w-1/2">
            <Image className="rounded-md" alt="some image" unoptimized width={500} height={500} src="../stats.png" />
          </div>
    </div>
  )
}

export default About