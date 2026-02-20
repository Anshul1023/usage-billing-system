import React, { useState } from 'react';
import './ResourceForm.css';

interface ResourceFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    price_per_minute: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacity: parseInt(formData.capacity),
      price_per_minute: parseFloat(formData.price_per_minute),
    });
    setFormData({
      name: '',
      description: '',
      capacity: '',
      price_per_minute: '',
    });
  };

  return (
    <form className="resource-form" onSubmit={handleSubmit}>
      <h2>Create Resource</h2>
      <div className="form-group">
        <label htmlFor="name">Resource Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="capacity">Capacity *</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price_per_minute">Price per Minute ($) *</label>
          <input
            type="number"
            id="price_per_minute"
            name="price_per_minute"
            value={formData.price_per_minute}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Resource'}
      </button>
    </form>
  );
};

export default ResourceForm;
