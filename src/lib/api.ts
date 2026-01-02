const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Failed to connect to server',
      },
    };
  }
}

export const api = {
  // Projects
  getProjects: (token: string | null) => 
    fetchWithAuth<any[]>('/projects', {}, token),
  
  getProject: (id: string, token: string | null) => 
    fetchWithAuth<any>(`/projects/${id}`, {}, token),
  
  createProject: (data: any, token: string | null) => 
    fetchWithAuth<any>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  
  updateProject: (id: string, data: any, token: string | null) => 
    fetchWithAuth<any>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, token),

  updateProject: async (id: string, data: any, token: string | null) => {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  return response.json();
},
  
  deleteProject: (id: string, token: string | null) => 
    fetchWithAuth<any>(`/projects/${id}`, {
      method: 'DELETE',
    }, token),

  // Calculations
  createCalculation: (data: any, token: string | null) => 
    fetchWithAuth<any>('/calculations', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  
  deleteCalculation: (id: string, token: string | null) => 
    fetchWithAuth<any>(`/calculations/${id}`, {
      method: 'DELETE',
    }, token),

  // Materials
  getMaterials: (projectId: string, token: string | null) => 
    fetchWithAuth<any[]>(`/materials/project/${projectId}`, {}, token),
  
  createMaterial: (data: any, token: string | null) => 
    fetchWithAuth<any>('/materials', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  
  updateMaterial: (id: string, data: any, token: string | null) => 
    fetchWithAuth<any>(`/materials/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, token),
  
  deleteMaterial: (id: string, token: string | null) => 
    fetchWithAuth<any>(`/materials/${id}`, {
      method: 'DELETE',
    }, token),

  // Wholesaler Quotes
  createWholesalerQuote: (data: any, token: string | null) => 
    fetchWithAuth<any>('/wholesaler-quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  
  getWholesalerQuotes: (projectId: string, token: string | null) => 
    fetchWithAuth<any[]>(`/wholesaler-quotes/project/${projectId}`, {}, token),
  
  // Public wholesaler quote (no auth)
  getPublicQuote: (token: string) => 
    fetchWithAuth<any>(`/wholesaler-quotes/public/${token}`, {}),
  
  submitPublicQuote: (token: string, data: any) => 
    fetchWithAuth<any>(`/wholesaler-quotes/public/${token}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Customer Quotes
  createCustomerQuote: (data: any, token: string | null) => 
    fetchWithAuth<any>('/customer-quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  
  getCustomerQuote: (id: string, token: string | null) => 
    fetchWithAuth<any>(`/customer-quotes/${id}`, {}, token),
  
  updateCustomerQuote: (id: string, data: any, token: string | null) => 
    fetchWithAuth<any>(`/customer-quotes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, token),
  
  deleteCustomerQuote: (id: string, token: string | null) => 
    fetchWithAuth<any>(`/customer-quotes/${id}`, {
      method: 'DELETE',
    }, token),

  // Labour Items
  addLabourItem: (quoteId: string, data: any, token: string | null) => 
    fetchWithAuth<any>(`/customer-quotes/${quoteId}/labour`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  
  updateLabourItem: (labourId: string, data: any, token: string | null) => 
    fetchWithAuth<any>(`/customer-quotes/labour/${labourId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, token),
  
  deleteLabourItem: (labourId: string, token: string | null) => 
    fetchWithAuth<any>(`/customer-quotes/labour/${labourId}`, {
      method: 'DELETE',
    }, token),
};
