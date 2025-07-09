import React from 'react'

const footer = () => {
  return (
    <div>
      <footer className="bg-white w-full h-fit text-[#726d6d] py-10">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default footer


