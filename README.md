## Facial Recognition Web Application

This web application can detect human faces in an image and show a list of probability scores based on age, gender and ethnicity. The client UI is built using React with Redux managing UI and server state, REST API is built using node.js/express.js connected to a PostgreSQL database. The prediction data uses the Clarifai API. 

## Features

'Sign in/Register' requests to the REST server are handled using axios with server side form validation. JWT (JSON Web Tokens) are used for user authentification and Bcrypt for password hashing. User credentials are stored in a PostgreSQL databse.

[![Screen-Shot-2021-01-11-at-10-26-02.png](https://i.postimg.cc/qRZSVYBM/Screen-Shot-2021-01-11-at-10-26-02.png)](https://postimg.cc/2bh2n0BP)

The main dashboard has an Image input component which allows the user to input an image URL. When the button is clicked, a request is made to the Clarifai API which responds with the relevant predict data. The dashboard also shows a count for the number of searches the user has made.

[![Screen-Shot-2021-01-11-at-10-27-49.png](https://i.postimg.cc/g0RSxJKR/Screen-Shot-2021-01-11-at-10-27-49.png)](https://postimg.cc/zLzSMq6X)

The JSON data from the API contains coordinates for each detected human face which is then mapped and display on the image. The JSON response also contains the demographic predict data for each face which is also mapped and displayed. Hovering over each detected face will show the corresponding data.

[![Screen-Shot-2021-01-11-at-10-28-38.png](https://i.postimg.cc/YCJ31HnH/Screen-Shot-2021-01-11-at-10-28-38.png)](https://postimg.cc/XrkdbT6H)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
