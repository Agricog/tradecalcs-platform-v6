import { useState, useEffect } from 'react';
import { useAuth, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../lib/api';

interface BrickCalcResults {
  materialName: string;
  itemsWithWaste: string;
  wallArea: string;
  length: string;
  height: string;
  sandTonnes: string;
  cementBags: number;
  unitName: string;
  wasteFactor: number;
}

interface SaveBrickCalcToProjectProps {
  results: BrickCalcResults;
}

export default function SaveBrickCalcToProject({ results }: SaveBrickCalcToProjectProps) {
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (showModal && isSignedIn) {
      loadProjects();
    }
  }, [showModal, isSignedIn]);

  const loadProjects = async () => {
    try {
      const token = await getToken();
      const response = await api.getProjects(token);
      if (response.success) {
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProjectId(response.data[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedProjectId && !newProjectName) {
      toast.error('Select a project or create a new one');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      let projectId = selectedProjectId;

      // Create new project if needed
      if (showNewProject && newProjectName) {
        const projectResponse = await api.createProject({
          name: newProjectName,
        }, token);
        
        if (!projectResponse.success) {
          toast.error('Failed to create project');
          setLoading(false);
          return;
        }
        projectId = projectResponse.data.id;
      }

      // Save the calculation
const calcResponse = await api.createCalculation({
  projectId,
  calcType: 'brick_calc',
  circuitName: `${results.materialName} - ${results.length}m × ${results.height}m`,
  inputs: {
    materialName: results.materialName,
    length: results.length,
    height: results.height,
    wallArea: results.wallArea,
    wasteFactor: results.wasteFactor,
  },
  outputs: {
    itemsWithWaste: results.itemsWithWaste,
    sandTonnes: results.sandTonnes,
    cementBags: results.cementBags,
  },
}, token);

      if (!calcResponse.success) {
        toast.error('Failed to save calculation');
        setLoading(false);
        return;
      }

      // Add materials to project
const materials = [
  {
    projectId,
    description: results.unitName === 'bricks' ? 'Standard UK Bricks' : results.materialName,
    quantity: parseInt(results.itemsWithWaste.replace(/,/g, '')),
    unit: 'each',
    sourceCalcIds: [calcResponse.data.id],
  },
  {
    projectId,
    description: 'Building Sand',
    quantity: parseFloat(results.sandTonnes),
    unit: 'tonnes',
    sourceCalcIds: [calcResponse.data.id],
  },
  {
    projectId,
    description: 'Cement (25kg bags)',
    quantity: results.cementBags,
    unit: 'each',
    sourceCalcIds: [calcResponse.data.id],
  },
];

      for (const material of materials) {
        await api.createMaterial(material, token);
      }

      toast.success('Saved to project!');
setSaved(true);
setTimeout(() => {
  setShowModal(false);
  setSaved(false);
  navigate(`/projects/${projectId}`);
}, 1500);

    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-purple-900 mb-3">
          <strong>Save to Project</strong> - Track materials across your job
        </p>
        <SignInButton mode="modal">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition">
            Sign In to Save
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
      >
        <FolderPlus className="w-5 h-5" />
        Save to Project
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Save to Project</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {saved ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Saved!</p>
                </div>
              ) : (
                <>
                  {/* Materials Preview */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2">MATERIALS TO SAVE</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{results.materialName}</span>
                        <span className="font-medium">{results.itemsWithWaste}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Building Sand</span>
                        <span className="font-medium">{results.sandTonnes} tonnes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cement (25kg bags)</span>
                        <span className="font-medium">{results.cementBags} bags</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Selection */}
                  {!showNewProject ? (
                    <>
                      {projects.length > 0 ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Project
                          </label>
                          <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          >
                            {projects.map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">No projects yet. Create one below.</p>
                      )}
                      <button
                        onClick={() => setShowNewProject(true)}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Create New Project
                      </button>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Project Name
                      </label>
                      <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="e.g. Smith Garden Wall"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        autoFocus
                      />
                      <button
                        onClick={() => setShowNewProject(false)}
                        className="text-gray-500 hover:text-gray-700 text-sm mt-2"
                      >
                        ← Back to existing projects
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {!saved && (
              <div className="border-t px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
