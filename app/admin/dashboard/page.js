'use client'
import React, { useEffect } from "react";
import { data2, data01 } from './data';
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
  Cell
} from "recharts";
import styles from './Dashboard.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("reloaded");
    if (!hasReloaded) {
      window.location.reload();
      sessionStorage.setItem("reloaded", true);
      console.log("reload hua from admin!!!");
    }
  }, []);

  return (
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
