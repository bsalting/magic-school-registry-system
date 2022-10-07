import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampus } from "./store";
import { Link } from "react-router-dom";
import CampusCreate from "./CampusCreate";

const Campuses = () => {
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="panel">
        <h3>Campus Listing</h3>
        <ul>
          {campuses.map((campus) => {
            const enrollees = students.filter(
              (student) => student.campusId === campus.id
            );
            return (
              <li key={campus.id}>
                <div id="li-campuses">
                  <div>
                    <img src={campus.imageUrl}></img>
                  </div>
                  <div>
                    <b>{campus.name}</b> ({enrollees.length}
                    {enrollees.length > 1
                      ? " enrollments"
                      : " enrollment"}) <br />
                    {campus.address} <br />
                    {campus.description} <br />
                    <Link to={`/campuses/${campus.id}`}>
                      Update Details
                    </Link>{" "}
                    <button
                      onClick={() => {
                        dispatch(deleteCampus(campus));
                      }}
                    >
                      x
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="panel">
        <CampusCreate />
      </div>
    </div>
  );
};

export default Campuses;