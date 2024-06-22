import React, { useEffect, useState, Component} from "react";

function FeedFish() {
  const [schedules, setSchedules] = useState([
    { id: 1, time: "07:00" },
    { id: 2, time: "19:00" },
  ]);
  const [editing, setEditing] = useState(schedules.map(() => false)); // Inicializa con todos los horarios en modo de edición desactivado
  const [newScheduleTime, setNewScheduleTime] = useState(""); // Estado para el nuevo horario
  // Manejador para el botón de editar/OK
  const toggleEdit = async (id) => {
    console.log("id", id);
    const index = schedules.findIndex((schedule) => schedule.id === id);
    console.log("index", index);
    console.log(schedules);
    const newEditing = [...editing];
    if (editing[index]) {
      const scheduleToUpdate = schedules[index];
      console.log("scheduleToUpdate", scheduleToUpdate);
      try {
        await fetch("http://localhost:8000/api/schedules/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: scheduleToUpdate.id,
            schedule: scheduleToUpdate.time,
          }),
        });
      } catch (error) {
        console.error("Error updating schedule:", error);
      }
    }
    newEditing[index] = !newEditing[index];
    setEditing(newEditing);
  };
  const addSchedule = async () => {
    const newScheduleTime = "14:00:00"; // Este valor debería obtenerse de algún input del usuario
    try {
      const response = await fetch("http://localhost:8000/api/schedules/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: schedules.length + 1,
          time: newScheduleTime,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const addedSchedule = await response.json();
      console.log(response);
      // el backend devuelve el horario creado, incluyendo un ID generado
      setSchedules([...schedules, addedSchedule]);
      fetchSchedules();
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };
  // const addSchedule = () => {
  //   setSchedules([...schedules, "14:00"]); // Agrega un nuevo horario vacío
  // };

  const removeSchedule = async () => {
  if (schedules.length > 2) {
    const scheduleToRemove = schedules[schedules.length - 1];
    try {
      const response = await fetch(`http://localhost:8000/api/schedules/delete/${scheduleToRemove.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Actualiza el estado para reflejar la eliminación del horario
      setSchedules(schedules.slice(0, -1));
    } catch (error) {
      console.error("Error removing schedule:", error);
    }
  } else {
    alert("No puedes eliminar más horarios");
  }
};

  const updateSchedule = (id, value) => {
    const newSchedules = schedules.map((schedule) =>
      schedule.id === id ? { ...schedule, time: value } : schedule
    );
    setSchedules(newSchedules);
  };

  const fetchSchedules = async () => {
    try {
      console.log("Fetching schedules..");
      const response = await fetch("http://localhost:8000/api/schedules");
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const data = await response.json();
      // Mapea los objetos del array a sus propiedades 'time'
      console.log("data", data);
      // const times = data.map((schedule) => schedule.time);
      // setSchedules(times || []);
      setSchedules(data.schedules || []);
      console.log("data.schedules: ", data.schedules);
      console.log("Schedules fetched:", data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Alimentar Pez
        </h2>
      </div>
      <div className="flex flex-col items-center max-w-xl mx-auto">
        {schedules.map((schedule, index) => (
          <div key={index} className="my-2 flex items-center">
            <label
              htmlFor={`schedule-${index}`}
              className="text-md font-medium text-gray-200 mr-2"
            >
              Horario {index + 1}:
            </label>
            <input
              type="time"
              id={`schedule-${index}`}
              className={`rounded-md bg-zinc-800 py-1.5 px-2 shadow-sm ring-1 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${
                editing[index]
                  ? "text-white ring-white"
                  : "text-zinc-600 ring-zinc-600"
              }`}
              value={schedule.time}
              onChange={(e) => updateSchedule(schedule.id, e.target.value)}
              disabled={!editing[index]} // Deshabilita el input a menos que esté en modo de edición
            />
            {/* Botón de editar/OK con renderizado condicional */}
            <button
              className={`ml-2 py-1 px-4 rounded-md ${
                editing[index]
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-teal-700 hover:bg-teal-800"
              } text-white `}
              onClick={() => toggleEdit(schedule.id)}
            >
              {editing[index] ? "OK" : "✏️"}
            </button>
          </div>
        ))}
        <button
          onClick={addSchedule}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700"
        >
          +
        </button>
        <button
          onClick={removeSchedule}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-700"
        >
          -
        </button>
        <button
          // onClick={feedNow} // Aquí iría la función para alimentar ahora, pero se omite por ser solo frontend
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-700"
        >
          Alimentar Ahora
        </button>
      </div>
    </div>
  );
}

export default FeedFish;
