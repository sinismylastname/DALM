$.Msg("[DALM] Hello from Deadlock!");

let currentState = {
  ability1: null,
  ability2: null,
  ability3: null,
  ability4: null,
};

/*
1. abilityName: String, newState: Boolean, currentState: Objects
2. the purpose of this function is to detect the state and print whether the ability has changed state or not
3. test cases: changeAbilityState('ability1', false) => should print nothing, it initializes the state to false
 */

function changeAbilityState(abilityName, newState) {
  const previousState = currentState[abilityName];
  const abilityUsedOrReady = newState ? "READY" : "USED";

  if (previousState === null) {
    currentState[abilityName] = newState;

    return;
  }

  if (previousState !== newState) {
    currentState[abilityName] = newState;
    $.Msg(`${abilityName} changed state`);
   $.Msg(`${abilityName} is now ${abilityUsedOrReady}\n`);
  }
}

/*
1. abilityPanel: PanoramaPanel
2. determines whether an ability is ready or not by examining its cooldown class and returns a boolean value indicating its readiness
3. cooling_down = true -> return false, cooling_down = false -> return true
*/
function getAbilityReadiness(abilityPanel) {
  const isCoolingDown = abilityPanel.BHasClass("cooling_down");
  return !isCoolingDown;
}

/*
1. rootPanel: PanoramaPanel
2. finds the ability panels inside the HUD, if it doesn't exist, return []
3. if abilityPanels exist, return an array of the ability panels, else return []
 */
function findAbilityPanels(rootPanel) {
  const root = rootPanel.FindChildTraverse("hud_signature");

  if (!root) {
    return [];
  }

  return root.FindChildrenWithClassTraverse("ability_container");
}

/*
1. rootPanel: PanoramaPanel
2. loops through the ability panels and checks their readiness,     updating the currentState accordingly
3. if an ability changes state, it will print the change in state
*/
function checkAbilities(rootPanel) {
  const panels = findAbilityPanels(rootPanel);
  panels.forEach((panel, index) => {
    const abilityReadiness = getAbilityReadiness(panel);
    changeAbilityState(`ability${index + 1}`, abilityReadiness);
  });
}

function getRootPanel() {
  let panel = $.GetContextPanel();

  // Traverse upward through the UI hierarchy
  // until we reach the highest parent.
  while (panel.GetParent()) {
    panel = panel.GetParent();
  }

  return panel;
}

function inspectAbilities() {
  const root = getRootPanel();
  checkAbilities(root);

  $.Schedule(2, inspectAbilities);
}

$.Schedule(2, inspectAbilities);