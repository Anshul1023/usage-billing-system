import React from 'react';
import './SessionList.css';

interface UsageSession {
  id: number;
  resource_id: number;
  user_id: string;
  start_time: string;
  end_time?: string;
  is_active: boolean;
  duration_minutes?: number;
  cost?: number;
}

interface Resource {
  id: number;
  name: string;
}

interface SessionListProps {
  sessions: UsageSession[];
  resources: Resource[];
  isLoading: boolean;
  onStopSession: (id: number) => void;
}

const SessionList: React.FC<SessionListProps> = ({
  sessions,
  resources,
  isLoading,
  onStopSession
}) => {

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const getResourceName = (id: number) => {
    const r = resources.find(res => res.id === id);
    return r ? r.name : `#${id}`;
  };

  if (isLoading) {
    return <div className="loading">Loading sessions...</div>;
  }

  if (sessions.length === 0) {
    return <div className="empty-state">No usage sessions found.</div>;
  }

  return (
    <div className="session-list">
      <h2>Usage Sessions</h2>

      <div className="session-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Resource</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map(session => (
              <tr key={session.id} className={session.is_active ? 'active' : 'completed'}>
                <td>{session.user_id}</td>
                <td>{getResourceName(session.resource_id)}</td>
                <td>{formatDate(session.start_time)}</td>
                <td>{formatDuration(session.duration_minutes)}</td>
                <td>${session.cost ? session.cost.toFixed(2) : '0.00'}</td>

                <td>
                  <span className={`status ${session.is_active ? 'active' : 'completed'}`}>
                    {session.is_active ? 'Active' : 'Completed'}
                  </span>
                </td>

                <td>
                  {session.is_active && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onStopSession(session.id)}
                    >
                      Stop
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default SessionList;