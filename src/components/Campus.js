import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { updateStudent } from "../store";
import CampusUpdate from "./CampusUpdate";

const Campus = () => {
  const { id } = useParams();
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    students: [],
  });

  useEffect(() => {
    const campus = campuses.find((campus) => campus.id === id);

    if (campus) {
      setInputs({
        ...inputs,
        name: campus.name,
        students: students.filter((student) => student.campusId === id),
      });
    }
  }, [campuses, students, id]);

  return (
    <div className="container">
      <div id="campus-panel-l">
        <h3>{inputs.name}</h3>
        <div>
          <CampusUpdate />
        </div>
      </div>
      <div id="campus-panel-r">
        <h3>Enrollee Roster</h3>
        <ul>
          {inputs.students.length > 0
            ? inputs.students.map((student) => {
                return (
                  <li key={student.id} className="li-compact">
                    <span className="enrollee-fl">
                      <Link to={`/students/${student.id}`}>
                        {student.firstName
                          .concat(" ", student.lastName)
                          .substring(0, 30)}
                      </Link>
                    </span>
                    <span className="enrollee-fr">
                      <button
                        onClick={() => {
                          dispatch(
                            updateStudent({ ...student, campusId: null })
                          );
                        }}
                      >
                        Unenroll
                      </button>
                    </span>
                  </li>
                );
              })
            : "No enrollee"}
        </ul>
      </div>
    </div>
  );
};

export default Campus;
