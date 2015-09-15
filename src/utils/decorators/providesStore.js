import React, {PropTypes} from 'react';

export default function providesStore(store, Component){
  if (arguments.length < 2) return providesStore.bind(null, store);

  let propName = store.name || 'store';
  var propTypes = Component.propTypes || {};
  var matchedPropName = Object.keys(propTypes).find((key) => {
    return propTypes[key] && propTypes[key]._refluxStore === store;
  });
  if (matchedPropName) {
    propName = matchedPropName;
  }

  return class StoreProvider extends React.Component {
    static propTypes = Object.assign({}, Component.propTypes, {[propName]: () => {}});
    constructor(){
      super();
      this.state = {
        storeState: store.getState ? store.getState() : undefined,
      };
    }
    componentDidMount(){
      this.unsubscribe = store.listen((storeState) => {
        this.setState({storeState});
      });
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
    render(){
      return (
        <Component
          {...this.props}
          {...{[propName]: this.state.storeState}}
        />
      );
    }
  };
}

providesStore.getPropType = (store) => {
  var type = (...args) => PropTypes.any(...args);
  type._refluxStore = store;
  return type;
}
