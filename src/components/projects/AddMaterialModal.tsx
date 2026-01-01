import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { api } from '../../lib/api';

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onAdded: (material: any) => void;
}

const UNIT_OPTIONS = [
  { value: 'each', label: 'Each' },
  { value: 'metres', label: 'Metres' },
  { value: 'box', label: 'Box' },
  { value: 'roll', label: 'Roll' },
  { value: 'set', label: 'Set' },
];

const COMMON_MATERIALS = [
  { description: 'Consumer Unit 10 Way', unit: 'each' },
  { description: 'Consumer Unit 16 Way', unit: 'each' },
  { description: 'MCB Type B 6A', unit: 'each' },
  { description: 'MCB Type B 16A', unit: 'each' },
  { description: 'MCB Type B 32A', unit: 'each' },
  { description: 'MCB Type C 32A', unit: 'each' },
  { description: 'RCBO Type A 32A 30mA', unit: 'each' },
  { description: 'RCD 63A 30mA', unit: 'each' },
  { description: 'Main Switch 100A', unit: 'each' },
  { description: 'Double Socket Outlet', unit: 'each' },
  { description: 'Single Socket Outlet', unit: 'each' },
  { description: 'Fused Connection Unit', unit: 'each' },
  { description: '20mm Conduit', unit: 'metres' },
  { description: '25mm Conduit', unit: 'metres' },
  { description: 'Mini Trunking 25x16mm', unit: 'metres' },
  { description: 'Cable Clips', unit: 'box' },
  { description: 'Junction Box', unit: 'each' },
  { description: 'Earth Rod Kit', unit: 'each' },
  { description: 'Isolation Switch', unit: 'each' },
];

export default function AddMaterialModal({ isOpen, onClose, projectId, onAdded }: AddMaterialModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    quantity: '1',
    unit: 'each',
    totalLength: '',
    listPrice: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast.error('Enter a description');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const response = await api.createMaterial({
        projectId,
        description: formData.description.trim(),
        quantity: parseInt(formData.quantity) || 1,
        unit: formData.unit,
        totalLength: formData.totalLength ? parseFloat(formData.totalLength) : null,
        listPrice: formData.listPrice ? parseFloat(formData.listPrice) : null,
      }, token);

      if (response.success) {
        toast.success('Material added');
        onAdded(response.data);
        setFormData({
          description: '',
          quantity: '1',
          unit: 'each',
          totalLength: '',
          listPrice: '',
        });
        onClose();
      } else {
        toast.error(response.error?.message || 'Failed to add material');
      }
    } catch (error) {
      toast.error('Failed to add material');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = (material: { description: string; unit: string }) => {
    setFormData(prev => ({
      ...prev,
      description: material.description,
      unit: material.unit,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Material" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick Add Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Add Common Items
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {COMMON_MATERIALS.map((material, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAdd(material)}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded transition-colors"
              >
                {material.description}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <Input
            label="Description *"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="e.g. Consumer Unit 10 Way"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
          />
          <Select
            label="Unit"
            value={formData.unit}
            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
            options={UNIT_OPTIONS}
          />
        </div>

        {formData.unit === 'metres' && (
          <Input
            label="Total Length (m)"
            type="number"
            step="0.1"
            value={formData.totalLength}
            onChange={(e) => setFormData(prev => ({ ...prev, totalLength: e.target.value }))}
            placeholder="Optional"
          />
        )}

        <Input
          label="List Price (£) - Optional"
          type="number"
          step="0.01"
          value={formData.listPrice}
          onChange={(e) => setFormData(prev => ({ ...prev, listPrice: e.target.value }))}
          placeholder="Leave blank if unknown"
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Add Material
          </Button>
        </div>
      </form>
    </Modal>
  );
}
