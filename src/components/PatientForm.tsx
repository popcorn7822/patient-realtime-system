import React, { useState } from "react";
import io from "socket.io-client";
const socket = io();

const PatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    Birthday: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    preferredLanguage: "",
    otherLanguage: "",
    nationality: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    religion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    socket.emit("typing", updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("submitForm", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl text-blue-700 font-bold mb-4">Patient Form</h1>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="Enter first name"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Middle Name</label>
        <input
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Enter middle name"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Enter last name"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="Birthday"
          value={formData.Birthday}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Gender <span className="text-red-500">*</span>
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-300 rounded"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter email"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Enter address"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Preferred Language <span className="text-red-500">*</span>
        </label>
        <select
          name="preferredLanguage"
          value={formData.preferredLanguage}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-300 rounded"
        >
          <option value="">Select a language</option>
          <option value="Thai">Thai</option>
          <option value="English">English</option>
          <option value="Chinese">Chinese</option>
          <option value="Other">Other</option>
        </select>
        {formData.preferredLanguage === "Other" && (
          <input
            type="text"
            name="otherLanguage"
            value={formData.otherLanguage}
            onChange={handleChange}
            placeholder="Please specify"
            className="mt-2 w-full p-2 border border-blue-300 rounded"
          />
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Nationality <span className="text-red-500">*</span>
        </label>
        <input
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
          placeholder="Enter nationality"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <div className="mb-3 flex gap-2">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">Emergency Contact Name</label>
          <input
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            placeholder="Contact Name"
            className="w-full p-2 border border-blue-300 rounded"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">Relationship</label>
          <input
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleChange}
            placeholder="Relationship"
            className="w-full p-2 border border-blue-300 rounded"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Religion</label>
        <input
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          placeholder="Enter religion"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default PatientForm;
