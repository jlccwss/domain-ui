const authority = {
  admin: ['zones', '1', 'zoneInfo', '2', 'domains', 'sslCertificates', '3', 'icps', 'records', 'recordInfo', 'website', '4', 'contacts', 'auditlogs', 'users', '5', 'approveModule', 'approveList', '6', 'apps', 'groups'],
  approve: ['approveList', '5'],
  auditing: ['auditlogs', '4'],
  itInterfacer: ['domains', '2', '3', 'icps', '5', 'approveModule'],
};

export default authority;