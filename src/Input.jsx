

const Input = () => {
  return (
    <>
<div className="flex items-center justify-center h-screen">
  <div className="max-w-2xl mx-auto">
    <div className="border border-gray-300 p-4 rounded-md">
    <div className="flex flex-col space-y-1.5 p-6 text-center">
      <h1 className="font-bold text-xl">Upload your Resume</h1>
      <div>Resume should be .pdf, .docx, or .txt</div>
    </div>
      <div className="flex items-center justify-center mt-3">
        <label className=" relative flex flex-col items-center justify-center w-1/2 h-13 bg-gray-100 rounded-xl cursor-pointer">
    <div className="flex border-dashed flex-col items-center m-3">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="indigo"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-gray-400 m-auto dark:text-gray-600"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" x2="12" y1="3" y2="15"></line>
    </svg>

          <input id="fileInput" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
    </div>
          
          <span className="text-gray-700 font-semibold text-center mb-5 mx-2">Drop files here or click to upload</span>
        </label>
        <div className="mx-3 border-l border-gray-500 h-12"></div>
        <button className="flex items-center justify-center w-1/2 h-12 bg-blue-500 text-white rounded-md hover:scale-105 transition ease-in">
  <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
    <path d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
  Import from LinkedIn
</button>

      </div>
        <div className="items-center pt-8 flex justify-center gap-2 mt-3 mb-3">
           <a href="/" className="text-center text-sm text-gray-700 mt-4 hover:text-blue-700 transition ease-in delay-100">Don&apos;t have a resume? Create a new one</a>
        </div>
  
    </div>
  </div>
</div>

    </>
  )
}

export default Input
