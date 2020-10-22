export default function DashBoardLoadingScreen() {
  return (
    <div class="w-full border border-gray-300 shadow rounded-md p-4  mx-6 my-8">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-gray-400 h-12 w-12"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-8 bg-gray-400 rounded"></div>
            <div class="h-6 bg-gray-400 rounded w-4/6"></div>

            <div class="h-8 bg-gray-400 rounded"></div>
            <div class="h-8 bg-gray-400 rounded w-5/6"></div>
            <div class="h-8 bg-gray-400 rounded"></div>
            <div class="h-6 bg-gray-400 rounded w-3/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
