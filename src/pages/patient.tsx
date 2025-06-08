import React from "react";
import dynamic from "next/dynamic";
const PatientForm = dynamic(() => import("../components/PatientForm"), { ssr: false });

const PatientPage = () => <PatientForm />;
export default PatientPage;
