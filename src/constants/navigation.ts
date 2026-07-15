import {
  Home,
  Rocket,
  CreditCard,
  FileText,
  Users,
  MessageSquare,
  Zap,
  Video,
  Star,
} from 'lucide-react';
import { ROUTES } from './routes';

export type NavItem = {
  title: string;
  path?: string;
  icon?: React.ElementType;
  badge?: number;
  children?: NavItem[];
  isExternal?: boolean;
};

export const SIDEBAR_NAV: NavItem[] = [
  {
    title: 'Home',
    path: ROUTES.HOME,
    icon: Home,
  },
  {
    title: 'Get Started',
    icon: Rocket,
    children: [
      { title: 'Select Subscription', path: ROUTES.GET_STARTED.SELECT_SUBSCRIPTION },
      { title: 'Create Profile', path: ROUTES.GET_STARTED.CREATE_PROFILE },
      { title: 'Get Credit Report', path: ROUTES.GET_STARTED.GET_CREDIT_REPORT },
      { title: 'Upload Credit Report', path: ROUTES.GET_STARTED.UPLOAD_CREDIT_REPORT },
      { title: 'Send First Attack', path: ROUTES.GET_STARTED.SEND_FIRST_ATTACK },
      { title: 'Communication Portal', path: ROUTES.GET_STARTED.COMMUNICATION_PORTAL },
      { title: 'FAQ & Guide', path: ROUTES.GET_STARTED.FAQ },
    ],
  },
  {
    title: 'Pricing',
    icon: CreditCard,
    children: [
      { title: 'Select Subscription', path: ROUTES.PRICING.SELECT_SUBSCRIPTION },
      { title: 'Purchase Additional Attacks', path: ROUTES.PRICING.PURCHASE_ATTACKS },
      { title: 'Manage Subscription', path: ROUTES.PRICING.MANAGE },
    ],
  },
  {
    title: 'Get Credit Report',
    icon: FileText,
    children: [
      { 
        title: 'MyFreeScoreNow', 
        path: 'https://myfreescorenow.com/enroll?AID=DominateTheDecadeMentorshipGroup&PID=75483',
        isExternal: true 
      },
      { title: 'Report Score Board', path: ROUTES.CREDIT_REPORT.SCORE_BOARD },
    ],
  },
  {
    title: 'Manage All Users',
    icon: Users,
    children: [
      { title: 'Manage Profiles', path: ROUTES.USERS.MANAGE_PROFILES },
      { title: 'Client Onboarding Link', path: ROUTES.USERS.ONBOARDING_LINK },
      {
        title: 'Import Client Files',
        children: [
          { title: 'Import Client', path: ROUTES.USERS.IMPORT_FILES.IMPORT_CLIENT },
          { title: 'Imported Clients', path: ROUTES.USERS.IMPORT_FILES.IMPORTED_CLIENTS },
        ],
      },
    ],
  },
  {
    title: 'Communication Portal',
    icon: MessageSquare,
    badge: 2,
    children: [
      { title: 'Text Messages', path: ROUTES.COMMUNICATION.TEXT_MESSAGES },
      { title: 'Email Communication', path: ROUTES.COMMUNICATION.EMAIL },
      { title: 'Submit Support Ticket', path: ROUTES.COMMUNICATION.SUPPORT_TICKET },
      { title: 'PPAMS Invoice', path: ROUTES.COMMUNICATION.INVOICE },
      {
        title: 'Manage Templates',
        children: [
          { title: 'SMS Templates', path: ROUTES.COMMUNICATION.TEMPLATES.SMS },
          { title: 'Email Templates', path: ROUTES.COMMUNICATION.TEMPLATES.EMAIL },
        ],
      },
    ],
  },
  {
    title: 'Send Round Of Attacks',
    icon: Zap,
    children: [
      { title: 'Completed Letters', path: ROUTES.SEND_ATTACKS.COMPLETED_LETTERS },
      { title: 'AI Generator', path: ROUTES.SEND_ATTACKS.AI_GENERATOR },
      { title: 'Power User Generator', path: ROUTES.SEND_ATTACKS.POWER_USER_GENERATOR },
    ],
  },
  {
    title: 'Live Training & Support',
    icon: Video,
    children: [
      { title: 'Join Community', path: ROUTES.TRAINING.COMMUNITY },
      { title: 'Live Training Schedule', path: ROUTES.TRAINING.SCHEDULE },
    ],
  },
  {
    title: 'Metro2 Success Testimonials',
    icon: Star,
    path: ROUTES.TESTIMONIALS,
  },
];
