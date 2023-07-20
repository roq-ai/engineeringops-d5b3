import axios from 'axios';
import queryString from 'query-string';
import { MetricInterface, MetricGetQueryInterface } from 'interfaces/metric';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMetrics = async (query?: MetricGetQueryInterface): Promise<PaginatedInterface<MetricInterface>> => {
  const response = await axios.get('/api/metrics', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMetric = async (metric: MetricInterface) => {
  const response = await axios.post('/api/metrics', metric);
  return response.data;
};

export const updateMetricById = async (id: string, metric: MetricInterface) => {
  const response = await axios.put(`/api/metrics/${id}`, metric);
  return response.data;
};

export const getMetricById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/metrics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMetricById = async (id: string) => {
  const response = await axios.delete(`/api/metrics/${id}`);
  return response.data;
};
