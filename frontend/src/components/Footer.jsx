import React from 'react'


const Footer = () => {
  return (
    <footer className='w-full h-[20rem] bg-[#040D12] text-white pl-10 flex '>
      <div className="flex justify-center items-center w-full">
        <div className=" flex flex-col justify-center ml-8  w-1/3">
          <h1 className="font-semibold text-3xl">UrbanMart</h1> <br /> <br />
          <p>
            Discover unbeatable deals and exclusive finds at{" "}
            <span className="font-bold">UrbanMart</span> – where your shopping
            dreams come true!
          </p>
        </div>

        <div className="w-1/3 border m-1">
        <div className='flex flex-col justify-center items-center p-4'>
          
        </div>
        </div>

        <div className="w-1/3 border"></div>
      </div>

      <hr className='text-white' />

      <div></div>
    </footer>
  );
}

export default Footer