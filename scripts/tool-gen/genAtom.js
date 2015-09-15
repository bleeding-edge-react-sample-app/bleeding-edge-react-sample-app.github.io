import {prompt, getModules, end} from './common';

export default async function generateAtom({filePath, moduleName}){
  let content = '';
  console.log('k')
  content += `import React, {PropTypes} from 'react';\n`;
  content += await getModules(filePath);
  content += `
/**
  ${moduleName}
 **/
export default
class ${moduleName} extends React.Component {
  static propTypes = {

  };

  static defaultProps = {};

  render(){
    return (

    );
  }
}

`;
  end(content);
}
