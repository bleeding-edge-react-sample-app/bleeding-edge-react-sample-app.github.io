/**
  For use in shouldComponentUpdate. Allows avoiding the equality check on children
  which in many cases will never ===.
 **/
export default function shallowCompareWithChildrenId(props, nextProps, state, nextState){
  var hasChildrenId = props.childrenId != null && nextProps.childrenId != null;
  var childrenKeyEqual = hasChildrenId && props.childrenId === nextProps.childrenId;
  var childrenEqual = hasChildrenId || props.children === nextProps.children;

  function equal(sourceA, sourceB){
    return Object.keys(sourceA).every(function(key){
      if (key === 'children') return childrenEqual;

      var a = sourceA[key];
      var b = sourceB[key];

      if (a === b) return true;
    });
  }

  if (!equal(props, nextProps)) return false;
  if (!equal(nextProps, props)) return false;

  // state should never update to have more/less keys
  if (state) {
    if (!equal(state, nextState)) return false;
  }

  return true;
}
