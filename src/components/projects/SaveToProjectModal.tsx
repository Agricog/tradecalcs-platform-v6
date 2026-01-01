import { useState, useEffect } from 'react';
import { useAuth, useUser, SignInButton } from '@clerk/clerk-react';
import { FolderOpen, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../lib/api';

interface CalculationData {
  circuitName: string;
  calcType: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  cableType?: string;
  cableSize?: string;
  lengthMetres?: number;
  quantity?: number;
}

interface SaveToProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculationData: CalculationData;
  onSaved?: () => void;
}

export default function SaveToProjectModal({ 
  isOpen, 
  onClose, 
  calculationData,
  onSaved 
}: SaveToProjectModalProps) {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);

  useEffect(() => {
    if (isOpen && isSignedIn) {
      loadProjects();
    }
  }, [isOpen, isSignedIn]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await api.getProjects(token);
      if (response.success) {
        setProjects(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      toast.error('Enter a project name');
      return;
    }

    setCreatingProject(true);
    try {
      const token = await getToken();
      const response = await api.createProject({ name: newProjectName.trim() }, token);
      if (response.success) {
        setProjects(prev => [response.data, ...prev]);
        setSelectedProjectId(response.data.id);
        setShowNewProject(false);
        setNewProjectName('');
        toast.success('Project created');
      } else {
        toast.error(response.error?.message || 'Failed to create project');
      }
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setCreatingProject(false);
    }
  };

  const handleSave = async () => {
    if (!selectedProjectId) {
      toast.error('Select a project');
      return;
    }

    setSaving(true);
    try {
      const token = await getToken();
      const response = await api.createCalculation({
        projectId: selectedProjectId,
        ...calculationData,
      }, token);

      if (response.success) {
        toast.success('Calculation saved to project');
        onSaved?.();
        onClose();
      } else {
        toast.error(response.error?.message || 'Failed to save calculation');
      }
    } catch (error) {
      toast.error('Failed to save calculation');
    } finally {
      setSaving(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Save to Project" size="sm">
        <div className="text-center py-6">
          <FolderOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Sign in to Save</h3>
          <p className="text-gray-600 mb-6">
            Create an account to save calculations to projects and generate quotes.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full">Sign In</Button>
          </SignInButton>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save to Project" size="md">
      <div className="space-y-4">
        {/* Calculation Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">{calculationData.circuitName}</h4>
          <div className="text-sm text-gray-600 space-y-1">
            {calculationData.cableSize && (
              <p>Cable: {calculationData.cableSize} {calculationData.cableType}</p>
            )}
            {calculationData.lengthMetres && (
              <p>Length: {calculationData.lengthMetres}m</p>
            )}
          </div>
        </div>

        {/* Project Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Project
            </label>
            <button
              onClick={() => setShowNewProject(!showNewProject)}
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>

          {showNewProject && (
            <div className="mb-3 flex gap-2">
              <Input
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
              />
              <Button onClick={handleCreateProject} loading={creatingProject}>
                Create
              </Button>
            </div>
          )}

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No projects yet</p>
              <p className="text-sm">Create your first project above</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    selectedProjectId === project.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{project.name}</p>
                      {project.customerName && (
                        <p className="text-sm text-gray-500">{project.customerName}</p>
                      )}
                    </div>
                    {selectedProjectId === project.id && (
                      <Check className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            loading={saving}
            disabled={!selectedProjectId}
          >
            Save to Project
          </Button>
        </div>
      </div>
    </Modal>
  );
}
