import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import path from 'path';
import {fileURLToPath} from 'url';
import {StaticRouter} from "react-router-dom";
import App from "../src/App";
const serverless = require('serverless-http');

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../public')));

// SSR route handler
app.get('*', async (req, res) => {
    let initialData = {
        product: {
            id: 1,
            name: 'Hehehe',
            description: 'Hehehe',
            price: 1234,
        }
    };

    // Render the app to a string
    const appHtml = renderToString(
        <StaticRouter location={req.url}>
            <App initialData={initialData}/>
        </StaticRouter>
    );

    // HTML template
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Product App</title>
         <link rel="shortcut icon" href="/favicon.ico" />
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
        <link rel="stylesheet" href="/client.css">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/vendor.js"></script>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

    res.status(200).send(html);
});

module.exports.handler = serverless(app);