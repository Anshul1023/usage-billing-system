import React, { useState, useEffect } from 'react';
import { billingAPI, resourceAPI } from '../services/api';
import BillingList from '../components/BillingList';
import './BillingPage.css';

interface BillingRecord {
  id: number;
  usage_session_id: number;
  resource_id: number;
  user_id: string;
  duration_minutes: number;
  price_per_minute: number;
  total_cost: number;
  created_at: string;
}

interface Resource {
  id: number;
  name: string;
}

const BillingPage: React.FC = () => {
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBillingRecords();
    fetchResources();
  }, []);

  const fetchBillingRecords = async () => {
    try {
      setIsLoading(true);
      const response = await billingAPI.getAll();
      setRecords(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load billing records');
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

  return (
    <div className="page">
      {error && <div className="error-message">{error}</div>}

      <BillingList
        records={records}
        resources={resources}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BillingPage;