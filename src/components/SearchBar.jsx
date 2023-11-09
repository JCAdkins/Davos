import { forwardRef } from "react";

const SearchBar = forwardRef((props, ref) => {
  return (
    <form
      onSubmit={(e) => {
        ref.current.value = "";
        e.preventDefault();
      }}
    >
      <div class="flex">
        <div class="relative w-full">
          <input
            ref={ref}
            type="search"
            id="search-dropdown"
            class="block p-1.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search"
            onChange={props.onChange}
            value={props.value}
            required
            onSubmit={(e) => e.preventDefault()}
          />
          <button
            onSubmit={(e) => e.preventDefault()}
            class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-app_accent-900 rounded-r-lg border border-app_accent-800 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
});

export default SearchBar;
