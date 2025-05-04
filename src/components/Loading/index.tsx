const Loading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[60vh] space-y-6 ">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 shadow-lg"></div>
        <p className="mt-4 text-lg text-gray-700 font-semibold">
          Cargando contenido...
        </p>
      </div>
      <div className="w-full max-w-md space-y-4">
        <div className="animate-pulse flex flex-col space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-3/4 shadow-sm"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-full shadow-sm"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-full shadow-sm"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-1/2 shadow-sm"></div>
        </div>
        <div className="animate-pulse flex flex-col space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-3/4 shadow-sm"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-full shadow-sm"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-full shadow-sm"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-1/2 shadow-sm"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
