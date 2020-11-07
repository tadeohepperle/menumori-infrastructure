export default function DashBoardLoadingScreen() {
  return (
    <div className="w-full border border-gray-300 shadow rounded-md p-4  mx-6 my-8">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-400 rounded"></div>
            <div className="h-6 bg-gray-400 rounded w-4/6"></div>

            <div className="h-8 bg-gray-400 rounded"></div>
            <div className="h-8 bg-gray-400 rounded w-5/6"></div>
            <div className="h-8 bg-gray-400 rounded"></div>
            <div className="h-6 bg-gray-400 rounded w-3/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
