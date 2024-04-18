import { grid } from 'ldrs'

// Default values shown

const Loader = () => {
    grid.register()
  return (
    <>
     <div className='flex flex-col items-center justify-center h-screen'>
    <l-grid
    size="70"
    speed="1.5" 
    color="blue" 
    />   
    <h1 className='font-bold mt-3 text-lg'>Loading </h1>
    </div> 
    </>
  )
}

export default Loader
