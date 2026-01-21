import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import API from '../api/axios';

const columnsFromBackend = {
  'To Do': { name: 'To Do', items: [] },
  'In Progress': { name: 'In Progress', items: [] },
  'Done': { name: 'Done', items: [] },
};

const KanbanBoard = ({ workspaceId }) => {
  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get(`/tasks/${workspaceId}`);
        
        // Map backend tasks into their respective columns based on status
        const newColumns = {
          'To Do': { name: 'To Do', items: data.filter(t => t.status === 'To Do') },
          'In Progress': { name: 'In Progress', items: data.filter(t => t.status === 'In Progress') },
          'Done': { name: 'Done', items: data.filter(t => t.status === 'Done') },
        };
        
        setColumns(newColumns);
      } catch (err) {
        console.error("Task fetch failed", err);
      }
    };

    if (workspaceId) fetchTasks();
  }, [workspaceId]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = [...sourceCol.items];
      const destItems = [...destCol.items];
      const [removed] = sourceItems.splice(source.index, 1);
      
      // Update local state
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });

      // Update backend status - Ensure your backend route matches this path
      try {
        await API.patch(`/tasks/${removed.id}`, { status: destination.droppableId });
      } catch (err) {
        console.error("Failed to update task status in backend", err);
      }
    }
  };

  const addTask = async () => {
    const title = prompt("Enter task title:");
    if (!title) return;

    try {
      const newTask = {
        title,
        description: "",
        status: "To Do",
        workspaceId: workspaceId
      };
      const { data } = await API.post('/tasks', newTask);
      
      // Update columns state to show the new task in 'To Do'
      setColumns({
        ...columns,
        'To Do': {
          ...columns['To Do'],
          items: [...columns['To Do'].items, data]
        }
      });
    } catch (err) {
      alert("Failed to add task");
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <button 
        onClick={addTask} 
        className="self-start bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 transition"
      >
        + Add Task
      </button>

      <div className="flex justify-start h-full overflow-x-auto gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="flex flex-col items-center" key={columnId}>
              <h2 className="text-gray-300 font-bold mb-4 uppercase text-sm tracking-widest">{column.name}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className="bg-gray-800 p-4 w-72 min-h-[500px] rounded-lg border border-gray-700"
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps} 
                            className="bg-gray-700 p-4 mb-4 rounded shadow-md text-white border-l-4 border-blue-500 hover:bg-gray-600 transition"
                          >
                            {item.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;