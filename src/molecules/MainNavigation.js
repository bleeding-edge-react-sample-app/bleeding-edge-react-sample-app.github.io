import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Button from '../atoms/Button';

const tabs = [
  {name: 'Home', to: '/', which: 'secondary'},
  {name: 'Me', to: '/user/clessg'},
];

export default
class MainNavigation extends React.Component {
  render(){
    return (
      <Box>
        <Box direction="row">
          {tabs.map((tab) => {
            return (
              <Box margin={{left: "0.1em"}} key={tab.name}>
                <Button which={tab.which}>{tab.name}</Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}
