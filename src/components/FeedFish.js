import React, { useState } from "react";

function FeedFish() {
  const [schedules, setSchedules] = useState(["07:00", "19:00"]); // Inicializa con dos horarios vacíos

  const addSchedule = () => {
    setSchedules([...schedules, ""]); // Agrega un nuevo horario vacío
  };

  const removeSchedule = () => {
    if (schedules.length > 2) {
      setSchedules(schedules.slice(0, -1)); // Elimina el último elemento de la lista si hay más de dos horarios
    }
  };

  const updateSchedule = (index, value) => {
    const newSchedules = [...schedules];
    newSchedules[index] = value;
    setSchedules(newSchedules); // Actualiza el horario específico
  };

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
      <div className="flex flex-col items-center">
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
              className="rounded-md bg-zinc-800 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-zinc-600 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              value={schedule}
              onChange={(e) => updateSchedule(index, e.target.value)}
            />
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
