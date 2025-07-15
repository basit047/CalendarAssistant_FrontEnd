import React, { useState, useEffect } from "react";

interface Timezone {
  id: string;
  name: string;
}

interface UserTimeZoneMapping {
  userId: number;
  userName: string | null;
  timeZoneId: string | null;
  createdAt: string;
  modifiedAt: string | null;
}

export const EditUser = () => {
  const [user, setUser] = useState<UserTimeZoneMapping>();
  const [timezones, setTimezones] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = 1;
  // Fetch timezones (mocked)
  useEffect(() => {
    async function fetchTimezones() {
      try {
        const response = await fetch(
          "https://localhost:7009/Schedule/GetAllTimeZone"
        ); // Replace with actual API
        const data = await response.json(); // [{ id: "UTC", label: "(UTC+00:00) UTC" }, ...]
        setTimezones(data);

        //If user has no timezone, default to first
        if (!user?.timeZoneId && data.length > 0) {
          setUser((prev) => ({
            ...prev!,
            timeZoneId: data[0].id,
          }));
        }
      } catch (err) {
        console.error(err);
        setMessage("Failed to load timezones.");
      }
    }

    fetchTimezones();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          `https://localhost:7009/Schedule/GetUserTimeZoneMapping?userId=${userId}`
        ); // Replace with actual API
        const data = await response.json(); // [{ id: "UTC", label: "(UTC+00:00) UTC" }, ...]
        setUser(data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load user's data.");
      }
    }

    fetchUserData();
  }, []);

  const handleTimezoneChange = (e: any) => {
    //setUser({ ...user, timeZoneId: e.target.value });
    setUser((prev) => ({
      ...prev!,
      timeZoneId: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    if (!user) return;

    try {
      const response = await fetch(
        `https://localhost:7009/Schedule/SaveUserTimeZoneMapping`,
        {
          method: "POST", // or "POST", depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            timeZoneId: user.timeZoneId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save timezone.");
      }

      setMessage("Timezone updated successfully.");
    } catch (error: any) {
      console.error(error);
      setMessage("Error saving timezone.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit User Timezone
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-only fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              type="text"
              value={user?.userId}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={user?.userName ?? ""}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              type="text"
              value={new Date(user?.createdAt ?? new Date()).toLocaleString()}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Modified At
            </label>
            <input
              type="text"
              value={new Date(user?.modifiedAt ?? "").toLocaleString()}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Editable timezone field */}
          <div>
            <label
              htmlFor="timezone"
              className="block text-sm font-medium text-gray-700"
            >
              Timezone
            </label>
            <select
              id="timezone"
              value={user?.timeZoneId || ""}
              onChange={handleTimezoneChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
            >
              {timezones.map((tz: Timezone) => (
                <option key={tz.id} value={tz.id}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                {isLoading ? "Saving TimeZone..." : "Save TimeZone"}
              </span>
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};
