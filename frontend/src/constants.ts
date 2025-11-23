// constants.ts

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ENDPOINTS = {
  LINKS: '/api/links',
  HEALTH: '/healthz',
};

export const HTTP_METHODS = {
  POST: 'POST',
  DELETE: 'DELETE',
  GET: 'GET',
};

export const ERROR_MESSAGES = {
  CREATE_LINK: 'Failed to create link. Please try again.',
  FETCH_LINKS: 'Failed to load links. Please try again.',
  LINK_NOT_FOUND: 'Link not found',
  DELETE_LINK: 'Failed to delete link. Please try again.',
  HEALTH_CHECK: 'Health check failed',
  URL_REQUIRED: 'URL is required',
  URL_INVALID: 'Please enter a valid URL (http:// or https://)',
  CODE_INVALID: 'Code must be 6-8 alphanumeric characters',
  CODE_TAKEN: 'This custom code is already taken. Please choose another one.',
  LOAD_LINK_STATS: 'Failed to load link statistics',
};

export const SUCCESS_MESSAGES = {
  LINK_CREATED: 'Link created successfully!',
  COPIED: 'Copied!',
};

export const TEXT = {
    CREATE_LINK_TITLE: 'Create New Short Link',
    CREATING: 'Creating...',
    CREATE_SHORT_LINK: 'Create Short Link',
    OPTIONAL: '(optional)',
    AUTO_GENERATED_CODE_NOTE: 'Leave empty for auto-generated code',
    YOUR_LINKS_TITLE: 'Your Links',
    SEARCH_PLACEHOLDER: 'Search by code or URL...',
    SHORT_CODE_LABEL: 'Short Code',
    TARGET_URL_LABEL: 'Target URL',
    CLICKS_LABEL: 'Clicks',
    LAST_CLICKED_LABEL: 'Last Clicked',
    STATS_LINK_TEXT: 'Stats',
    DELETE_BUTTON_TEXT: 'Delete',
    DELETING_TEXT: 'Deleting...',
    DASHBOARD_TITLE: 'Dashboard',
    DASHBOARD_DESCRIPTION: 'Create and manage your short links',
    EMPTY_LINKS: 'No short links yet. Create your first one above!',
    EMPTY_SEARCH_RESULTS: 'No links found matching your search.',
    BACK_TO_DASHBOARD: '← Back to Dashboard',
    SYSTEM_HEALTH_TITLE: 'System Health',
    SYSTEM_HEALTH_DESC: 'Monitor system status and uptime',
    STATUS_LABEL: 'Status',
    STATUS_OPERATIONAL: '✓ Operational',
    STATUS_DOWN: '✗ Down',
    ALL_SYSTEMS_OK: 'All systems operational',
    SERVICE_UNAVAILABLE: 'Service unavailable',
    HEALTH_REFRESH_NOTICE: 'Health check endpoint refreshes automatically every 30 seconds.',
    SHARE_SHORT_URL: 'Share your short URL: ',
    LINK_STATS_TITLE: 'Link Statistics',
    LINK_STATS_SUBTITLE: 'Detailed information for your short link',
    COPY_URL: 'Copy URL',
    LOADING: 'Loading...',
    DELETE_ACTION_CONFIRM: 'Are you sure you want to delete the link',
    ACTIONS_LABEL: 'Actions',
    VERSION_LABEL: 'Version',
    UPTIME_LABEL: 'Uptime',
    LAST_CHECK_LABEL: 'Last Check',
    HEALTH_STATUS_LABEL: 'Health Status',
  };
  