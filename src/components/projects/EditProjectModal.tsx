import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../lib/api';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    name: string;
    address?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  };
  onUpdated: (project: any) => void;
}

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
  onUpdated,
}: EditProjectModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name || '',
    address: project.address || '',
    customerName: project.customerName || '',
    customerEmail: project.customerEmail || '',
    customerPhone: project.customerPhone || '',
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
      const response = await api.updateProject(project.id, {
        name: formData.name.trim(),
        address: formData.address.trim() || null,
        customerName: formData.customerName.trim() || null,
        customerEmail: formData.customerEmail.trim() || null,
        customerPhone: formData.customerPhone.trim() || null,
      }, token);

      if (response.success) {
        toast.success('Project updated');
        onUpdated(response.data);
        onClose();
      } else {
        toast.error(response.error?.message || 'Failed to update project');
      }
    } catch (error) {
      toast.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Project Details" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name *"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g. Smith Kitchen Rewire"
          required
        />

        <Input
          label="Site Address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          placeholder="e.g. 123 High Street, London"
        />

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Customer Details</p>
          
          <div className="space-y-3">
            <Input
              label="Customer Name"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              placeholder="e.g. John Smith"
            />

            <Input
              label="Customer Email"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
              placeholder="e.g. john@email.com"
            />

            <Input
              label="Customer Phone"
              value={formData.customerPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
              placeholder="e.g. 07700 900123"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Customer email is used for quote notifications.
        </p>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
