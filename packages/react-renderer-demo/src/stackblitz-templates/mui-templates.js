export const muiHtml = `
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const muiCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/dist/cjs/component-mapper';

import schema from './schema'

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}}>
        <FormRenderer
          schema={schema}
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          onSubmit={console.log}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));`;

export const muiWizardCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import MuiFormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/dist/cjs/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <MuiFormTemplate {...props} showFormControls={false} />

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}}>
        <FormRenderer
          schema={schema}
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          onSubmit={console.log}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));`;

export const muiDependencies = {
  react: '^16.12.0',
  'react-dom': '^16.12.0',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/mui-component-mapper': 'latest',
  '@material-ui/core': 'latest',
  '@material-ui/icons': 'latest',
  'prop-types': 'latest'
};
