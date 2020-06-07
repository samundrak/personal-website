import React from "react";
import ReactIcon from "@site/static/img/techs/react.svg";
import JSIcon from "@site/static/img/techs/js.svg";
import TsIcon from "@site/static/img/techs/typescript.svg";
import NodeIcon from "@site/static/img/techs/nodejs.svg";

export default [
  {
    date: "1 jan 2020 - current",
    role: "JavaScript Developer- CoveredBySage",
    location: "Kathmandu, Nepal",
    website: "http://www.coveredbysage.com",
    icon: <TsIcon />,
    description: () => (
      <ul>
        <li>
          Use state management tool to maintain the complex data structure.
          (Redux)
        </li>
        <li>
          Real-time user interface with WebSockets & ajax polling (Socket.io)
        </li>
        <li>Handle client-side authentication. (JWT, Cookie based Session)</li>
        <li>Write unit test, integration test.(Jest, CodeCeptJS)</li>
        <li>
          Optimization, Refactor and Gained Performance with things like code
          splitting, Service worker, web worker, clientside caching
        </li>
        <li>Review code quality, maintain code standard across the team.</li>
        <li>Just Started new journey...</li>
      </ul>
    ),
  },
  {
    date: "Dec 2017 - Dec 2019",
    role: "JavaScript Developer -  Javra Software",
    location: "Kathmandu, Nepal",
    website: "http://www.javra.com",
    icon: <JSIcon />,
    description: () => (
      <ul>
        <li>
          Led the development and adoption of React to a dashboard web app.
        </li>
        <li>Write application using latest EcmaScript specification</li>
        <li>
          Build an interface to manipulate the image for e-commerce
          products.(Fabricjs)
        </li>
        <li>Create a plugin to be pluggable on any website.</li>
      </ul>
    ),
  },
  {
    date: "Jun 2016 - Dec 2017",
    role: "JavaScript Developer - Introcept Nepal ",
    location: "Lalitpur, Nepal",
    website: "http://nepal.introcept.co/",
    icon: <ReactIcon />,
    description: () => (
      <ul>
        <li>Part of the front end development team of their Vue web app.</li>
        <li>
          Managed application state maintaining the Single source of truth.
          (Vuex)
        </li>
        <li>Developed & maintained reusable components repository.</li>
        <li>
          Maintained Code quality, frontend project structure. (Linting/Strict
          typing)
        </li>
        <li>Developed RESTful API using laravel.</li>
        <li>Managed the application using bundling tool. (Webpack)</li>
        <li>Regularly Monitored application performance.(Sentry/DevTools)</li>
        <li>Delivered scalable client application (https://agentcis.com/)</li>
        <li>
          Managed Knowledge sharing session and Presentation of new trends
          internally
        </li>
        <li>Prevented Security issues</li>
      </ul>
    ),
  },
  {
    date: "Mar 2015 - May 2016",
    role: "NodeJS Developer- ZyobaLabs",
    location: "Kathmandu, Nepal",
    icon: <NodeIcon />,
    description: () => (
      <ul>
        <li>
          {" "}
          Built API's using express Analyzed code quality and application
        </li>
        <li>
          performance Integrated API with AngularJS Analyzed user experience
          Full
        </li>
        <li>
          stack development using Node.js, Express, Angular, and Mysql Delivered
        </li>
        <li>
          fast and speedy client interface Created charts and visualization
          using
        </li>
        <li>D3, D3plus</li>
      </ul>
    ),
  },
];
