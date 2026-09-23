import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Users, Clock } from 'lucide-react';

export const SchedulePlannerTab = () => {
  const days = ['Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25', 'Sat 26', 'Sun 27'];

  const scheduleData = [
    { name: 'Dr. Sarah Jenkins', role: 'Faculty Lead', shifts: ['8 AM - 2 PM (Hall A)', '8 AM - 2 PM (Hall A)', 'OFF', '8 AM - 2 PM (Hall B)', '10 AM - 4 PM (Lab 1)', 'OFF', 'OFF'] },
    { name: 'Alex Chen', role: 'Assistant Professor', shifts: ['10 AM - 4 PM (Lab 2)', 'OFF', '8 AM - 2 PM (Hall A)', '8 AM - 2 PM (Hall A)', '8 AM - 2 PM (Hall A)', 'OFF', 'OFF'] },
    { name: 'Michael Vance', role: 'Lab Instructor', shifts: ['OFF', '1 PM - 7 PM (Lab 1)', '1 PM - 7 PM (Lab 1)', 'OFF', '1 PM - 7 PM (Lab 1)', '9 AM - 1 PM', 'OFF'] },
  ];

  return (
    <div className="min-h-full bg-[#F7F9FC] p-6 font-sans text-[#1F2933]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2933]">Workplace Schedule &amp; Roster</h1>
            <p className="text-sm text-[#486581]">Plan shifts, assign faculty schedules, and manage weekly coverage.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-gray-300 bg-white p-1">
              <button type="button" aria-label="Previous week" className="rounded p-1.5 text-[#486581] hover:bg-gray-100"><ChevronLeft className="h-4 w-4" /></button>
              <span className="px-3 text-xs font-semibold text-[#243B53]">Sep 21 – Sep 27, 2026</span>
              <button type="button" aria-label="Next week" className="rounded p-1.5 text-[#486581] hover:bg-gray-100"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <button type="button" className="flex items-center gap-2 rounded-lg bg-[#2F80ED] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#1E64C8]">
              <Plus className="h-4 w-4" /> Add Shift
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-[#486581]">
                <th className="w-56 border-r border-gray-200 p-4">Staff Member</th>
                {days.map((day) => <th key={day} className="border-r border-gray-200 p-3 text-center last:border-r-0">{day}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {scheduleData.map((staff) => (
                <tr key={staff.name} className="hover:bg-gray-50/50">
                  <td className="border-r border-gray-200 p-4 font-medium text-[#1F2933]">
                    <div>{staff.name}</div>
                    <div className="text-[11px] font-normal text-gray-400">{staff.role}</div>
                  </td>
                  {staff.shifts.map((shift, index) => (
                    <td key={`${staff.name}-${index}`} className="border-r border-gray-200 p-2 text-center align-middle last:border-r-0">
                      {shift === 'OFF' ? <span className="font-medium text-gray-300">OFF</span> : <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-2 text-[11px] font-medium leading-tight text-indigo-700">{shift}</div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
