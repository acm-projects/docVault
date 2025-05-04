import Image from 'next/image'
import React from 'react'

const Features = () => {
  const features = [
    {
      caption: "Automatically categorizes and stores documents upon download into relevant folders.",
      img: "../folders.png",
    },
    {
      caption: "Translates documents into over 70 languages.",
      img: "../translate.png",
    },
    {
      caption: "Answers document-related questions and assists with form completion.",
      img: "../chatbot.png",
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
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-15 items-center justify-center">
          {features.map((feature) => (
            <div key={feature.caption}>
              <Image width={600} height={400} unoptimized alt={feature.caption} src={feature.img} className="w-50 h-50 rounded-md"/>
              <p className="py-5 font-normal">{feature.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features