import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import API from '../api/axios';

const Analytics = ({ workspaceId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data: tasks } = await API.get(`/tasks/${workspaceId}`);
        
        // Format data specifically for the Doughnut Chart
        const chartData = [
          { name: 'To Do', value: tasks.filter(t => t.status === 'To Do').length, color: '#3B82F6' },
          { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: '#EAB308' },
          { name: 'Done', value: tasks.filter(t => t.status === 'Done').length, color: '#22C55E' },
        ].filter(item => item.value > 0); // Only show statuses that have tasks

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };
    if (workspaceId) fetchChartData();
  }, [workspaceId]);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-full">
      <h1 className="text-2xl font-bold mb-6">Task Distribution</h1>
      
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg h-[400px] w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80} // This creates the "Doughnut" hole
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 italic">
            Add tasks to your board to see the distribution chart.
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;