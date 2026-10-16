/*
TODO:
- Detect when an ability changes state
- Print an output when ability DOES change state
*/

let currentState = {
  abilityOne: true,
  abilityTwo: true,
  abilityThree: true,
  abilityFour: true,
};

/*
1. abilityName: String, newState: Boolean, currentState: Objects
2. the purpose of this function is to detect the state and print whether the ability has changed state or not
3. test cases: detectAbilityState('abilityOne', false) => should print "abilityOne changed state"
4. template code:
    
 */

function detectAbilityState(abilityName, newState) {
  if (currentState[abilityName] !== newState) {
    currentState[abilityName] = newState;
    console.log(`${abilityName} changed state`);
  }
}
