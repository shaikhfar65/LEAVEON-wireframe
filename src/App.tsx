import { useState } from 'react';
import { BookOpen, CalendarDays, CalendarRange, ClipboardCheck, LayoutDashboard, LogOut, Settings, Users, WalletCards } from 'lucide-react';
import { AttendanceTab, LeaveTab } from './AttendanceLeaveTabs';
import { FacultyTaskTab } from './FacultyTaskTab';
import { SchedulePlannerTab } from './SchedulePlannerTab';

// ── shared data ────────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { label: 'My Leaves', key: 'leaves', icon: CalendarDays },
  { label: 'Team Requests', key: 'requests', icon: Users },
  { label: 'Attendance', key: 'attendance', icon: ClipboardCheck },
  { label: 'Schedule', key: 'schedule', icon: CalendarRange },
  { label: 'Task', key: 'tasks', icon: BookOpen },
  { label: 'Payroll', key: 'payroll', icon: WalletCards },
  { label: 'Settings', key: 'settings', icon: Settings },
];

const summaryCards = [
  { label: 'Annual Leave Remaining', value: '14 Days', sub: 'Out of 20 total' },
  { label: 'Sick Leave', value: '5 Days', sub: 'Out of 7 total' },
  { label: 'Pending Requests', value: '2 Pending', sub: 'Awaiting Manager Approval' },
];

