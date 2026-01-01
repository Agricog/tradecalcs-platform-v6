import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../lib/api';

interface EditMaterialPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: {
    id: string;
    description: string;
    quantity: number;
    unit: string;
    totalLength?: number;
    listPrice?: number;
    nettPrice?: number;
  };
  onUpdated: (material: any) => void;
}

export default function EditMaterialPriceModal({
  isOpen,
  onClose,
  material,
  onUpdated,
}: EditMaterialPriceModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [listPrice, setListPrice] = useState(material.listPrice?.toString() || '');
  const [nettPrice, setNettPrice] = useState(material.nettPrice?.toString() || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const token = await getToken();
      const response = await api.updateMaterial(material.id, {
        listPrice: listPrice ? parseFloat(listPrice) : null,
        nettPrice: nettPrice ? parseFloat(nettPrice) : null,
      }, token);

      if (response.success) {
        toast.success('Price updated');
        onUpdated(response.data);
        onClose();
      } else {
        toast.error(response.error?.message || 'Failed to update price');
      }
    } catch (error) {
      toast.error('Failed to update price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Material Price" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-medium text-gray-900">{material.description}</p>
          <p className="text-sm text-gray-500">
            {material.totalLength || material.quantity} {material.unit}
          </p>
        </div>

        <Input
          label="List Price (£)"
          type="number"
          step="0.01"
          min="0"
          value={listPrice}
          onChange={(e) => setListPrice(e.target.value)}
          placeholder="Wholesaler list price"
        />

        <Input
          label="Nett Price (£)"
          type="number"
          step="0.01"
          min="0"
          value={nettPrice}
          onChange={(e) => setNettPrice(e.target.value)}
          placeholder="Your price after discount"
        />

        <p className="text-xs text-gray-500">
          Nett price is what you pay. This is used in quote calculations. List price is optional reference.
        </p>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Price
          </Button>
        </div>
      </form>
    </Modal>
  );
}
