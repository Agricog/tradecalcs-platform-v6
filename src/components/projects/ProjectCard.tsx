import { Link } from 'react-router-dom';
import { FolderOpen, Calculator, Package, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    address?: string;
    customerName?: string;
    status: string;
    updatedAt: string;
    _count?: {
      calculations: number;
      materialItems: number;
    };
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-700',
    quoted: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    completed: 'bg-purple-100 text-purple-700',
  };

  const statusColor = statusColors[project.status as keyof typeof statusColors] || statusColors.draft;

  const calculationCount = project._count?.calculations ?? 0;
  const materialCount = project._count?.materialItems ?? 0;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-purple-300 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            {project.customerName && (
              <p className="text-sm text-gray-500">{project.customerName}</p>
            )}
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      {project.address && (
        <p className="text-sm text-gray-600 mb-3 truncate">{project.address}</p>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Calculator className="w-4 h-4" />
          {calculationCount} calculations
        </span>
        <span className="flex items-center gap-1">
          <Package className="w-4 h-4" />
          {materialCount} materials
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </span>
        <span className="text-purple-600 flex items-center gap-1 text-sm font-medium">
          Open <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
