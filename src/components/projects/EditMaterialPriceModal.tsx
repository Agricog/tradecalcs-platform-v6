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

  const qty = material.totalLength || material.quantity;
  const unitLabel = material.unit === 'metres' ? 'per metre' : material.unit === 'each' ? 'each' : `per ${material.unit}`;
  const totalPrice = (parseFloat(nettPrice) || 0) * qty;

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
            {qty} {material.unit}
          </p>
        </div>

        <Input
          label={`List Price (£) ${unitLabel}`}
          type="number"
          step="0.01"
          min="0"
          value={listPrice}
          onChange={(e) => setListPrice(e.target.value)}
          placeholder="Wholesaler list price"
        />

        <Input
          label={`Nett Price (£) ${unitLabel}`}
          type="number"
          step="0.01"
          min="0"
          value={nettPrice}
          onChange={(e) => setNettPrice(e.target.value)}
          placeholder="Your price after discount"
        />

        {nettPrice && parseFloat(nettPrice) > 0 && qty > 1 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-green-800">Line Total ({qty} × £{parseFloat(nettPrice).toFixed(2)})</span>
              <span className="font-bold text-green-700">£{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500">
          Nett price is what you pay {unitLabel}. This is used in quote calculations.
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
