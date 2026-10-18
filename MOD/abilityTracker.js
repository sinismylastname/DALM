/*
TODO:
- Detect when an ability changes state
- Print an output when ability DOES change state
*/

let currentState = {
  abilityOne: null,
  abilityTwo: null,
  abilityThree: null,
  abilityFour: null,
};

/*
1. abilityName: String, newState: Boolean, currentState: Objects
2. the purpose of this function is to detect the state and print whether the ability has changed state or not
3. test cases: changeAbilityState('abilityOne', false) => should print "abilityOne changed state"
4. template code:
    
 */

function changeAbilityState(abilityName, newState) {
  const previousState = currentState[abilityName];

  if (previousState === null) {
    currentState[abilityName] = newState;
    return;
  }

  if (previousState !== newState) {
    currentState[abilityName] = newState;
    console.log(`${abilityName} changed state`);
  }
}

changeAbilityState("abilityOne", false); // should print "abilityOne changed state"
changeAbilityState("abilityTwo", true); // should print "abilityTwo changed state"
