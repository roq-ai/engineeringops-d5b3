const mapping: Record<string, string> = {
  assets: 'asset',
  metrics: 'metric',
  organizations: 'organization',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
