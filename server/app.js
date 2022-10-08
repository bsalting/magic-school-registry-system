const express = require("express");
const path = require("path");
const app = express();
const { Campus, Student } = require("../db");

app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/campuses", async (req, res, next) => {
  try {
    res.send(await Campus.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/campuses", async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/campus/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.update(req.body);
    res.status(200).send(campus);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    res.send(await Student.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.update(req.body);
    res.status(200).send(student);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
