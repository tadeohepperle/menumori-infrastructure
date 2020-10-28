export default ({ bot_instance_status }) => {
  const possibleStates = {
    ACTIVE: {
      message: "Der Service ist aktiv.",
      colorClass: "green-500",
      colorClass2: "green-200",
    },
    INACTIVE: {
      message: "Der Service ist zur Zeit inaktiv.",
      colorClass: "gray-500",
      colorClass2: "gray-200",
    },
    ERROR: {
      message:
        "Ein Fehler ist aufgetreten, der Service läuft nicht. Unser IT-Team ist gerade dabei das Problem zu beheben.",
      colorClass: "red-500",
      colorClass2: "red-200",
    },
  };

  if (!bot_instance_status) bot_instance_status = "ERROR";
  return (
    <div
      className={`flex shadow-lg  rounded bg-${possibleStates[bot_instance_status].colorClass2} p-2 mb-6`}
    >
      <div
        className={`flex-start h-6 w-6 rounded-full shadow-lg border-4 border-white bg-${
          possibleStates[bot_instance_status].colorClass
        } ${bot_instance_status == "ACTIVE" ? "animate-pulse" : ""}`}
      ></div>
      <div
        className={`ml-6 flex-grow font-bold text-${possibleStates[bot_instance_status].colorClass}`}
      >
        {possibleStates[bot_instance_status].message}
      </div>
    </div>
  );
};
