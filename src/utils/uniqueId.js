/**
  Generates unique ids primarily for use with input/label id/htmlFor
 **/
let counter = 0;
export default
function uniqueId(){
  counter++;
  return 'uniqueId--' + counter;
}
