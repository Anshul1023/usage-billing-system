import React, { useState, useEffect } from 'react';
import { resourceAPI } from '../services/api';
import Header from '../components/Header';
import ResourceForm from '../components/ResourceForm';
import ResourceList from '../components/ResourceList';
import './ResourcesPage.css';

interface Resource {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  price_per_minute: number;
  created_at: string;
  updated_at: string;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const response = await resourceAPI.getAll();
      setResources(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load resources');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResource = async (data: any) => {
    try {
      await resourceAPI.create(data);
      setError('');
      fetchResources();
    } catch (err) {
      setError('Failed to create resource');
      console.error(err);
    }
  };

  const handleDeleteResource = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceAPI.delete(id);
        setError('');
        fetchResources();
      } catch (err) {
        setError('Failed to delete resource');
        console.error(err);
      }
    }
  };

  return (
    <div className="page">
      {error && <div className="error-message">{error}</div>}
      <ResourceForm onSubmit={handleCreateResource} />
      <ResourceList 
        resources={resources} 
        isLoading={isLoading}
        onDelete={handleDeleteResource}
        onSelectResource={() => {}}
      />
    </div>
  );
};

export default ResourcesPage;
