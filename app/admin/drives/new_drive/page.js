"use client"; // Page.js
import React, { useState, useEffect } from "react";
import useAPIData from "../../../../apiConfig/useAPIData";
import useAPIAuth from "../../../../apiConfig/useAPIAuth";
import FormUI from "../../../components/admin_components/FormUI";

export default function Page() {
  const { createItem, getItems } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Mode: "Offline",
    MinCTC: 0,
    MaxCTC: 0,
    RolesOffered: "",
    NumRounds: 0,
    Slab: "",
    Criteria10: 0,
    Criteria12: 0,
    CriteriaGender:"Open",
    CriteriaActiveKT: 0,
    CriteriaDeadKT: 0,
    CriteriaDiploma: 0,
    CriteriaGap12: 0,
    CriteriaGap10: 0,
    CriteriaGapDiploma: 0,
    CriteriaUG: 0,
    CriteriaSemBackCount: 0,
    StartDate: "",
    EndDate: "",
    HRName: "",
    HREmail: "",
    HRConact: "",
    DriveStatus: "Upcoming"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getItems(
          "TPO_Drive",
          null,
          null,
          null,
          null,
          null,
          null,
          true
        );
        if (response.data && response.data.length > 0) {
          setFormData(
            response.data.map((entry) => ({
              Name: entry.name,
              Description: entry.description,
              Mode: entry.Mode,
              MinCTC: entry.MinCTC,
              MaxCTC: entry.MaxCTC,
              Slab: entry.Slab,
              RolesOffered: entry.RolesOffered,
              NumRounds: entry.NumRounds,
              Criteria10: entry.Criteria10,
              Criteria12: entry.Criteria12,
              CriteriaActiveKT: entry.CriteriaActiveKT,
              CriteriaDeadKT: entry.CriteriaDeadKT,
              CriteriaDiploma: entry.CriteriaDiploma,
              CriteriaGap10: entry.CriteriaGap10,
              CriteriaGap12: entry.CriteriaGap12,
              CriteriaGapDiplloma: entry.CriteriaGapDiplloma,
              CriteriaGender: entry.CriteriaGender,
              CriteriaUG: entry.CriteriaUG,
              CriteriaSemBackCount: entry.CriteriaSemBackCount,
              StartDate: entry.StartDate,
              EndDate: entry.EndDate,
              HRName: entry.HRName,
              HREmail: entry.HREmail,
              HRContact: entry.HRContact,
              DriveStatus: entry.DriveStatus
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching drives:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  
    try {
      const accessToken = await getAccessToken();
      const newItemData = {
        Name: formData.Name,
        Description: formData.Description,
        Mode: formData.Mode,
        MinCTC: formData.MinCTC,
        MaxCTC: formData.MaxCTC,
        Slab: formData.Slab,
        RolesOffered: formData.RolesOffered,
        NumRounds: formData.NumRounds,
        Criteria10: formData.Criteria10,
        Criteria12: formData.Criteria12,
        CriteriaActiveKT: formData.CriteriaActiveKT,
        CriteriaDeadKT: formData.CriteriaDeadKT,
        CriteriaDiploma: formData.CriteriaDiploma,
        CriteriaGap10: formData.CriteriaGap10,
        CriteriaGap12: formData.CriteriaGap12,
        CriteriaGapDiplloma: formData.CriteriaGapDiplloma,
        CriteriaGender: formData.CriteriaGender,
        CriteriaUG: formData.CriteriaUG,
        CriteriaSemBackCount: formData.CriteriaSemBackCount,
        StartDate: formData.StartDate,
        EndDate: formData.EndDate,
        HRName: formData.HRName,
        HREmail: formData.HREmail,
        HRContact: formData.HRContact,
        DriveStatus: formData.DriveStatus
      };
      const newItem = await createItem(
        "TPO_Drive",
        newItemData,
        true,
        accessToken
      );
      console.log("New Item:", newItem);
  
      // Clear the form data
      setFormData({
        Name: "",
        Description: "",
        Mode: "Offline",
        MinCTC: "0",
        MaxCTC: "0",
        RolesOffered: "",
        NumRounds: "0",
        Slab: "",
        Criteria10: "0",
        Criteria12: "0",
        CriteriaGender: "Open",
        CriteriaActiveKT: "0",
        CriteriaDeadKT: "0",
        CriteriaDiploma: "0",
        CriteriaGap12: "0",
        CriteriaGap10: "0",
        CriteriaGapDiploma: "0",
        CriteriaUG: "0",
        CriteriaSemBackCount: "0",
        StartDate: "",
        EndDate: "",
        HRName: "",
        HREmail: "",
        HRContact:"",
        DriveStatus:"Upcoming"
      });
  
      // Display success alert
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      // Display error alert
      alert("Error submitting form. Please try again.");
    }
  };
  

  return (
    <FormUI
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
