import Image from 'next/image'
import React from 'react'

const Features = () => {
  const features = [
    {
      caption: "Automatically categorizes and stores documents upon download.",
      img: "https://placehold.co/600x400",
    },
    {
      caption: "Extracts text from documents for content analysis.",
      img: "https://placehold.co/600x400",
    },
    {
      caption: "Organizes documents into relevant folders (Financial, Legal, Personal, etc.).",
      img: "https://placehold.co/600x400",
    },
    {
      caption: "Translates documents into English.",
      img: "https://placehold.co/600x400",
    },
    {
      caption: "Answers document-related questions and assists with form completion.",
      img: "https://placehold.co/600x400",
    },
    {
      caption: "Documents stored safely in Amazon S3 with easy retrieval.",
      img: "https://placehold.co/600x400",
    },
  ]

  return (
    <div className="text-darkblue max-container padding-container mt-8">
      <div className="p-4">
        <h1 className="pb-5 text-5xl font-bold text-lighterred">Features</h1>
        <p className="py-5 md:w-1/2">
          Discover the powerful features that make docVault seamless, secure, 
          and efficient. Our intuitive platform offers everything you need to 
          organize, collaborate, and access your files effortlessly. 
        </p>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {features.map((feature) => (
            <div key={feature.caption}>
              <Image width={600} height={400} alt={feature.caption} src={feature.img} className="w-50 h-50 rounded-md"/>
              <p className="py-5 font-normal">{feature.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features