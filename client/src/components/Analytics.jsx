import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = ({ tasks }) => {
  // Count tasks by status
  const dataCounts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const data = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: '# of Tasks',
        data: [dataCounts.todo, dataCounts['in-progress'], dataCounts.done],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-center">Task Progress</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default Analytics;