import * as React from 'react';
import { render } from "react-dom";
import Amplify from 'aws-amplify';
import App from '@/components/App';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "APIGatewayAPI",
        endpoint: process.env.API_END_POINT
      },
    ]
  }
});


render(<App/>, document.querySelector('#app'));
