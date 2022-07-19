const express = require('express');

class getHeaderToken {

    getHeader(req, res, next) {
        res.headers(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      };
}

module.exports = new getHeaderToken;
