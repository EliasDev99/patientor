import { Patient } from '../types';

const SinglePatientInfo = ({ patient }: { patient: Patient | undefined }  ) => {
  return (
    <>
      <h3>{patient?.name}</h3> 
      <p>
        ssn: {patient?.ssn} <br/>
        occupation: {patient?.occupation}
      </p>
    </>
  );
};

export default SinglePatientInfo;