// ── shared UI ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onNavigate }: { active: string; onNavigate: (k: string) => void }) {
  return (
    <aside style={{ width: 240, height: '100%', backgroundColor: '#FFFFFF', borderRight: '1px solid #E0E0E0', flexShrink: 0, padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
        <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect width="30" height="30" rx="9" fill="#243B53" />
          <path d="M9 8.5V21.5H20.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 15.5L18 18L22 12.5" stroke="#2F80ED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#243B53', letterSpacing: '0.02em' }}>LEAVEON</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map((item) => {
          const isActive = item.key === active;
          const Icon = item.icon;
          return (
            <div key={item.key} onClick={() => onNavigate(item.key)}
              style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: isActive ? 700 : 400, color: isActive ? '#243B53' : '#486581', cursor: 'pointer', padding: '8px 12px', borderRadius: 6, backgroundColor: isActive ? '#EAF3FE' : 'transparent', borderLeft: isActive ? '3px solid #2F80ED' : '3px solid transparent', marginLeft: -12, width: 'calc(100% + 12px)' }}>
              <Icon aria-hidden="true" size={17} strokeWidth={isActive ? 2.4 : 2} style={{ marginRight: 10, flexShrink: 0 }} />
              {item.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function AppHeader({ name }: { name: string }) {
  return (
    <header style={{ height: 70, backgroundColor: '#FFFFFF', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
      <span style={{ fontSize: 20, fontWeight: 700, color: '#111111' }}>Employee Dashboard</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, color: '#333333' }}>{name}</span>
        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#D0D0D0', flexShrink: 0 }} />
      </div>
    </header>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function Dashboard({ onNewRequest, onReviewRequest }: { onNewRequest: () => void; onReviewRequest: () => void }) {
  return (
    <div style={{ flex: 1, padding: '32px', overflowY: 'auto' as const }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-start' }}>
            <button onClick={onReviewRequest} style={{ height: 44, padding: '0 20px', backgroundColor: '#FFFFFF', borderRadius: 6, border: '1.5px solid #222222', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#222222' }}>
              Review Request
            </button>
            <button onClick={onNewRequest} style={{ height: 44, padding: '0 20px', backgroundColor: '#222222', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
              Apply For Leave
            </button>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {summaryCards.map((card) => (
              <div key={card.label} style={{ width: 330, height: 120, backgroundColor: '#FFFFFF', borderRadius: 8, border: '1px solid #E0E0E0', padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
                <span style={{ fontSize: 14, color: '#666666' }}>{card.label}</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: '#111111', lineHeight: 1 }}>{card.value}</span>
                <span style={{ fontSize: 12, color: '#888888' }}>{card.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 8, border: '1px solid #E0E0E0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Recent Leave Requests</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 240, height: 36, backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                <span style={{ fontSize: 13, color: '#999999' }}>Search requests...</span>
              </div>
              <div style={{ width: 120, height: 36, backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: '#333333' }}>All Types ▾</span>
              </div>
            </div>
          </div>
          <div style={{ height: 1, backgroundColor: '#E0E0E0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '12px 24px', gap: 16 }}>
            {['TYPE', 'DATES', 'TOTAL DAYS', 'STATUS'].map((col) => (
              <span key={col} style={{ fontSize: 12, fontWeight: 700, color: '#888888', letterSpacing: '0.06em' }}>{col}</span>
            ))}
          </div>
          <div style={{ height: 1, backgroundColor: '#E0E0E0' }} />
          {[
            { type: 'Annual Leave', dates: 'Oct 12 – Oct 15, 2026', days: '4 Days', status: 'Approved', statusBg: '#EAEAEA', statusColor: '#333333' },
            { type: 'Sick Leave', dates: 'Nov 02 – Nov 03, 2026', days: '2 Days', status: 'Pending', statusBg: '#FEF3C7', statusColor: '#92400E' },
          ].map((row, i, arr) => (
            <div key={i}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '16px 24px', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#111111' }}>{row.type}</span>
                <span style={{ fontSize: 14, color: '#333333' }}>{row.dates}</span>
                <span style={{ fontSize: 14, color: '#333333' }}>{row.days}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 20, backgroundColor: row.statusBg, fontSize: 13, color: row.statusColor, fontWeight: 500 }}>{row.status}</span>
              </div>
              {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '0 24px' }} />}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #EFEFEF' }}>
            <div style={{ backgroundColor: '#F8F9FC', borderRadius: 20, padding: '4px 10px' }}>
              <span style={{ fontSize: 12, color: '#888888' }}>Showing 1–2 of 2 entries</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['‹', '›'].map((arrow) => (
                <div key={arrow} style={{ width: 32, height: 32, borderRadius: 4, border: '1.5px solid #E0E0E0', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#666666', cursor: 'pointer' }}>{arrow}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: 280, flexShrink: 0, backgroundColor: '#FFFFFF', borderRadius: 8, border: '1px solid #E0E0E0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 20px 16px' }}><span style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Upcoming Holidays</span></div>
          <div style={{ height: 1, backgroundColor: '#E0E0E0' }} />
          {[{ name: 'Diwali / Festival', date: 'Nov 08, 2026' }, { name: 'Christmas Day', date: 'Dec 25, 2026' }].map((h, i, arr) => (
            <div key={h.name}>
              <div style={{ padding: '14px 20px' }}>
                <div style={{ fontSize: 13, color: '#333333', fontWeight: 500, marginBottom: 3 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: '#888888' }}>{h.date}</div>
              </div>
              {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '0 20px' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Management Request Form ────────────────────────────────────────────────────
function ManagementRequestForm({ onBack }: { onBack: () => void }) {
  const [requestType, setRequestType] = useState('New Role');
  const [dragOver, setDragOver] = useState(false);
  const inputStyle: React.CSSProperties = { width: '100%', height: 40, border: '1px solid #E5E7EB', borderRadius: 8, padding: '0 12px', fontSize: 14, color: '#111111', backgroundColor: '#FFFFFF', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' };
  const sectionStyle: React.CSSProperties = { backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '28px 32px', marginBottom: 20 };
  const selectStyle: React.CSSProperties = { ...inputStyle, appearance: 'none' as const };
  return (
    <div style={{ flex: 1, overflowY: 'auto' as const, backgroundColor: '#F9FAFB' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '16px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#6B7280', padding: 0 }}>← Back to Dashboard</button>
          <span style={{ fontSize: 13, color: '#D1D5DB' }}>/</span>
          <span style={{ fontSize: 13, color: '#374151' }}>Management Requests</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111111', margin: '0 0 4px' }}>Create New Management Team Request</h1>
        <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Complete the form below to submit a new headcount or role request for review and approval.</p>
      </div>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 40px' }}>
        <div style={sectionStyle}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 20 }}>① Request Overview</div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Request Title</label>
            <input style={inputStyle} placeholder="E.g., Senior Tech Lead Hire - Mobile Team" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Department / Division</label><select style={selectStyle}><option value="">Select department...</option><option>Engineering</option><option>Product</option><option>Sales</option></select></div>
            <div><label style={labelStyle}>Target Team</label><select style={selectStyle}><option value="">Select team...</option><option>Mobile Team</option><option>Platform Team</option></select></div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Request Type</label>
            <div style={{ display: 'flex', gap: 24 }}>
              {['New Role', 'Replacement', 'Temporary'].map((t) => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#374151', cursor: 'pointer' }}>
                  <input type="radio" name="rt" value={t} checked={requestType === t} onChange={() => setRequestType(t)} style={{ accentColor: '#222222', width: 16, height: 16 }} />{t}
                </label>
              ))}
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <label style={labelStyle}>Urgency Level</label>
            <select style={selectStyle}><option value="">Select urgency...</option><option>Low</option><option>Medium</option><option>High</option></select>
          </div>
        </div>
        <div style={sectionStyle}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 20 }}>② Position Details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Proposed Role Title</label><input style={inputStyle} placeholder="E.g., Senior Software Engineer" /></div>
            <div><label style={labelStyle}>Reporting Manager</label><input style={inputStyle} placeholder="Manager name or ID" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Estimated Start Date</label><input type="date" style={inputStyle} /></div>
            <div><label style={labelStyle}>Proposed Budget Range / Level</label><select style={selectStyle}><option value="">Select level...</option><option>IC3 — ₹80k–₹100k</option><option>IC4 — ₹100k–₹130k</option><option>IC5 — ₹130k–₹170k</option></select></div>
          </div>
          <div>
            <label style={labelStyle}>Business Justification &amp; Impact</label>
            <textarea style={{ ...inputStyle, height: 120, padding: '10px 12px', resize: 'vertical', lineHeight: 1.6 } as React.CSSProperties} placeholder="Enter reason for addition, expected deliverables, team growth metrics..." />
          </div>
        </div>
        <div style={sectionStyle}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 20 }}>③ Attachments &amp; Approvals</div>
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Attach Business Case / Job Spec</label>
            <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); }}
              style={{ border: `2px dashed ${dragOver ? '#222222' : '#D1D5DB'}`, borderRadius: 10, backgroundColor: dragOver ? '#F4F5F7' : '#FAFAFA', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ fontSize: 28, color: '#9CA3AF' }}>⬆</div>
              <div style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>Drag and drop files here, or</div>
              <button style={{ fontSize: 13, fontWeight: 600, color: '#222222', background: 'none', border: '1.5px solid #222222', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Browse Files</button>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>PDF, DOCX, XLSX — max 10MB</div>
            </div>
          </div>
          <div>
            <label style={{ ...labelStyle, marginBottom: 16 }}>Approval Workflow</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[{ num: 1, label: 'Direct Manager' }, { num: 2, label: 'HR Business Partner' }, { num: 3, label: 'Executive Sponsor' }].map((step, i, arr) => (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#222222', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{step.num}</div>
                    <span style={{ fontSize: 12, color: '#374151', fontWeight: 500, whiteSpace: 'nowrap' }}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: '#E5E7EB', margin: '0 12px', marginBottom: 22 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 40 }}>
          <button onClick={onBack} style={{ height: 42, padding: '0 24px', borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
          <button style={{ height: 42, padding: '0 24px', borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>Save Draft</button>
          <button style={{ height: 42, padding: '0 28px', borderRadius: 8, border: 'none', backgroundColor: '#222222', fontSize: 14, color: '#FFFFFF', cursor: 'pointer', fontWeight: 700 }}>Submit Request</button>
        </div>
      </div>
    </div>
  );
}

// ── HR Review Panel ────────────────────────────────────────────────────────────
function HRReviewPanel({ onBack }: { onBack: () => void }) {
  const [comment, setComment] = useState('');

  const cardStyle: React.CSSProperties = { backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '24px 28px', marginBottom: 20 };
  const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 4, display: 'block' };
  const valueStyle: React.CSSProperties = { fontSize: 14, color: '#111111', fontWeight: 500 };

  const auditLog = [
    { icon: '✅', label: 'Finance Approved', actor: 'M. Vance', time: 'Sep 10, 2026 · 11:42 AM', color: '#16A34A' },
    { icon: '✅', label: 'Dept Head Approved', actor: 'J. Doe', time: 'Sep 9, 2026 · 3:15 PM', color: '#16A34A' },
    { icon: '📋', label: 'Request Submitted', actor: 'Alex Chen', time: 'Sep 8, 2026 · 9:00 AM', color: '#6B7280' },
  ];

  const approvalSteps = [
    { num: 1, label: 'Dept Head Approval', sub: 'Approved — J. Doe', done: true },
    { num: 2, label: 'Finance Approval', sub: 'Approved — M. Vance', done: true },
    { num: 3, label: 'HR / Recruiting Approval', sub: 'Pending — Sarah Jenkins', done: false },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto' as const, backgroundColor: '#F9FAFB' }}>
      {/* Breadcrumb + status bar */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '14px 40px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#6B7280', padding: 0 }}>← Dashboard</button>
          <span style={{ fontSize: 13, color: '#D1D5DB' }}>/</span>
          <span style={{ fontSize: 13, color: '#6B7280' }}>Requests</span>
          <span style={{ fontSize: 13, color: '#D1D5DB' }}>/</span>
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>#REQ-2026-894</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111111', margin: '0 0 10px' }}>
              REQUEST #REQ-2026-894: Engineering Manager — DevOps
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>
                🟡 PENDING APPROVAL
              </span>
              <span style={{ fontSize: 13, color: '#6B7280' }}>📅 Submitted: Sep 8, 2026</span>
              <span style={{ fontSize: 13, color: '#6B7280' }}>👤 Requester: <strong style={{ color: '#374151' }}>Alex Chen</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: 24, padding: '28px 40px', alignItems: 'flex-start' }}>

        {/* Left column — 2/3 */}
        <div style={{ flex: 2, minWidth: 0 }}>
          {/* Request Details card */}
          <div style={cardStyle}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 20 }}>Request Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 24 }}>
              {[
                { label: 'Department', value: 'Engineering' },
                { label: 'Budget Range', value: 'Band 7: ₹140k – ₹170k' },
                { label: 'Target Hire Date', value: 'Nov 1, 2026' },
              ].map((item) => (
                <div key={item.label}>
                  <span style={labelStyle}>{item.label}</span>
                  <span style={valueStyle}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 20 }} />
            <div style={{ marginBottom: 24 }}>
              <span style={{ ...labelStyle, marginBottom: 10 }}>Business Justification</span>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                The DevOps team is currently operating at 140% capacity with 3 critical platform migrations scheduled for Q4 2026. An Engineering Manager is required to lead the team, manage stakeholder communication, unblock delivery bottlenecks, and drive the reliability roadmap. This hire is essential to maintaining our 99.9% uptime SLA commitments.
              </p>
            </div>
            <div style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 20 }} />
            <div>
              <span style={{ ...labelStyle, marginBottom: 12 }}>Attachments</span>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
                {['📄 DevOps_Manager_JD.pdf', '📊 Team_Structure_2026.xlsx'].map((file) => (
                  <div key={file} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
                    {file}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit log */}
          <div style={cardStyle}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 20 }}>Activity &amp; Audit Log</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {auditLog.map((entry, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < auditLog.length - 1 ? 20 : 0, position: 'relative' as const }}>
                  {/* timeline line */}
                  {i < auditLog.length - 1 && (
                    <div style={{ position: 'absolute' as const, left: 15, top: 28, width: 2, height: 'calc(100% - 8px)', backgroundColor: '#F3F4F6' }} />
                  )}
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#F9FAFB', border: '1.5px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, zIndex: 1 }}>
                    {entry.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111111', marginBottom: 2 }}>{entry.label}</div>
                    <div style={{ fontSize: 13, color: '#6B7280' }}>by <strong style={{ color: '#374151' }}>{entry.actor}</strong> · {entry.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — 1/3 */}
        <div style={{ flex: 1, minWidth: 280, position: 'sticky' as const, top: 28 }}>
          {/* Approval tracker */}
          <div style={{ ...cardStyle, marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 6 }}>Approval Progress</div>
            {/* Progress bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>2 of 3 Completed</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#16A34A' }}>67%</span>
              </div>
              <div style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 99 }}>
                <div style={{ height: '100%', width: '67%', backgroundColor: '#16A34A', borderRadius: 99 }} />
              </div>
            </div>
            {/* Step list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {approvalSteps.map((step, i) => (
                <div key={step.num} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: step.done ? '#DCFCE7' : '#FEF3C7', border: `2px solid ${step.done ? '#16A34A' : '#F59E0B'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, marginTop: 1 }}>
                    {step.done ? '✓' : '⏳'}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111111' }}>{step.label}</div>
                    <div style={{ fontSize: 12, color: step.done ? '#16A34A' : '#B45309', fontWeight: 500, marginTop: 2 }}>{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment box */}
          <div style={{ ...cardStyle, marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>Add Review Notes / Feedback</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Enter any notes, clarification requests, or approval rationale..."
              style={{ width: '100%', height: 110, border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#111111', resize: 'none' as const, outline: 'none', boxSizing: 'border-box' as const, lineHeight: 1.6 }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button style={{ height: 44, borderRadius: 8, border: '1.5px solid #EF4444', backgroundColor: '#FFFFFF', fontSize: 14, fontWeight: 600, color: '#EF4444', cursor: 'pointer' }}>
              Reject
            </button>
            <button style={{ height: 44, borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
              Request Info
            </button>
            <button style={{ height: 44, borderRadius: 8, border: 'none', backgroundColor: '#16A34A', fontSize: 14, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>
              Approve Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Payroll Page ───────────────────────────────────────────────────────────────
const payslipRows = [
  { period: 'Aug 1 – Aug 31, 2026', payDate: 'Sep 1, 2026', gross: '₹10,500.00', deductions: '₹2,050.00', net: '₹8,450.00' },
  { period: 'Jul 1 – Jul 31, 2026', payDate: 'Aug 1, 2026', gross: '₹10,500.00', deductions: '₹2,050.00', net: '₹8,450.00' },
  { period: 'Jun 1 – Jun 30, 2026', payDate: 'Jul 1, 2026', gross: '₹10,500.00', deductions: '₹2,050.00', net: '₹8,450.00' },
  { period: 'May 1 – May 31, 2026', payDate: 'Jun 1, 2026', gross: '₹10,500.00', deductions: '₹2,050.00', net: '₹8,450.00' },
];

const deductionItems = [
  { label: 'Federal Tax', amount: '₹1,150.00', pct: 55, color: '#EF4444' },
  { label: 'State Tax', amount: '₹420.00', pct: 20, color: '#F59E0B' },
  { label: 'Health Insurance', amount: '₹280.00', pct: 13, color: '#3B82F6' },
  { label: '401(k)', amount: '₹200.00', pct: 10, color: '#8B5CF6' },
];

const adminEmployees = [
  { name: 'Sarah Jenkins', role: 'Sr. Frontend Engineer', salary: '₹120,000 / yr', freq: 'Monthly', bonus: '+₹450.00', deductions: '-₹1,200.00', net: '₹8,800.00', status: 'Ready', statusBg: '#DCFCE7', statusColor: '#16A34A' },
  { name: 'Michael Vance', role: 'DevOps Lead', salary: '₹135,000 / yr', freq: 'Monthly', bonus: '+₹0.00', deductions: '-₹1,350.00', net: '₹9,900.00', status: 'Ready', statusBg: '#DCFCE7', statusColor: '#16A34A' },
  { name: 'Alex Chen', role: 'Product Manager', salary: '₹115,000 / yr', freq: 'Monthly', bonus: '+₹750.00', deductions: '-₹1,100.00', net: '₹9,233.00', status: 'Pending Approval', statusBg: '#FEF3C7', statusColor: '#92400E' },
  { name: 'Priya Patel', role: 'Data Analyst', salary: '₹98,000 / yr', freq: 'Monthly', bonus: '+₹200.00', deductions: '-₹950.00', net: '₹7,417.00', status: 'Ready', statusBg: '#DCFCE7', statusColor: '#16A34A' },
];

function PayrollPage() {
  const [view, setView] = useState<'employee' | 'admin'>('employee');
  const [payrollStep, setPayrollStep] = useState(1);

  const cardStyle: React.CSSProperties = { backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '22px 24px' };
  const colHdr = (label: string) => <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.07em' }}>{label}</span>;

  return (
    <div style={{ flex: 1, overflowY: 'auto' as const, backgroundColor: '#F9FAFB', padding: '28px 36px' }}>
      {/* Page header + view toggle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111111', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
            {view === 'employee' ? 'Payroll & Compensation' : 'Company Payroll & Compensation'}
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
            {view === 'employee'
              ? 'View your earnings, download payslips, manage tax details, and direct deposit settings.'
              : 'Run payroll, manage employee salaries, and ensure tax compliance.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 0, border: '1.5px solid #E5E7EB', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
          {(['employee', 'admin'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ height: 36, padding: '0 18px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, backgroundColor: view === v ? '#222222' : '#FFFFFF', color: view === v ? '#FFFFFF' : '#6B7280', transition: 'all 0.15s' }}>
              {v === 'employee' ? '👤 My Payroll' : '🏢 Admin View'}
            </button>
          ))}
        </div>
      </div>

      {/* ── EMPLOYEE VIEW ── */}
      {view === 'employee' && (
        <>
          {/* Top 3 stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 20, marginBottom: 28 }}>
            {/* Net Pay card */}
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>Net Pay (Latest)</span>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#111111', letterSpacing: '-0.02em', fontFamily: 'monospace' }}>₹8,450.00</div>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>Paid Sep 1, 2026</span>
              <button style={{ marginTop: 6, height: 38, borderRadius: 8, border: 'none', backgroundColor: '#222222', fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>
                📄 Download Latest Payslip
              </button>
            </div>
            {[
              { label: 'YTD Gross Earnings', value: '₹88,200.00', sub: 'Jan – Aug 2026' },
              { label: 'YTD Tax Withheld', value: '₹18,520.00', sub: 'Federal + State' },
            ].map(c => (
              <div key={c.label} style={{ ...cardStyle }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 10 }}>{c.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#111111', letterSpacing: '-0.01em', fontFamily: 'monospace' }}>{c.value}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Two-column body */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

            {/* Left — payslip table + deductions */}
            <div style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Payslip table */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111111' }}>Salary History & Payslips</span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <select style={{ height: 34, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }}>
                      <option>2026</option><option>2025</option>
                    </select>
                    <input placeholder="Search payslips..." style={{ height: 34, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, outline: 'none', width: 160 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr 0.8fr 0.9fr', padding: '10px 24px', gap: 12, backgroundColor: '#FAFAFA', borderBottom: '1px solid #F3F4F6' }}>
                  {['PAY PERIOD', 'PAY DATE', 'GROSS PAY', 'DEDUCTIONS', 'NET PAY', 'STATUS', 'ACTION'].map(colHdr)}
                </div>
                {payslipRows.map((row, i, arr) => (
                  <div key={i}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr 0.8fr 0.9fr', padding: '14px 24px', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#374151' }}>{row.period}</span>
                      <span style={{ fontSize: 13, color: '#374151' }}>{row.payDate}</span>
                      <span style={{ fontSize: 13, color: '#111111', fontFamily: 'monospace', fontWeight: 600 }}>{row.gross}</span>
                      <span style={{ fontSize: 13, color: '#EF4444', fontFamily: 'monospace' }}>{row.deductions}</span>
                      <span style={{ fontSize: 13, color: '#16A34A', fontFamily: 'monospace', fontWeight: 700 }}>{row.net}</span>
                      <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, backgroundColor: '#DCFCE7', fontSize: 12, fontWeight: 600, color: '#16A34A' }}>Paid</span>
                      <button style={{ fontSize: 12, color: '#374151', border: '1px solid #E5E7EB', borderRadius: 6, padding: '4px 10px', backgroundColor: '#FFFFFF', cursor: 'pointer', fontWeight: 500 }}>PDF ↓</button>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: '#F9FAFB', margin: '0 24px' }} />}
                  </div>
                ))}
              </div>

              {/* Tax & Deductions breakdown */}
              <div style={{ ...cardStyle }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 20 }}>Tax &amp; Deductions Breakdown — Sep 2026</div>
                {/* Stacked bar */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#6B7280' }}>Gross Pay: <strong style={{ color: '#111111', fontFamily: 'monospace' }}>₹10,500.00</strong></span>
                    <span style={{ fontSize: 13, color: '#6B7280' }}>Total Deductions: <strong style={{ color: '#EF4444', fontFamily: 'monospace' }}>₹2,050.00</strong></span>
                  </div>
                  <div style={{ height: 14, borderRadius: 99, overflow: 'hidden', display: 'flex', backgroundColor: '#F3F4F6' }}>
                    {deductionItems.map(d => (
                      <div key={d.label} style={{ width: `${d.pct * 0.195}%`, backgroundColor: d.color, height: '100%' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' as const }}>
                    {deductionItems.map(d => (
                      <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: d.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#6B7280' }}>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Itemized list */}
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {deductionItems.map(d => (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 3, height: 16, borderRadius: 99, backgroundColor: d.color }} />
                        <span style={{ fontSize: 14, color: '#374151' }}>{d.label}</span>
                      </div>
                      <span style={{ fontSize: 14, fontFamily: 'monospace', fontWeight: 600, color: '#111111' }}>{d.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — payment details + tax docs */}
            <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Direct deposit */}
              <div style={cardStyle}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111111', marginBottom: 16 }}>Direct Deposit</div>
                {[
                  { bank: 'Chase Bank', mask: '***4821', split: '80%', primary: true },
                  { bank: 'Capital One', mask: '***1092', split: '20%', primary: false },
                ].map(acct => (
                  <div key={acct.mask} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏦</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111111' }}>{acct.bank} {acct.mask}</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF' }}>{acct.split} of net pay{acct.primary ? ' · Primary' : ''}</div>
                    </div>
                  </div>
                ))}
                <button style={{ marginTop: 14, height: 36, width: '100%', borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                  + Edit Payment Accounts
                </button>
              </div>

              {/* Tax forms */}
              <div style={cardStyle}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111111', marginBottom: 16 }}>Tax Forms (W-2 / 1099)</div>
                {[
                  { name: '2025_W2_Form.pdf', label: 'W-2 Wage & Tax Statement' },
                  { name: 'W4_Tax_Withholding.pdf', label: 'W-4 Withholding Certificate' },
                ].map(doc => (
                  <div key={doc.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}>
                    <span style={{ fontSize: 20 }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{doc.name}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{doc.label}</div>
                    </div>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>↓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── ADMIN VIEW ── */}
      {view === 'admin' && (
        <>
          {/* Sub-nav tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #E5E7EB', marginBottom: 24 }}>
            {['Run Payroll', 'Employee Salaries', 'Tax & Compliance', 'Payroll Reports'].map((tab, i) => (
              <div key={tab} style={{ padding: '10px 20px', fontSize: 14, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#111111' : '#6B7280', borderBottom: i === 0 ? '2px solid #222222' : '2px solid transparent', marginBottom: -2, cursor: 'pointer' }}>{tab}</div>
            ))}
          </div>

          {/* 4 metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
            {[
              { label: 'Upcoming Payroll Run', value: '₹342,800.00', sub: 'Due: Sep 30, 2026', accent: '#7C3AED' },
              { label: 'Total Active Employees', value: '128', sub: 'Employees', accent: '#2563EB' },
              { label: 'Pending Bonus Approvals', value: '3', sub: 'Requests pending', accent: '#F59E0B' },
              { label: 'Compliance Status', value: '🟢 All Clear', sub: 'All taxes up to date', accent: '#16A34A' },
            ].map(c => (
              <div key={c.label} style={{ ...cardStyle, borderTop: `3px solid ${c.accent}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#111111', letterSpacing: '-0.01em', fontFamily: 'monospace', marginBottom: 4 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Run Payroll action card */}
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111111' }}>Payroll Processing — September 2026</div>
              <button style={{ height: 42, padding: '0 24px', borderRadius: 8, border: 'none', backgroundColor: '#222222', fontSize: 14, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>
                Run Monthly Payroll →
              </button>
            </div>
            {/* 4-step progress */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[
                { num: 1, label: 'Review Hours', done: true },
                { num: 2, label: 'Adjust Bonuses / Deductions', done: true },
                { num: 3, label: 'Preview Totals', done: false, active: true },
                { num: 4, label: 'Submit Payroll', done: false },
              ].map((step, i, arr) => (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, backgroundColor: step.done ? '#222222' : step.active ? '#F3F4F6' : '#F9FAFB', color: step.done ? '#FFFFFF' : step.active ? '#222222' : '#9CA3AF', border: step.active ? '2px solid #222222' : 'none' }}>
                      {step.done ? '✓' : step.num}
                    </div>
                    <span style={{ fontSize: 11, color: step.done || step.active ? '#374151' : '#9CA3AF', fontWeight: step.active ? 600 : 400, whiteSpace: 'nowrap' as const, textAlign: 'center' as const }}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: step.done ? '#222222' : '#E5E7EB', margin: '0 8px', marginBottom: 18 }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Employee compensation table */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F3F4F6' }}>
              <input placeholder="Search employees..." style={{ height: 36, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, outline: 'none', width: 200 }} />
              <select style={{ height: 36, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }}>
                <option>All Departments</option><option>Engineering</option><option>Marketing</option><option>HR</option><option>Ops</option>
              </select>
              <button style={{ marginLeft: 'auto', height: 36, padding: '0 16px', borderRadius: 8, border: 'none', backgroundColor: '#222222', fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>
                + Add Compensation Adjustment
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1fr 1fr 1fr 1fr 0.5fr', padding: '10px 24px', gap: 10, backgroundColor: '#FAFAFA', borderBottom: '1px solid #F3F4F6' }}>
              {['EMPLOYEE', 'BASE SALARY', 'FREQUENCY', 'BONUS / OT', 'DEDUCTIONS', 'NET PAY', 'STATUS', ''].map(colHdr)}
            </div>
            {adminEmployees.map((emp, i, arr) => (
              <div key={emp.name}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1fr 1fr 1fr 1fr 0.5fr', padding: '14px 24px', gap: 10, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#6B7280', flexShrink: 0 }}>
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111111' }}>{emp.name}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{emp.role}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: '#374151', fontFamily: 'monospace' }}>{emp.salary}</span>
                  <span style={{ fontSize: 13, color: '#374151' }}>{emp.freq}</span>
                  <span style={{ fontSize: 13, color: '#16A34A', fontFamily: 'monospace', fontWeight: 600 }}>{emp.bonus}</span>
                  <span style={{ fontSize: 13, color: '#EF4444', fontFamily: 'monospace' }}>{emp.deductions}</span>
                  <span style={{ fontSize: 13, color: '#111111', fontFamily: 'monospace', fontWeight: 700 }}>{emp.net}</span>
                  <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 20, backgroundColor: emp.statusBg, fontSize: 11, fontWeight: 600, color: emp.statusColor }}>{emp.status}</span>
                  <span style={{ fontSize: 16, color: '#9CA3AF', cursor: 'pointer', textAlign: 'center' as const }}>⋮</span>
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: '#F9FAFB', margin: '0 24px' }} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Settings Page ──────────────────────────────────────────────────────────────
const settingsTabs = [
  { icon: '👤', label: 'Profile', key: 'profile' },
  { icon: '🔔', label: 'Notifications', key: 'notifications' },
  { icon: '🔒', label: 'Security & Auth', key: 'security' },
  { icon: '💳', label: 'Billing & Plans', key: 'billing' },
  { icon: '🌐', label: 'Preferences', key: 'preferences' },
  { icon: '👥', label: 'Team / Roles', key: 'team' },
  { icon: '🔌', label: 'Integrations', key: 'integrations' },
];

function SettingsPage({ onBack, onMobilePreview }: { onBack: () => void; onMobilePreview?: () => void }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.j@company.com');
  const [roleType, setRoleType] = useState('Employee');
  const [customRole, setCustomRole] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 40, border: '1px solid #E5E7EB', borderRadius: 8,
    padding: '0 12px', fontSize: 14, color: '#111111', backgroundColor: '#FFFFFF',
    outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block',
  };
  const selectStyle: React.CSSProperties = { ...inputStyle, appearance: 'none' as const, cursor: 'pointer' };

  return (
    <div style={{ flex: 1, overflowY: 'auto' as const, backgroundColor: '#F9FAFB' }}>
      {/* Breadcrumb + page header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '14px 40px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#6B7280', padding: 0 }}>← Back to Dashboard</button>
          <span style={{ fontSize: 13, color: '#D1D5DB' }}>/</span>
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Settings</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111111', margin: '0 0 4px', letterSpacing: '-0.01em' }}>ACCOUNT SETTINGS</h1>
            <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Manage your account preferences, notifications, and security settings.</p>
          </div>
          {onMobilePreview && (
            <button onClick={onMobilePreview} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', flexShrink: 0 }}>
              📱 Mobile Preview
            </button>
          )}
        </div>
      </div>

      {/* Split layout */}
      <div style={{ display: 'flex', gap: 0, padding: '32px 40px', alignItems: 'flex-start', maxWidth: 1200 }}>

        {/* Left sidebar nav */}
        <div style={{ width: 220, flexShrink: 0, backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '12px 8px', marginRight: 24 }}>
          {settingsTabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <div key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 8, cursor: 'pointer', marginBottom: 2,
                  backgroundColor: isActive ? '#F4F5F7' : 'transparent',
                  borderLeft: isActive ? '3px solid #222222' : '3px solid transparent',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14, color: isActive ? '#111111' : '#6B7280',
                  transition: 'all 0.12s',
                }}>
                <span style={{ fontSize: 16 }}>{tab.icon}</span>
                {tab.label}
              </div>
            );
          })}
          <div style={{ height: 1, backgroundColor: '#F3F4F6', margin: '10px 8px' }} />
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', border: 'none', borderRadius: 8, backgroundColor: 'transparent', cursor: 'pointer', fontSize: 14, color: '#DC2626', textAlign: 'left' as const }}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Right content panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'profile' ? (
            <>
              {/* Profile details card */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '28px 32px', marginBottom: 20 }}>
                {/* Section header */}
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Profile Details</div>
                <div style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 24 }} />

                {/* Avatar row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#D0D0D0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#888888' }}>👤</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button style={{ height: 36, padding: '0 18px', borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Change Photo</button>
                    <button style={{ height: 36, padding: '0 14px', borderRadius: 8, border: 'none', backgroundColor: 'transparent', fontSize: 13, color: '#9CA3AF', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                  </div>
                </div>

                {/* Input fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input style={inputStyle} value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} type="email" />
                  </div>
                </div>

                {/* Dropdowns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Timezone</label>
                    <select style={selectStyle} defaultValue="eastern">
                      <option value="eastern">(GMT-05:00) Eastern Time (US & Canada)</option>
                      <option>(GMT-06:00) Central Time (US & Canada)</option>
                      <option>(GMT-07:00) Mountain Time (US & Canada)</option>
                      <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                      <option>(GMT+00:00) UTC</option>
                      <option>(GMT+01:00) London</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Language</label>
                    <select style={selectStyle} defaultValue="en-us">
                      <option value="en-us">English (US)</option>
                      <option>English (UK)</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Role & access */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '24px 32px', marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Role &amp; Access</div>
                <div style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 18 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'end' }}>
                  <div>
                    <label style={labelStyle}>Switch Role</label>
                    <select style={selectStyle} value={roleType} onChange={e => setRoleType(e.target.value)}>
                      <option>Employee</option>
                      <option>Manager</option>
                      <option>HR Admin</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Type a Role</label>
                    <input style={inputStyle} value={customRole} onChange={e => setCustomRole(e.target.value)} placeholder="e.g. Project Lead" />
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', marginTop: 12 }}>Choose a role from the list or enter a custom role for this profile.</div>
              </div>

              {/* Danger Zone */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1.5px solid #FCA5A5', padding: '24px 32px', marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#EF4444', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Danger Zone</div>
                <div style={{ height: 1, backgroundColor: '#FEE2E2', marginBottom: 16 }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111111', marginBottom: 4 }}>Delete Account</div>
                    <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>Once you delete your account, there is no going back. Please be certain.</div>
                  </div>
                  <button style={{ height: 40, padding: '0 20px', borderRadius: 8, border: '1.5px solid #EF4444', backgroundColor: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#EF4444', cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Action bar */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button onClick={onBack} style={{ height: 42, padding: '0 24px', borderRadius: 8, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
                <button style={{ height: 42, padding: '0 28px', borderRadius: 8, border: 'none', backgroundColor: '#222222', fontSize: 14, color: '#FFFFFF', cursor: 'pointer', fontWeight: 700 }}>Save Changes</button>
              </div>
            </>
          ) : (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '48px 32px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{settingsTabs.find(t => t.key === activeTab)?.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{settingsTabs.find(t => t.key === activeTab)?.label}</div>
              <div style={{ fontSize: 14, color: '#9CA3AF' }}>This section is coming soon.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mobile Settings Screen ─────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width: 44, height: 26, borderRadius: 13, backgroundColor: on ? '#222222' : '#D1D5DB', cursor: 'pointer', position: 'relative' as const, transition: 'background-color 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute' as const, top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
    </div>
  );
}

function MobileSettingsScreen({ onBack }: { onBack: () => void }) {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', padding: '13px 16px', gap: 12, cursor: 'pointer' };
  const divider = <div style={{ height: 1, backgroundColor: '#F3F4F6', margin: '0 16px' }} />;
  const chevron = <span style={{ fontSize: 14, color: '#D1D5DB', marginLeft: 'auto' }}>›</span>;

  return (
    /* Outer canvas — desktop background */
    <div style={{ flex: 1, backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 0 40px', overflowY: 'auto' as const }}>
      {/* Phone shell */}
      <div style={{ width: 390, backgroundColor: '#F3F4F6', borderRadius: 44, boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden', flexShrink: 0 }}>

        {/* Status bar */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px 24px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#111111' }}>▲▲▲</span>
            <span style={{ fontSize: 12, color: '#111111' }}>WiFi</span>
            <span style={{ fontSize: 12, color: '#111111' }}>🔋</span>
          </div>
        </div>

        {/* Nav header */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '8px 20px 14px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#374151', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>‹ Back</button>
          <span style={{ flex: 1, textAlign: 'center' as const, fontSize: 17, fontWeight: 700, color: '#111111' }}>Settings</span>
          <div style={{ width: 50 }} />
        </div>

        {/* Scrollable content */}
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Profile hero */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' as const }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#D0D0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>👤</div>
              <div style={{ position: 'absolute' as const, bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', backgroundColor: '#222222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, border: '2px solid #FFFFFF' }}>📷</div>
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#111111' }}>Sarah Jenkins</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>sarah.j@company.com</div>
            </div>
            <button style={{ marginTop: 4, height: 34, padding: '0 20px', borderRadius: 20, border: '1.5px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
              Edit Profile
            </button>
          </div>

          {/* ACCOUNT */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8, paddingLeft: 4 }}>Account</div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, overflow: 'hidden' }}>
              {[
                { icon: '👤', label: 'Personal Details' },
                { icon: '🔒', label: 'Password & Security' },
                { icon: '💳', label: 'Payment Methods' },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <div style={rowStyle}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 15, color: '#111111' }}>{item.label}</span>
                    {chevron}
                  </div>
                  {i < arr.length - 1 && divider}
                </div>
              ))}
            </div>
          </div>

          {/* PREFERENCES */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8, paddingLeft: 4 }}>Preferences</div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, overflow: 'hidden' }}>
              {[
                { icon: '🔔', label: 'Push Notifications', control: <Toggle on={pushNotif} onChange={() => setPushNotif(v => !v)} /> },
                { icon: '📧', label: 'Email Alerts', control: <Toggle on={emailAlerts} onChange={() => setEmailAlerts(v => !v)} /> },
                { icon: '🌙', label: 'Dark Mode', control: <Toggle on={darkMode} onChange={() => setDarkMode(v => !v)} /> },
                { icon: '🌐', label: 'Language', control: <span style={{ fontSize: 14, color: '#9CA3AF' }}>English {chevron}</span> },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <div style={{ ...rowStyle, cursor: 'default' }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 15, color: '#111111' }}>{item.label}</span>
                    <div style={{ marginLeft: 'auto' }}>{item.control}</div>
                  </div>
                  {i < arr.length - 1 && divider}
                </div>
              ))}
            </div>
          </div>

          {/* SUPPORT & ABOUT */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8, paddingLeft: 4 }}>Support &amp; About</div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, overflow: 'hidden' }}>
              {[
                { icon: '❓', label: 'Help Center' },
                { icon: '📜', label: 'Terms of Service' },
                { icon: '🛡️', label: 'Privacy Policy' },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <div style={rowStyle}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 15, color: '#111111' }}>{item.label}</span>
                    {chevron}
                  </div>
                  {i < arr.length - 1 && divider}
                </div>
              ))}
            </div>
          </div>

          {/* Log out */}
          <button style={{ width: '100%', height: 50, borderRadius: 14, border: '1.5px solid #EF4444', backgroundColor: '#FFFFFF', fontSize: 15, fontWeight: 700, color: '#EF4444', cursor: 'pointer' }}>
            Log Out
          </button>

          {/* Version */}
          <div style={{ textAlign: 'center' as const, fontSize: 12, color: '#9CA3AF', paddingBottom: 8 }}>App Version 2.4.1 (Build 108)</div>
        </div>
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<'dashboard' | 'request' | 'review' | 'settings' | 'mobile' | 'payroll' | 'leaves' | 'requests' | 'attendance' | 'schedule' | 'tasks'>('dashboard');
  const [viewMode, setViewMode] = useState<'employee' | 'manager'>('employee');
  const isHR = page === 'review';
  const isSettings = page === 'settings' || page === 'mobile';

  const sidebarActive =
    isSettings ? 'settings' :
    page === 'payroll' ? 'payroll' :
    page === 'schedule' ? 'schedule' :
    page === 'tasks' ? 'tasks' :
    page === 'leaves' ? 'leaves' :
    page === 'attendance' ? 'attendance' :
    page === 'requests' ? 'requests' :
    page === 'dashboard' ? 'dashboard' : 'requests';

  return (
    <div style={{ width: 1440, height: 1024, backgroundColor: '#F7F9FC', display: 'flex' }}>
      <Sidebar
        active={sidebarActive}
        onNavigate={(k) => {
          if (k === 'settings') setPage('settings');
          else if (k === 'payroll') setPage('payroll');
          else if (k === 'schedule') setPage('schedule');
          else if (k === 'tasks') setPage('tasks');
          else if (k === 'leaves') { setPage('leaves'); setViewMode('employee'); }
          else if (k === 'requests') { setPage('requests'); setViewMode('manager'); }
          else if (k === 'attendance') setPage('attendance');
          else setPage('dashboard');
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppHeader name={isHR || isSettings ? 'Sarah — HR Admin' : 'George Whiteman (Employee)'} />
        {page === 'dashboard' && <Dashboard onNewRequest={() => setPage('request')} onReviewRequest={() => setPage('review')} />}
        {page === 'request' && <ManagementRequestForm onBack={() => setPage('dashboard')} />}
        {page === 'review' && <HRReviewPanel onBack={() => setPage('dashboard')} />}
        {page === 'payroll' && <PayrollPage />}
        {page === 'schedule' && <SchedulePlannerTab />}
        {page === 'tasks' && <FacultyTaskTab />}
        {page === 'leaves' && <LeaveTab mode={viewMode} onModeChange={setViewMode} />}
        {page === 'requests' && <LeaveTab mode={viewMode} onModeChange={setViewMode} />}
        {page === 'attendance' && <AttendanceTab mode={viewMode} onModeChange={setViewMode} />}
        {page === 'settings' && <SettingsPage onBack={() => setPage('dashboard')} onMobilePreview={() => setPage('mobile')} />}
        {page === 'mobile' && <MobileSettingsScreen onBack={() => setPage('settings')} />}
      </div>
    </div>
  );
}
