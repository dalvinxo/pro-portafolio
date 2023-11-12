const Loading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[60vh]">
      <div
        className="animate-pulse w-full rounded-lg shadow-md p-4 m-5 flex flex-col justify-center bg-slate-500/80 text-white"
        role="status">
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
      <div
        className="animate-pulse w-full rounded-lg shadow-md p-4 m-5 flex flex-col justify-center bg-slate-500/80 text-white"
        role="status">
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

export default Loading
