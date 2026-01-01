import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../lib/api';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (project: any) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onCreated }: CreateProjectModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const response = await api.createProject(formData, token);
      
      if (response.success) {
        toast.success('Project created');
        onCreated(response.data);
        setFormData({
          name: '',
          address: '',
          customerName: '',
          customerEmail: '',
          customerPhone: '',
        });
        onClose();
      } else {
        toast.error(response.error?.message || 'Failed to create project');
      }
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. 14 Acacia Avenue Rewire"
          required
        />
        
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full property address"
        />
        
        <Input
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="e.g. Mr Smith"
        />
        
        <Input
          label="Customer Email"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="customer@email.com"
        />
        
        <Input
          label="Customer Phone"
          name="customerPhone"
          type="tel"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="07700 900123"
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
