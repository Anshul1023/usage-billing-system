import React, { useState } from 'react';
import './SessionForm.css';

interface SessionFormProps {
  resource?: { id: number; name: string } | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const SessionForm: React.FC<SessionFormProps> = ({ resource, onSubmit, onClose, isLoading = false }) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resource) {
      onSubmit({
        resource_id: resource.id,
        user_id: userId,
      });
      setUserId('');
    }
  };

  if (!resource) {
    return null;
  }

  return (
    <div className="session-form-modal">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h2>Start Usage Session</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Resource</label>
            <p className="resource-display">{resource.name}</p>
          </div>

          <div className="form-group">
            <label htmlFor="userId">User ID *</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user identifier"
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Starting...' : 'Start Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;
