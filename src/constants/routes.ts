export const ROUTES = {
  HOME: '/',
  GET_STARTED: {
    ROOT: '/get-started',
    SELECT_SUBSCRIPTION: '/get-started/select-subscription',
    CREATE_PROFILE: '/get-started/create-profile',
    GET_CREDIT_REPORT: '/get-started/get-credit-report',
    UPLOAD_CREDIT_REPORT: '/get-started/upload-credit-report',
    SEND_FIRST_ATTACK: '/get-started/send-first-attack',
    COMMUNICATION_PORTAL: '/get-started/communication-portal',
    FAQ: '/get-started/faq',
  },
  PRICING: {
    ROOT: '/pricing',
    SELECT_SUBSCRIPTION: '/pricing/select-subscription',
    PURCHASE_ATTACKS: '/pricing/purchase-additional-attacks',
    MANAGE: '/pricing/manage-subscription',
  },
  CREDIT_REPORT: {
    ROOT: '/credit-report',
    MY_FREE_SCORE_NOW: '/credit-report/myfreescorenow',
    SCORE_BOARD: '/credit-report/report-score-board',
  },
  USERS: {
    ROOT: '/users',
    MANAGE_PROFILES: '/users/manage-profiles',
    EDIT_PROFILE: '/users/manage-profiles/:id',
    ONBOARDING_LINK: '/users/client-onboarding-link',
    IMPORT_FILES: {
      ROOT: '/users/import-client-files',
      IMPORT_CLIENT: '/users/import-client-files/import-client',
      IMPORTED_CLIENTS: '/users/import-client-files/imported-clients',
    },
  },
  COMMUNICATION: {
    ROOT: '/communication',
    TEXT_MESSAGES: '/communication/text-messages',
    EMAIL: '/communication/email-communication',
    SUPPORT_TICKET: '/communication/submit-support-ticket',
    INVOICE: '/communication/ppams-invoice',
    TEMPLATES: {
      ROOT: '/communication/manage-templates',
      SMS: '/communication/manage-templates/sms-templates',
      EMAIL: '/communication/manage-templates/email-templates',
    },
  },
  SEND_ATTACKS: {
    ROOT: '/send-round-of-attacks',
    COMPLETED_LETTERS: '/send-round-of-attacks/completed-letters',
    AI_GENERATOR: '/send-round-of-attacks/ai-generator',
    POWER_USER_GENERATOR: '/send-round-of-attacks/power-user-generator',
  },
  TRAINING: {
    ROOT: '/training-support',
    COMMUNITY: '/training-support/join-community',
    SCHEDULE: '/training-support/live-training-schedule',
  },
  TESTIMONIALS: '/testimonials',
} as const;

export const ROUTE_NAMES: Record<string, string> = {
  [ROUTES.HOME]: 'Home',
  
  [ROUTES.GET_STARTED.ROOT]: 'Get Started',
  [ROUTES.GET_STARTED.SELECT_SUBSCRIPTION]: 'Select Subscription',
  [ROUTES.GET_STARTED.CREATE_PROFILE]: 'Create Profile',
  [ROUTES.GET_STARTED.GET_CREDIT_REPORT]: 'Get Credit Report',
  [ROUTES.GET_STARTED.UPLOAD_CREDIT_REPORT]: 'Upload Credit Report',
  [ROUTES.GET_STARTED.SEND_FIRST_ATTACK]: 'Send First Attack',
  [ROUTES.GET_STARTED.COMMUNICATION_PORTAL]: 'Communication Portal',
  [ROUTES.GET_STARTED.FAQ]: 'FAQ',

  [ROUTES.PRICING.ROOT]: 'Pricing',
  [ROUTES.PRICING.SELECT_SUBSCRIPTION]: 'Select Subscription',
  [ROUTES.PRICING.PURCHASE_ATTACKS]: 'Purchase Additional Attacks',
  [ROUTES.PRICING.MANAGE]: 'Manage Subscription',

  [ROUTES.CREDIT_REPORT.ROOT]: 'Get Credit Report',
  [ROUTES.CREDIT_REPORT.MY_FREE_SCORE_NOW]: 'MyFreeScoreNow',
  [ROUTES.CREDIT_REPORT.SCORE_BOARD]: 'Report Score Board',

  [ROUTES.USERS.ROOT]: 'Manage All Users',
  [ROUTES.USERS.MANAGE_PROFILES]: 'Manage Profiles',
  [ROUTES.USERS.EDIT_PROFILE]: 'Edit Client Profile',
  [ROUTES.USERS.ONBOARDING_LINK]: 'Client Onboarding Link',
  [ROUTES.USERS.IMPORT_FILES.ROOT]: 'Import Client Files',
  [ROUTES.USERS.IMPORT_FILES.IMPORT_CLIENT]: 'Import Client',
  [ROUTES.USERS.IMPORT_FILES.IMPORTED_CLIENTS]: 'Imported Clients',

  [ROUTES.COMMUNICATION.ROOT]: 'Communication Portal',
  [ROUTES.COMMUNICATION.TEXT_MESSAGES]: 'Text Messages',
  [ROUTES.COMMUNICATION.EMAIL]: 'Email Communication',
  [ROUTES.COMMUNICATION.SUPPORT_TICKET]: 'Submit Support Ticket',
  [ROUTES.COMMUNICATION.INVOICE]: 'PPAMS Invoice',
  [ROUTES.COMMUNICATION.TEMPLATES.ROOT]: 'Manage Templates',
  [ROUTES.COMMUNICATION.TEMPLATES.SMS]: 'SMS Templates',
  [ROUTES.COMMUNICATION.TEMPLATES.EMAIL]: 'Email Templates',

  [ROUTES.SEND_ATTACKS.ROOT]: 'Send Round Of Attacks',
  [ROUTES.SEND_ATTACKS.COMPLETED_LETTERS]: 'Completed Letters',
  [ROUTES.SEND_ATTACKS.AI_GENERATOR]: 'AI Generator',
  [ROUTES.SEND_ATTACKS.POWER_USER_GENERATOR]: 'Power User Generator',
  
  [ROUTES.TRAINING.ROOT]: 'Live Training & Support',
  [ROUTES.TRAINING.COMMUNITY]: 'Join Community',
  [ROUTES.TRAINING.SCHEDULE]: 'Live Training Schedule',

  [ROUTES.TESTIMONIALS]: 'Metro2 Success Testimonials',
};
