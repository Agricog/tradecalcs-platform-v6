import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Send, 
  FileText,
  Calculator,
  Package,
  Building2,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import Button from '../components/ui/Button';
import AddMaterialModal from '../components/projects/AddMaterialModal';
import SendToWholesalerModal from '../components/projects/SendToWholesalerModal';
import CustomerQuoteModal from '../components/projects/CustomerQuoteModal';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showSendToWholesaler, setShowSendToWholesaler] = useState(false);
  const [showCustomerQuote, setShowCustomerQuote] = useState(false);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const token = await getToken();
      const response = await api.getProject(id!, token);
      if (response.success) {
        setProject(response.data);
      } else {
        toast.error('Project not found');
        navigate('/projects');
      }
    } catch (error) {
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const token = await getToken();
      const response = await api.deleteProject(id!, token);
      if (response.success) {
        toast.success('Project deleted');
        navigate('/projects');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  const handleMaterialAdded = (material: any) => {
    setProject((prev: any) => ({
      ...prev,
      materialItems: [...(prev.materialItems || []), material],
    }));
  };

  const handleDeleteMaterial = async (materialId: string) => {
    if (!confirm('Delete this material?')) return;
    
    try {
      const token = await getToken();
      const response = await api.deleteMaterial(materialId, token);
      if (response.success) {
        setProject((prev: any) => ({
          ...prev,
          materialItems: prev.materialItems.filter((m: any) => m.id !== materialId),
        }));
        toast.success('Material deleted');
      } else {
        toast.error(response.error?.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete material');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-lg p-6 h-48" />
                <div className="bg-white rounded-lg p-6 h-48" />
              </div>
              <div className="bg-white rounded-lg p-6 h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="danger" onClick={handleDelete} loading={deleting}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Calculations Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Calculations
                </h2>
                <Link to="/cable-sizing-calculator">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Calculation
                  </Button>
                </Link>
              </div>
              
              {project.calculations?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No calculations yet</p>
                  <p className="text-sm">Use a calculator and save results to this project</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.calculations?.map((calc: any) => (
                    <div 
                      key={calc.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{calc.circuitName}</p>
                        <p className="text-sm text-gray-500">
                          {calc.cableSize} {calc.cableType} • {calc.lengthMetres}m
                        </p>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {calc.calcType.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Materials Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Materials
                </h2>
                <Button size="sm" variant="secondary" onClick={() => setShowAddMaterial(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Material
                </Button>
              </div>
              
              {project.materialItems?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No materials yet</p>
                  <p className="text-sm">Materials are auto-extracted from calculations or add manually</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.materialItems?.map((material: any) => (
                    <div 
                      key={material.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{material.description}</p>
                        <p className="text-sm text-gray-500">
                          {material.quantity} {material.unit}
                          {material.totalLength ? ` • ${material.totalLength}m` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {material.nettPrice ? (
                          <span className="font-medium text-green-600">
                            £{Number(material.nettPrice).toFixed(2)}
                          </span>
                        ) : material.listPrice ? (
                          <span className="font-medium text-gray-600">
                            £{Number(material.listPrice).toFixed(2)}
                          </span>
                        ) : null}
                        {(!material.sourceCalcIds || material.sourceCalcIds.length === 0) ? (
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteMaterial(material.id);
    }}
    className="p-1 text-red-500 hover:bg-red-50 rounded"
    title="Delete material"
  >
    <Trash2 className="w-4 h-4" />
  </button>
) : (
  <span className="text-xs text-gray-400">auto</span>
)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Section */}
            {/* Actions Section */}
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <h2 className="text-lg font-semibold mb-4">Quote Actions</h2>
  <div className="flex flex-wrap gap-3">
    <Button 
      variant="secondary" 
      disabled={project.materialItems?.length === 0}
      onClick={() => setShowSendToWholesaler(true)}
    >
      <Send className="w-4 h-4 mr-2" />
      Send to Wholesaler
    </Button>
    <Button 
  variant="secondary" 
  disabled={project.materialItems?.length === 0}
  onClick={() => setShowCustomerQuote(true)}
>
  <FileText className="w-4 h-4 mr-2" />
  Create Customer Quote
</Button>
  </div>
  {project.wholesalerQuotes?.length > 0 && (
    <div className="mt-4 pt-4 border-t">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Sent Quotes</h3>
      <div className="space-y-2">
        {project.wholesalerQuotes.map((quote: any) => (
          <div key={quote.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
            <span>{quote.wholesalerName}</span>
            <span className={`px-2 py-0.5 rounded text-xs ${
              quote.status === 'priced' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {quote.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Customer Details
              </h2>
              
              <div className="space-y-3">
                {project.customerName && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-1" />
                    <span>{project.customerName}</span>
                  </div>
                )}
                {project.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span>{project.address}</span>
                  </div>
                )}
                {project.customerEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-1" />
                    <span>{project.customerEmail}</span>
                  </div>
                )}
                {project.customerPhone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-1" />
                    <span>{project.customerPhone}</span>
                  </div>
                )}
                {!project.customerName && !project.address && !project.customerEmail && !project.customerPhone && (
                  <p className="text-gray-500 text-sm">No customer details added</p>
                )}
              </div>
            </div>

            {/* Project Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Project Status
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium capitalize">{project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Calculations</span>
                  <span className="font-medium">{project.calculations?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materials</span>
                  <span className="font-medium">{project.materialItems?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quotes Sent</span>
                  <span className="font-medium">{project.wholesalerQuotes?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Material Modal */}
      <AddMaterialModal
        isOpen={showAddMaterial}
        onClose={() => setShowAddMaterial(false)}
        projectId={id!}
        onAdded={handleMaterialAdded}
      />
      {/* Send to Wholesaler Modal */}
<SendToWholesalerModal
  isOpen={showSendToWholesaler}
  onClose={() => setShowSendToWholesaler(false)}
  projectId={id!}
  projectName={project.name}
  onSent={(quote) => {
    setProject((prev: any) => ({
      ...prev,
      wholesalerQuotes: [...(prev.wholesalerQuotes || []), quote],
    }));
  }}
/>
      {/* Customer Quote Modal */}
<CustomerQuoteModal
  isOpen={showCustomerQuote}
  onClose={() => setShowCustomerQuote(false)}
  projectId={id!}
  projectName={project.name}
  materials={project.materialItems || []}
  onCreated={(quote) => {
    setProject((prev: any) => ({
      ...prev,
      customerQuotes: [...(prev.customerQuotes || []), quote],
    }));
  }}
/>
    </div>
  );
}
