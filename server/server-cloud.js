const express = require('express');
const app = express();
const serverless = require('serverless-http');
const React = require('react');
const { renderToString } = require('react-dom/server');
const path = require('path');
const { StaticRouter } = require('react-router-dom');
const App = require('../src/App');
const __dirname = path.resolve();

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
            <App.default initialData={initialData}/>
        </StaticRouter>
    );

    // HTML template
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Product App</title>
         <link rel="shortcut icon" href="/public/favicon.ico" />
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
        <link rel="stylesheet" href="/client.css">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/assets/vendor.js"></script>
        <script src="/assets/client.js"></script>
      </body>
    </html>
  `;

    res.status(200).send(html);
});

const handler = serverless(app);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports.handler = (event, context, callback) => {
    return handler(event, context, callback);
};