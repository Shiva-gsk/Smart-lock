import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className="bg-black gradient-title md:p-3 p-2 flex justify-between sticky top-0 container">
        {/* <div className='p-2'>

      <Image src="/Logo.jpg" className='w-5 h-5' alt="Smart Lock" width={500} height={300} />
        </div> */}
      <h1 className="md:text-2xl text-xl font-bold pt-2 pb-2">Smart Lock App</h1>
      <div className='flex justify-end'>
        <Button variant={'ghost'}>
            <div className='text-xs md:text-sm'>Login</div>
        </Button>
        <Button variant={'ghost'}>
          <div className='text-xs md:text-sm'>Sign Up</div>
        </Button>
      </div>
    </div>
  )
}

export default Navbar