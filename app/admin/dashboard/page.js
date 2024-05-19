"use client";
import React, { useState, useEffect } from "react";
import { data2, data01 } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import {
  BarChart,
  PieChart,
  Pie,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";
import useAPIData from "../../../apiConfig/useAPIData";
import styles from "./Dashboard.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Dashboard = () => {
  const [recentDrives, setRecentDrives] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false); // New state to track data fetch status
  const { getItems } = useAPIData();

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("reloaded");
    if (!hasReloaded) {
      window.location.reload();
      sessionStorage.setItem("reloaded", true);
      console.log("reload hua from admin!!!");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getItems('TPO_Drive', '*,RoundsInDrive.*', null, null, null, null, null, true);
        console.log('drive: ', response.data);
        if (Array.isArray(response.data)) {
          const sortedDrives = response.data.sort((a, b) => new Date(b.EndDate) - new Date(a.EndDate));
          setRecentDrives(sortedDrives.slice(0, 5));
        } else {
          console.error('Error: Expected an array of drives but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsDataFetched(true); 
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.barChartContainer}>
          <h1 className={styles.heading}>Placement Analysis 2023</h1>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[20, 30]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Placed" fill="#8884d8" />
              <Bar dataKey="Registered" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.pieChartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.name}
              >
                {data01.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* The table for the most recent drives */}
      {isDataFetched && (
        <Table aria-label="Recent drives table" className={styles.table}>
          <TableHead>
            <div className={styles.headingContainer}>
              <h1 className={styles.heading}>Recent Drives</h1>
            </div>
            <TableRow style={{backgroundColor:'#c5cad9'}}>
              <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Role</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Drive status</TableCell>
              <TableCell style={{fontWeight:'bold'}}>EndDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentDrives.map((drive) => (
              <TableRow key={drive.id}>
                <TableCell>{drive.Name}</TableCell>
                <TableCell>{drive.RolesOffered}</TableCell>
                <TableCell>{drive.DriveStatus}</TableCell>
                <TableCell>
                  {new Date(drive.EndDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Dashboard;
