import React from 'react';
import './ResourceList.css';

interface Resource {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  price_per_minute: number;
  created_at: string;
  updated_at: string;
}

interface ResourceListProps {
  resources: Resource[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onSelectResource: (resource: Resource) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({ resources, isLoading, onDelete, onSelectResource }) => {
  if (isLoading) {
    return <div className="loading">Loading resources...</div>;
  }

  if (resources.length === 0) {
    return <div className="empty-state">No resources found. Create your first resource!</div>;
  }

  return (
    <div className="resource-list">
      <h2>Resources</h2>
      <div className="resource-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3>{resource.name}</h3>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(resource.id)}
                title="Delete resource"
              >
                Delete
              </button>
            </div>
            {resource.description && <p className="description">{resource.description}</p>}
            <div className="resource-details">
              <div className="detail-item">
                <span className="label">Capacity:</span>
                <span className="value">{resource.capacity} units</span>
              </div>
              <div className="detail-item">
                <span className="label">Price per Minute:</span>
                <span className="value">${resource.price_per_minute.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => onSelectResource(resource)}
            >
              Start Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
