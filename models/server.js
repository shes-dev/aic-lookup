const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080; // Loaded from .env file
    this.paths = {
      default: "/",
      auth: "/api/auth",
      homepage: "/api/homepage",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors()); // Enable CORS
  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.default, require("../routes/auth"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.homepage, require("../routes/homepage"));

    const root = require('path').join(__dirname, '../client/build');
    this.app.use(express.static(root));

    this.app.use('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;