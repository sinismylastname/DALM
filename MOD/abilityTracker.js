/*
TODO:
- Detect when an ability changes state
- Print an output when ability DOES change state
*/

let currentState = {
  ability1: null,
  ability2: null,
  ability3: null,
  ability4: null,
};

const mockAbilityPanel = {
  BHasClass: function (className) {
    return className === "cooling_down";
  },
};

const mockRootPanel = {
  FindChildTraverse: function (panelId) {
    if (panelId === "hud_signature") {
      return {
        FindChildrenWithClassTraverse: function (className) {
          if (className === "ability_container") {
            return [mockAbilityPanel, mockAbilityPanel];
          }

          return [];
        },
      };
    }

    return null;
  },
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
    console.log(`${abilityName} changed state`);
    console.log(`${abilityName} is now ${abilityUsedOrReady}\n`);
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
2. loops through the ability panels and checks their readiness, updating the currentState accordingly
3. if an ability changes state, it will print the change in state
*/
function checkAbilities(rootPanel) {
  const panels = findAbilityPanels(rootPanel);
  panels.forEach((panel, index) => {
    const abilityReadiness = getAbilityReadiness(panel);
    changeAbilityState(`ability${index + 1}`, abilityReadiness);
  });
}

/*
FORMER TESTS:
========================
changeAbilityState("ability1", false); // Initializes, no output
changeAbilityState("ability1", true); // Prints changed state
changeAbilityState("ability1", true); // No output
changeAbilityState("ability1", false); // Prints changed state

console.log(getAbilityReadiness(mockAbilityPanel)); // Prints false

const panels = findAbilityPanels(mockRootPanel);
console.log(panels.length); // Expected: 2

checkAbilities(mockRootPanel);
console.log(currentState); // Should print { ability1: false, ability2: false, ability3: null, ability4: null }
*/
