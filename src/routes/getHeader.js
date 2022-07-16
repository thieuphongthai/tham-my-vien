const express = require('express');

class getHeaderToken {

    getHeader(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      };
}

module.exports = new getHeaderToken;
