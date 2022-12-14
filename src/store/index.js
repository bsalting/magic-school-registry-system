import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const campuses = (state = [], action) => {
  if (action.type === "SET_CAMPUSES") {
    return action.campuses;
  }
  if (action.type === "DELETE_CAMPUS") {
    return state.filter((campus) => campus.id !== action.campus.id);
  }
  if (action.type === "CREATE_CAMPUS") {
    return [...state, action.campus];
  }
  if (action.type === "UPDATE_CAMPUS") {
    return state.map((campus) =>
      campus.id === action.campus.id ? action.campus : campus
    );
  }
  return state;
};

const students = (state = [], action) => {
  if (action.type === "SET_STUDENTS") {
    return action.students;
  }
  if (action.type === "DELETE_STUDENT") {
    return state.filter((student) => student.id !== action.student.id);
  }
  if (action.type === "CREATE_STUDENT") {
    return [...state, action.student];
  }
  if (action.type === "UPDATE_STUDENT") {
    return state.map((student) =>
      student.id === action.student.id ? action.student : student
    );
  }
  return state;
};

const reducer = combineReducers({
  campuses,
  students,
});

const _setCampuses = (campuses) => {
  return {
    type: "SET_CAMPUSES",
    campuses,
  };
};

const _deleteCampus = (campus) => {
  return {
    type: "DELETE_CAMPUS",
    campus,
  };
};

const _updateCampus = (campus) => {
  return {
    type: "UPDATE_CAMPUS",
    campus,
  };
};

const _createCampus = (campus) => {
  return {
    type: "CREATE_CAMPUS",
    campus,
  };
};

const _setStudents = (students) => {
  return {
    type: "SET_STUDENTS",
    students,
  };
};

const _deleteStudent = (student) => {
  return {
    type: "DELETE_STUDENT",
    student,
  };
};

const _createStudent = (student) => {
  return {
    type: "CREATE_STUDENT",
    student,
  };
};

const _updateStudent = (student) => {
  return {
    type: "UPDATE_STUDENT",
    student,
  };
};

export const fetchCampuses = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/campuses");
    dispatch(_setCampuses(response.data));
  };
};

export const deleteCampus = (campus) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    dispatch(_deleteCampus(campus));
  };
};

export const createCampus = (campus) => {
  return async (dispatch) => {
    const response = await axios.post("/api/campuses", campus);
    dispatch(_createCampus(response.data));
  };
};

export const updateCampus = (campus) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(_updateCampus(response.data));
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/students");
    dispatch(_setStudents(response.data));
  };
};

export const deleteStudent = (student) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${student.id}`);
    dispatch(_deleteStudent(student));
  };
};

export const createStudent = (student) => {
  return async (dispatch) => {
    if (student.campusId === "") {
      student.campusId = null;
    }
    const response = await axios.post("/api/students", student);
    dispatch(_createStudent(response.data));
  };
};

export const updateStudent = (student) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/students/${student.id}`, student);
    dispatch(_updateStudent(response.data));
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
