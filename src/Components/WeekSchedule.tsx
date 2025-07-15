import { useState, useEffect } from "react";

type ScheduleType = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  isWorkingDay: boolean;
};
type ScheduleField = keyof Pick<
  ScheduleType,
  "startTime" | "endTime" | "isWorkingDay"
>;

export const WeeklySchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  // For Last Sync Date
  useEffect(() => {
    fetch("https://localhost:7009/Schedule/GetScheduleByUserId?userId=1", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSchedule(response);
      })
      .catch((error) => {
        console.log(`Failed to load data: ${error}`);
      });
  }, []);

  const handleChange = (
    index: number,
    field: ScheduleField,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...schedule];

    if (field === "isWorkingDay") {
      updated[index][field] = e.target.checked as ScheduleType[typeof field];
    } else {
      updated[index][field] = e.target.value as ScheduleType[typeof field];
    }

    setSchedule(updated);
  };

  //Meeting invite identified by LLM
  const postData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://localhost:7009/Schedule/SaveSchedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(schedule),
        }
      );

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Weekly Schedule</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Day</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
            <th className="border p-2">Is Working Day</th>
          </tr>
        </thead>
        <tbody>
          {schedule.length > 0 ? (
            schedule.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 ${
                  item.isWorkingDay ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <td className="border p-2 font-medium">{item.day}</td>
                <td className="border p-2">
                  <input
                    type="time"
                    value={item.startTime}
                    onChange={(e) => handleChange(index, "startTime", e)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="time"
                    value={item.endTime}
                    onChange={(e) => handleChange(index, "endTime", e)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.isWorkingDay}
                    onChange={(e) => handleChange(index, "isWorkingDay", e)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4">
                No schedule items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-6 text-center">
        <button
          onClick={postData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          <span>
            &nbsp;
            {isLoading ? "Saving Schedule..." : "Save Schedule"}
          </span>
        </button>
      </div>
    </div>
  );
};
