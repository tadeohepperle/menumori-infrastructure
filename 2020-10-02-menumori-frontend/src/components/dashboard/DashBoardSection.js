import { Children } from "react";
import EditableField from "./EditableField";

export default function DashBoardSection({ id, title, children }) {
  return (
    <div>
      <div className="anchor"></div>

      <hr class="bg-gray-300 my-12" id={id} />
      <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
        {title}
      </h2>

      <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">{children}</div>
    </div>
  );
}
