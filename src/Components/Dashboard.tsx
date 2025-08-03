import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import LoadingSpinner from './LoadingSpinner.jsx';

// --- MOCK IMPLEMENTATIONS for Demonstration ---
// In a real application, these would be your actual implementations.

// Mock for useNavigate from react-router-dom
const useNavigate = () => {
  return (path: string) => console.log(`Navigating to: ${path}`);
};



// Mock Type for EmailModelSync
// This is based on the properties used in your provided code.
type EmailModelSync = {
  from: string;
  snippet: string;
  isMeetingInvite: boolean;
  hasConflict: boolean;
  receivedAt: string;
  messageId: string;
  title: string;
  calendarEvent: {
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
    attendees: string;
  };
  nonMeetingInviteResponse: {
    summary: string;
    responseSuggestedByLLM: string;
  };
  eventModel: {
    title: string;
    startDateTime: string;
    endDateTime: string;
    suggestedStartDateTime: string;
    suggestedEndDateTime: string;
    conflictingTitle: string;
    conflictingStartDateTime: string;
    conflictingEndDateTime: string;
    updateEvent: {
      eventId: string;
      attendees: any[]; // Assuming attendees is an array
    };
  };
};

// Mock Label Structure
type LabelStructure = {
  name: string;
  color: string;
  id: string;
};

// --- TYPESCRIPT INTERFACE FOR MODAL PROPS ---
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

// Mock Modal Component with corrected types
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};


