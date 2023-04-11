var UsaStates = require("usa-states").UsaStates;
var usStates = new UsaStates();

export default usStates.states.map((s) => {
  return { ...s, label: s.name, value: s.abbreviation };
});
