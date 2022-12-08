import React from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { setPatientList, useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import SinglePatientInfo from "./PatientListPage/SinglePatientInfo";

const App = () => {
  const [, dispatch] = useStateValue();
  const [patientInfo, setPatientInfo] = React.useState<Patient>();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  const fetchSinglePatient = async (id: string | undefined)  => {
    if(id === undefined ) {
      throw new Error('content not found');
    }
    try {
       const { data } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      return setPatientInfo(data);
    } catch (e) {
      console.error(e);
    }
  };

  const match = useMatch('/patients/:id');
  React.useEffect(() => {
    if(match) {
     void fetchSinglePatient(match.params.id);
    }
  }, [match]);
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<SinglePatientInfo patient={patientInfo}/>} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
