import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashBoardSection from "./DashBoardSection";
import EditableField from "./EditableField";

export default function DashBoardSectionSaveable(props) {
  let dispatch = useDispatch();

  const businessSettings = useSelector((store) => store?.businessSettings);

  let config = [{ title: "", propertyPath: ["property"] /* on businessData*/ }];

  // state is used to keep track of changes, reset to {} when saving was successful
  const [state, setState] = useState({ saved: true });

  return (
    <DashBoardSection {...props}>
      <div class="md:flex mb-6">
        <div class="md:w-1/2">
          <EditableField></EditableField>
        </div>
        <div class="md:w-1/2">
          <EditableField></EditableField>
        </div>
      </div>
      <div>
        <button className="btn mx-3">Speichern</button>
      </div>
    </DashBoardSection>
  );
}
