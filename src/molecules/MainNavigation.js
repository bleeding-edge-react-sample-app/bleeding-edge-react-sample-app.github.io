import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Link from '../atoms/Link';

const tabs = [
  {name: 'Home', to: '/', which: 'secondary'},
  {name: 'React', to: '/r/reactjs'},
  {name: 'JavaScript', to: '/r/javascript'},
  {name: 'GIF', to: '/r/gif'},
  {name: 'cats', to: '/r/cats'},
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
                <Link unstyled to={tab.to}>
                  <Button which={tab.which}>{tab.name}</Button>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}
