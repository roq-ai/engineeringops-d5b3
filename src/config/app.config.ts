interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: [
    'Owner',
    'Project Manager',
    'Team Member',
    'Developer',
    'Architect',
    'Test Lead',
    'Business Owner',
    'Business Analyst',
  ],
  tenantName: 'Organization',
  applicationName: 'EngineeringOps',
  addOns: ['chat', 'notifications', 'file'],
};
