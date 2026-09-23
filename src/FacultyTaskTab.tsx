import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, FileText, Send } from 'lucide-react';

type FacultyTask = {
  id: number;
  title: string;
  dept: string;
  due: string;
  file: string;
  completed: boolean;
  priority: 'High' | 'Normal';
};

export const FacultyTaskTab = () => {
  const [tasks, setTasks] = useState<FacultyTask[]>([
    { id: 1, title: 'Review Syllabus Update for Advanced AI Course', dept: 'Computer Science', due: 'Tomorrow, 08:30 AM', file: 'AI_Syllabus_2026.pdf', completed: false, priority: 'High' },
    { id: 2, title: 'Read Lab Safety Guidelines prior to Chemistry Session', dept: 'Sciences', due: 'Tomorrow, 09:00 AM', file: 'Lab_Safety_Protocol.pdf', completed: true, priority: 'Normal' },
  ]);

  const toggleComplete = (id: number) => {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="min-h-full bg-[#F7F9FC] p-6 font-sans text-[#1F2933]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F2933]">Task Hub</h1>
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800"><Clock className="h-3 w-3" /> Prior-Day Briefing</span>
            </div>
            <p className="text-sm text-[#486581]">Access required study materials and preparation tasks published by HR/Dean.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-base font-semibold text-[#1F2933]">Tasks for Tomorrow&apos;s Sessions</h2>
            {tasks.map((task) => (
              <div key={task.id} className={`rounded-xl border p-5 transition-all ${task.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200 bg-white shadow-sm'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{task.priority}</span>
                      <span className="text-xs text-gray-400">{task.dept}</span>
                    </div>
                    <h3 className={`text-sm font-semibold ${task.completed ? 'text-gray-400 line-through' : 'text-[#1F2933]'}`}>{task.title}</h3>
                  </div>
                  <button type="button" onClick={() => toggleComplete(task.id)} className={`flex items-center gap-1.5 rounded-lg border p-2 text-xs font-medium ${task.completed ? 'border-green-200 bg-green-50 text-green-700' : 'bg-white text-[#486581] hover:bg-gray-50'}`}>
                    <CheckCircle className="h-4 w-4" /> {task.completed ? 'Prepared' : 'Mark Ready'}
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1 font-medium text-[#2F80ED]"><FileText className="h-3.5 w-3.5" /> {task.file}</div>
                  <div>Due: <span className="font-semibold text-[#486581]">{task.due}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3"><BookOpen className="h-5 w-5 text-[#2F80ED]" /><h2 className="text-base font-semibold text-[#1F2933]">Publish Prior-Day Task</h2></div>
            <form className="space-y-3 text-xs" onSubmit={(event) => event.preventDefault()}>
              <div><label className="mb-1 block font-medium text-[#486581]">Task Title / Topic</label><input type="text" placeholder="e.g., Read Chapter 4 Curriculum Notes" className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]" /></div>
              <div><label className="mb-1 block font-medium text-[#486581]">Target Department</label><select className="w-full rounded-lg border border-gray-300 bg-white p-2.5 outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]"><option>All Faculty</option><option>Computer Science</option><option>Sciences</option></select></div>
              <div><label className="mb-1 block font-medium text-[#486581]">Attach Study Material (PDF)</label><div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-200 p-4 text-center hover:border-[#2F80ED]"><span className="text-gray-400">Click to upload document</span></div></div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2F80ED] py-2.5 font-medium text-white shadow-sm hover:bg-[#1E64C8]"><Send className="h-3.5 w-3.5" /> Broadcast to Faculty</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
