import React, { useState, useEffect } from 'react';
import { usageSessionAPI, resourceAPI } from '../services/api';
import SessionForm from '../components/SessionForm';
import SessionList from '../components/SessionList';
import './SessionsPage.css';

interface UsageSession {
  id: number;
  resource_id: number;
  user_id: string;
  start_time: string;
  end_time?: string;
  is_active: boolean;
  duration_minutes?: number;
  cost?: number;
  created_at: string;
}

interface Resource {
  id: number;
  name: string;
}

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<UsageSession[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetchSessions();
    fetchResources();

    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await usageSessionAPI.getAll();
      setSessions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load sessions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await resourceAPI.getAll();
      setResources(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartSession = async (data: any) => {
    try {
      await usageSessionAPI.start(data);
      setSelectedResource(null);
      setError('');
      await fetchSessions();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to start session');
      console.error(err);
    }
  };

  const handleStopSession = async (id: number) => {
    try {
      await usageSessionAPI.stop(Number(id)); 
      setError('');
      await fetchSessions(); 
    } catch (err) {
      setError('Failed to stop session');
      console.error(err);
    }
  };

  return (
    <div className="page">

      <h2>Resources</h2>

      <div style={{ marginBottom: 20 }}>
        {resources.map((resource) => (
          <button
            key={resource.id}
            style={{ marginRight: 10 }}
            onClick={() => setSelectedResource(resource)}
          >
            Start {resource.name}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <SessionForm
        resource={selectedResource}
        onSubmit={handleStartSession}
        onClose={() => setSelectedResource(null)}
      />

      <SessionList
        sessions={sessions}
        resources={resources}   
        isLoading={isLoading}
        onStopSession={handleStopSession}
      />
    </div>
  );
};

export default SessionsPage;