const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-pulse flex justify-center items-center p-1 bg-slate-600 text-white rounded-md opacity-0"
        role="status">
        <span> Loading...</span>
      </div>
    </div>
  )
}

export default Loading
