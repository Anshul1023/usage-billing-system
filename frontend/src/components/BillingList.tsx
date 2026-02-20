import React from 'react';
import './BillingList.css';

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

interface BillingListProps {
  records: BillingRecord[];
  resources: Resource[];
  isLoading: boolean;
}

const BillingList: React.FC<BillingListProps> = ({
  records,
  resources,
  isLoading
}) => {

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getResourceName = (id: number) => {
    const r = resources.find(res => res.id === id);
    return r ? r.name : `#${id}`;
  };

  const totalRevenue = records.reduce(
    (sum, record) => sum + record.total_cost,
    0
  );

  const totalDuration = records.reduce(
    (sum, record) => sum + record.duration_minutes,
    0
  );

  if (isLoading) {
    return <div className="loading">Loading billing records...</div>;
  }

  if (records.length === 0) {
    return <div className="empty-state">No billing records found.</div>;
  }

  return (
    <div className="billing-list">

      {/* Summary */}
      <div className="billing-summary">

        <div className="summary-card">
          <h3>Total Earnings</h3>
          <p className="summary-value">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="summary-card">
          <h3>Total Usage Time</h3>
          <p className="summary-value">
            {formatDuration(totalDuration)}
          </p>
        </div>

        <div className="summary-card">
          <h3>Total Sessions</h3>
          <p className="summary-value">
            {records.length}
          </p>
        </div>

      </div>

      <h2>Billing Records</h2>

      <div className="billing-table">
        <table>

          <thead>
            <tr>
              <th>User</th>
              <th>Resource</th>
              <th>Duration</th>
              <th>Price / Min</th>
              <th>Total Cost</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td>{record.user_id}</td>
                <td>{getResourceName(record.resource_id)}</td>
                <td>{formatDuration(record.duration_minutes)}</td>
                <td>${record.price_per_minute.toFixed(2)}</td>
                <td className="total-cost">
                  ${record.total_cost.toFixed(2)}
                </td>
                <td>{formatDate(record.created_at)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default BillingList;