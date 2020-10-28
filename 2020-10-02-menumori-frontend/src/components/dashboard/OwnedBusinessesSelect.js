import { useState } from "react";
import { useSelector } from "react-redux";

export function DashBoardSelect({
  onValueChange,
  options,
  chosenOptionID,
  title,
}) {
  //options = { title: "Mexico", id: "mex32" };

  const [disabled, setDisabled] = useState(false);

  return (
    <div class="w-full md:w-1/2 px-6 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-state"
      >
        {title}
      </label>
      <div class="relative select-none ">
        <select
          class="cursor-pointer block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          disabled={disabled || options.length <= 0}
          value={chosenOptionID}
          onChange={async (e) => {
            if (!disabled) {
              setDisabled(true);
              try {
                await onValueChange(e.target.value);
                setDisabled(false);
              } catch (ex) {
                setDisabled(false);
              }
            }
          }}
        >
          {options.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
