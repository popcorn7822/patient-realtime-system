import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io();

// ✅ สร้าง interface สำหรับข้อมูลผู้ป่วย
interface PatientData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  Birthday?: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  preferredLanguage?: string;
  otherLanguage?: string;
  nationality?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  religion?: string;
}

const StaffView = () => {
  const [data, setData] = useState<PatientData>({});
  const [status, setStatus] = useState("Inactive");
  const [typingDots, setTypingDots] = useState("");

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    let resetStatusTimeout: NodeJS.Timeout;

    socket.on("typing", (incoming: PatientData) => {
      setData(incoming);
      setStatus("Typing");
      clearTimeout(resetStatusTimeout);

      resetStatusTimeout = setTimeout(() => {
        setStatus("Inactive");
        setTypingDots("");
      }, 10000);

      if (!typingInterval) {
        let count = 0;
        typingInterval = setInterval(() => {
          count = (count + 1) % 4;
          setTypingDots(".".repeat(count));
        }, 500);
      }
    });

    socket.on("submitForm", (incoming: PatientData) => {
      setData(incoming);
      setStatus("Submitted");
      setTypingDots("");
      clearTimeout(resetStatusTimeout);
      clearInterval(typingInterval);
    });

    return () => {
      clearInterval(typingInterval);
      clearTimeout(resetStatusTimeout);
    };
  }, []);

  const renderRow = (label: string, value: any) => (
    <div className="flex border-b py-2">
      <div className="w-1/3 text-gray-600 font-medium">{label}</div>
      <div className="w-2/3 text-gray-900">{value || "-"}</div>
    </div>
  );

  const statusDisplay =
    status === "Typing"
      ? `Typing${typingDots}`
      : status === "Submitted"
      ? "Submitted"
      : "Inactive";

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg border border-blue-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Staff Dashboard</h2>
      <div className="mb-4 text-sm text-gray-600">
        Status:{" "}
        <span
          className={`font-semibold ${
            status === "Typing"
              ? "text-yellow-600"
              : status === "Submitted"
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {statusDisplay}
        </span>
      </div>

      {Object.keys(data).length === 0 ? (
        <div className="text-gray-400 italic">No data received yet.</div>
      ) : (
        <div className="divide-y divide-blue-100">
          {renderRow("First Name", data.firstName)}
          {renderRow("Middle Name", data.middleName)}
          {renderRow("Last Name", data.lastName)}
          {renderRow("Date of Birth", data.Birthday)}
          {renderRow("Gender", data.gender)}
          {renderRow("Phone", data.phone)}
          {renderRow("Email", data.email)}
          {renderRow("Address", data.address)}
          {renderRow("Preferred Language", data.preferredLanguage)}
          {data.preferredLanguage === "Other" &&
            renderRow("Other Language", data.otherLanguage)}
          {renderRow("Nationality", data.nationality)}
          {renderRow("Emergency Contact Name", data.emergencyContactName)}
          {renderRow("Emergency Contact Relation", data.emergencyContactRelation)}
          {renderRow("Religion", data.religion)}
        </div>
      )}
    </div>
  );
};

export default StaffView;
