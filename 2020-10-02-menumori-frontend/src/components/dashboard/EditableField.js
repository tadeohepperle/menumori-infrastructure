import { SVG_Edit } from "../small/SVG";

import { useState } from "react";

export default function EditableField({
  title,
  propertyPath, // eg. ig_settings.username
  value,
  inputOptions = { type: "text" },
  noedit = false,
  onValueChange,
}) {
  const [editable, setEditiable] = useState(false);

  function handleActivation() {
    if (!noedit) setEditiable(true);
  }

  let staticField = (
    <div class="flex-grow">
      <div
        onClick={handleActivation}
        className={`${
          noedit ? "" : "cursor-pointer"
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          !editable ? "select-none" : ""
        }`}
        id={propertyPath + "_display"}
      >
        {value}
      </div>
    </div>
  );

  let inputField = (
    <div class="flex-grow">
      <input
        className={` shadow bg-yellow-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          !editable ? "select-none" : ""
        }`}
        id={propertyPath}
        type="text"
        onChange={(e) => {
          onValueChange(e.target.value, propertyPath);
        }}
        {...inputOptions}
        disabled={false}
        value={value}
      />
    </div>
  );

  return (
    <div class="mb-4 px-3">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for={propertyPath}
      >
        {title}
      </label>
      {editable && !noedit ? inputField : staticField}
      <div class="flex">
        <div class="flex-1"></div>
      </div>
      {!editable && !noedit && (
        <div
          class="block text-gray-500 text-sm px-1 py-1 mb-2 cursor-pointer"
          onClick={handleActivation}
        >
          zum Bearbeiten doppelt klicken
        </div>
      )}
    </div>
  );
}

/*

<input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !editable ? "select-none" : ""
            }`}
            id={id}
            type="text"
            placeholder="Username"
            disabled={!editable}
            //value={initialValue}
          />

*/
