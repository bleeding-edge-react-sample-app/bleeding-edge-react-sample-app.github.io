import React, {PropTypes} from 'react';
import Box from '../../atoms/Box';
import SubBoardHeaderWrapper from '../../organisms/SubBoardHeaderWrapper';
import EditingPaneWrapper from '../../organisms/EditingPaneWrapper';
import MainNavigation from '../../molecules/MainNavigation';
import {TransitionMotion, spring} from 'react-motion';

export default
class MainLayout extends React.Component {

  static contextTypes = {
    history: PropTypes.any,
  };

  render(){
    window.h = this.context.history;
    return (
      <Box>
        <Box>
          <SubBoardHeaderWrapper />
          <MainNavigation />
        </Box>
        <Box margin="1em">
          {this.renderContent()}
        </Box>
        <Box>
          <EditingPaneWrapper />
        </Box>
      </Box>
    );
  }
  renderContent(){
    var enterStyles = {
      left: spring(-105),
    };
    var leaveStyles = {
      left: spring(105),
    };

    // better way to get the location?
    var key = window.location.href;

    var styles = {
      [key]: {
        left: spring(0)
      }
    };

    return (
      <TransitionMotion
        willEnter={() => enterStyles}
        willLeave={() => leaveStyles}
        styles={styles}
        children={(allStyles) => {
          var styles = allStyles[key];
          return (
            <Box
              children={this.props.children}
              style={{
                left: styles.left + '%',
                position: 'absolute',
              }}
            />
          );
        }}
      />

    );
  }
}