// --- REVAMPED DASHBOARD COMPONENT ---
export const Dashboard = () =>  {

   <style>{`
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #6a11cb, #2575fc);
          border-radius: 10px;
          border: 2px solid #f0f0f0;
          transition: background 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #8e2de2, #4a00e0);
        }

        ::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>

  const auth = useAuth();
  const navigate = useNavigate();
  const [lastSyncDateTime, setLastSyncDateTime] = useState(new Date());
  const [EmailData, setEmailData] = useState<EmailModelSync[]>([]);

  //Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EmailModelSync | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [llmResponse, setLlmResponse] = useState('');

  //Label
  const [labels, setLabel] = useState<LabelStructure[]>([]);
  const [labelList, setLabelList] = useState<string[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const id_token = localStorage.getItem("id_token");
  const user_email = localStorage.getItem("user_email");

  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`https://calendarassistant-backend.onrender.com/Email/GetLastSyncDate?email=${user_email}`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${id_token}`,
        Access_token: `${access_token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLastSyncDateTime(response);
      })
      .catch((error) => {
        console.log(`Failed to load data: ${error}`);
      });
  }, []);

  // --- MOCK DATA for UI rendering without a backend ---
  // useEffect(() => {
  //   const mockEmailData: EmailModelSync[] = [
  //     { from: 'contact@example.com', snippet: 'Can we reschedule our meeting?', isMeetingInvite: true, hasConflict: true, receivedAt: new Date().toISOString(), messageId: '1', title: 'Reschedule Request', calendarEvent: {} as any, nonMeetingInviteResponse: {} as any, eventModel: { title: 'Project Sync', startDateTime: '2023-10-27T14:00:00Z', endDateTime: '2023-10-27T15:00:00Z', suggestedStartDateTime: '2023-10-28T14:00:00Z', suggestedEndDateTime: '2023-10-28T15:00:00Z', conflictingTitle: 'Marketing All-Hands', conflictingStartDateTime: '2023-10-28T14:00:00Z', conflictingEndDateTime: '2023-10-28T14:30:00Z', updateEvent: { eventId: 'evt1', attendees: [{ email: 'test@example.com' }] } } },
  //     { from: 'newsletter@example.com', snippet: 'Weekly updates and news...', isMeetingInvite: false, hasConflict: false, receivedAt: new Date().toISOString(), messageId: '2', title: 'Newsletter', calendarEvent: {} as any, nonMeetingInviteResponse: { summary: 'This is a newsletter.', responseSuggestedByLLM: 'No action needed.' }, eventModel: {} as any },
  //     { from: 'boss@example.com', snippet: 'Project Alpha kickoff meeting invite', isMeetingInvite: true, hasConflict: false, receivedAt: new Date().toISOString(), messageId: '3', title: 'Project Alpha Kickoff', calendarEvent: { summary: 'Kickoff', description: 'Initial meeting for Project Alpha.', startTime: '2023-10-29T10:00:00Z', endTime: '2023-10-29T11:00:00Z', attendees: 'you@example.com, boss@example.com' }, nonMeetingInviteResponse: {} as any, eventModel: {} as any },
  //   ];
  //   const mockLabels: LabelStructure[] = [
  //       {id: '1', name: 'IMPORTANT', color: 'red'},
  //       {id: '2', name: 'PROJECT_ALPHA', color: 'blue'},
  //       {id: '3', name: 'MARKETING', color: 'green'},
  //   ];
  //   setEmailData(mockEmailData);
  //   setLabel(mockLabels);
  // }, []);

  useEffect(() => {
  let didRun = false;

  if (!didRun) {
    setLoading(true);
    fetch("https://calendarassistant-backend.onrender.com/Email/GetMailPolling", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${id_token}`,
        Access_token: `${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.status == 401)
        {
          setLoading(false);
          auth.logout();
          navigate("/login");
        }
        else{
          setLoading(false);
          setEmailData(response);
        }
      })
      .catch((error) => {
        console.log(`Failed to load data: ${error}`);
        setLoading(false);
      });

    didRun = true;
  }
}, []);

useEffect(() => {
    fetch("https://calendarassistant-backend.onrender.com/Email/GetLabels", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
       Authorization: `Bearer ${id_token}`,
        Access_token: `${access_token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLabel(response);
      })
      .catch((error) => {
        console.log(`Failed to load data: ${error}`);
      });
  }, []);

  //Meeting invite identified by LLM
  const postData = async () => {
    console.log(selectedRow);
    setIsLoading(true);
    const payload = {
      from: selectedRow?.from,
      snippet: selectedRow?.snippet,
      summary: selectedRow?.calendarEvent.summary,
      description: selectedRow?.calendarEvent.description,
      startTime: selectedRow?.calendarEvent.startTime,
      endTime: selectedRow?.calendarEvent.endTime,
      attendees: selectedRow?.calendarEvent.attendees,
    };

    try {
      const response = await fetch("https://calendarassistant-backend.onrender.com/Calendar/Schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id_token}`,
        Access_token: `${access_token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Success:", result);
      setModalOpen(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setIsLoading(false);
  };

  //Non Meeting invite identified by LLM
  const sendEmailNonMeetingInvite = async () => {
    setIsLoading(true);
    const payload = {
      to: selectedRow?.from,
      message: llmResponse,
      messageId: selectedRow?.messageId,
    };

    try {
      const response = await fetch("https://calendarassistant-backend.onrender.com/Email/SendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${id_token}`,
        Access_token:`${access_token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      alert("success");
      console.log("Success:", result);
      setModalOpen(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setIsLoading(false);
  };

//Meeting invite identified by LLM
  const scheduleForConlict = async () => {
    
    setIsLoading(true);
    const payload = {
      eventId: selectedRow?.eventModel.updateEvent.eventId,
      eventObj: {
        description: selectedRow?.eventModel.title,
        summary: selectedRow?.eventModel.title,
        start: {
          dateTime: selectedRow?.eventModel.suggestedStartDateTime,
          timeZone: "America/New_York",
        },
        end: {
          dateTime: selectedRow?.eventModel.suggestedEndDateTime,
          timeZone: "America/New_York",
        },
        //attendees: [{ email: selectedRow?.eventModel.updateEvent.attendees }],
      },
      attendees:selectedRow?.eventModel.updateEvent.attendees
    };

    console.log("basit");
    console.log(payload);
    console.log(id_token);
    try {
      const response = await fetch(
        "https://calendarassistant-backend.onrender.com/Calendar/Reschedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id_token}`,
        Access_token:`${access_token}`
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("Success:", result);
      setModalOpen(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setIsLoading(false);
  };

   const getEmail = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();

      labelList.forEach((label) => {
        params.append("LabelsToExclude", label);
      });

      console.log(
        `https://calendarassistant-backend.onrender.com/Email/GetMailPolling?${params.toString()}`
      );
      //const queryString = new URLSearchParams(mailFilterModel).toString();
      const url = `https://calendarassistant-backend.onrender.com/Email/GetMailPolling?${params.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${id_token}`,
        Access_token: `${access_token}`
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log(result);
      //here code
      setEmailData(result);
      console.log(result);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
    setIsLoading(false);
  };

 const handleViewClick = (row: any) => {
  alert("basit");
    setSelectedRow(row);
    setLlmResponse(row?.nonMeetingInviteResponse?.responseSuggestedByLLM || '')
    setModalOpen(true);
  };

const handleLabelChange = (event: any) => {
    const selected: any = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setLabelList(selected);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getEmail();
  };
  
  // --- UI STYLING ---
  useEffect(() => {
    document.body.classList.add("bg-gray-100", "text-gray-800");
    const tailwind = document.createElement('script');
    tailwind.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwind);
    
    return () => {
      document.body.classList.remove("bg-gray-100", "text-gray-800");
      document.head.removeChild(tailwind);
    }
  }, []);


   if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="flex h-screen">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Email & Calendar Sync</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Inbox
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Calendar
            </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
            <button onClick={() => auth.logout()} className="w-full flex items-center justify-center px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-700 rounded-lg">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-3xl font-bold text-gray-800">Welcome {user_email}</h3>
                <p className="text-gray-500 mt-1" style={{"textAlign":"left"}}>Last updated: {new Date(lastSyncDateTime).toLocaleString()}</p>
            </div>
            <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="flex items-center bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-sm transition"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM14 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"></path></svg>
                {isPanelOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Collapsible Form Panel */}
          {isPanelOpen && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold text-gray-800">Exclude Labels</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">Hold Ctrl/Cmd to select multiple labels.</p>
                <div className="flex items-start space-x-4">
                    <select id="label" name="label" multiple onChange={handleLabelChange} className="flex-grow h-40 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {labels.map((label) => <option key={label.id} value={label.id}>{label.name.toUpperCase()}</option>)}
                    </select>
                    <button type="submit" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow transition h-10">
                        {isLoading ? 'Applying...' : 'Apply Filters'}
                    </button>
                </div>
              </form>
            </div>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Snippet</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Received At</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {EmailData.map((email, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{email.from}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">{email.snippet}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {email.isMeetingInvite ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Meeting</span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Info</span>}
                        {email.hasConflict && <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Conflict</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{new Date(email.receivedAt).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleViewClick(email)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedRow && selectedRow.isMeetingInvite && !selectedRow.hasConflict ? "Meeting Invite" : !selectedRow?.isMeetingInvite ? "Non-Meeting Invite" : "Meeting Invite with Conflict"}
      >
        {selectedRow && selectedRow.isMeetingInvite && !selectedRow.hasConflict ? (
         <div className="p-4 sm:p-6">
           <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
             <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 p-6">
               <div><dt className="text-sm font-semibold text-gray-700">From</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.from}</dd></div>
               <div><dt className="text-sm font-semibold text-gray-700">Snippet</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.snippet}</dd></div>
               <div><dt className="text-sm font-semibold text-gray-700">Summary</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.calendarEvent.summary}</dd></div>
               <div><dt className="text-sm font-semibold text-gray-700">Description</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.calendarEvent.description}</dd></div>
               <div><dt className="text-sm font-semibold text-gray-700">Start</dt><dd className="mt-1 text-sm text-gray-900">{new Date(selectedRow.calendarEvent.startTime).toLocaleString()}</dd></div>
               <div><dt className="text-sm font-semibold text-gray-700">End</dt><dd className="mt-1 text-sm text-gray-900">{new Date(selectedRow.calendarEvent.endTime).toLocaleString()}</dd></div>
               <div className="sm:col-span-2"><dt className="text-sm font-semibold text-gray-700">Attendees</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.calendarEvent.attendees}</dd></div>
             </dl>
           </div>
           <div className="mt-6 flex flex-col sm:flex-row sm:justify-end">
             <button onClick={postData} className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
               {isLoading ? "Setting Event..." : "Set Event"}
             </button>
           </div>
         </div>
        ) : !selectedRow?.isMeetingInvite ? (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div><dt className="text-sm font-semibold text-gray-700">From</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow?.from}</dd></div>
                <div><dt className="text-sm font-semibold text-gray-700">Snippet</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow?.snippet}</dd></div>
                <div className="sm:col-span-2"><dt className="text-sm font-semibold text-gray-700">Summary</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow?.nonMeetingInviteResponse.summary}</dd></div>
                <div className="sm:col-span-2">
                  <label htmlFor="llm-response" className="text-sm font-semibold text-gray-700 mb-1">Response Suggested by LLM</label>
                  <textarea id="llm-response" value={llmResponse} onChange={(e) => setLlmResponse(e.target.value)} rows={5} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </dl>
            </div>
            <div className="flex justify-end">
              <button onClick={sendEmailNonMeetingInvite} className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition">
                {isLoading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded shadow-sm">
              <strong className="font-semibold">⚠️ Conflict:</strong> {selectedRow.eventModel.conflictingTitle} ({new Date(selectedRow.eventModel.conflictingStartDateTime).toLocaleString()} – {new Date(selectedRow.eventModel.conflictingEndDateTime).toLocaleString()})
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-40"><dt className="text-sm font-semibold text-gray-500">From</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.from}</dd></div>
                <div><dt className="text-sm font-semibold text-gray-700">Title</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.title}</dd></div>
                <div className="sm:col-span-2"><dt className="text-sm font-semibold text-gray-700">Attendees</dt><dd className="mt-1 text-sm text-gray-900 break-words">{selectedRow.eventModel.updateEvent.attendees.map(a => a.email).join(', ')}</dd></div>
                <div><dt className="text-sm font-semibold text-gray-700">Original Start</dt><dd className="mt-1 text-sm text-gray-900">{new Date(selectedRow.eventModel.startDateTime).toLocaleString()}</dd></div>
                <div><dt className="text-sm font-semibold text-gray-700">Original End</dt><dd className="mt-1 text-sm text-gray-900">{new Date(selectedRow.eventModel.endDateTime).toLocaleString()}</dd></div>
                <div className="text-green-600"><dt className="text-sm font-semibold">Suggested Start</dt><dd className="mt-1 font-bold">{new Date(selectedRow.eventModel.suggestedStartDateTime).toLocaleString()}</dd></div>
                <div className="text-green-600"><dt className="text-sm font-semibold">Suggested End</dt><dd className="mt-1 font-bold">{new Date(selectedRow.eventModel.suggestedEndDateTime).toLocaleString()}</dd></div>
              </dl>
            </div>
            <div className="flex justify-end">
              <button onClick={scheduleForConlict} className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition">
                {isLoading ? "Rescheduling..." : "Reschedule to Suggested Time"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
