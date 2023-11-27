const express = require("express");
const createError = require("http-errors");

const pageNotFound = (req, res, next) => {
  res.status(404).json({
    message: "This page doesnot exists",
  });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(400).json({
      error: "Invalid ID format",
    });
  } else if (err.name === "ValidationError") {
    res.status(401).json({
      message: err.message,
    });
  }else
    res.status(400).json({
      errorName: err.name,
      message: err.message,
    });
};

module.exports = { errorHandler, pageNotFound };
