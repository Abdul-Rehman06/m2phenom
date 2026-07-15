import { createBrowserRouter, RouterProvider, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppLayout, AuthLayout, ContentWrapper, PageHeader } from '@/layouts';
import { ProtectedRoute, PageTransition, CommandPalette, GlobalModal, GlobalDrawer, ConfirmationDialog, ToastContainer } from '@/components';
import { ROUTE_NAMES, ROUTES } from '@/constants';
import { ClientManager } from '@/pages/users/ClientManager';
import { EditClient } from '@/pages/users/EditClient';
import { ClientOnboardingLink } from '@/pages/users/ClientOnboardingLink';
import { Home } from '@/pages/dashboard/Home';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { SelectSubscription } from '@/pages/onboarding/SelectSubscription';
import { CreateProfile } from '@/pages/onboarding/CreateProfile';
import { GetCreditReport } from '@/pages/onboarding/GetCreditReport';
import { UploadCreditReport } from '@/pages/onboarding/UploadCreditReport';
import { SendFirstAttack } from '@/pages/onboarding/SendFirstAttack';
import { CommunicationPortal } from '@/pages/onboarding/CommunicationPortal';
import { FAQGuide } from '@/pages/onboarding/FAQGuide';
import { PricingPage } from '@/pages/pricing/PricingPage';
import { PurchaseAdditionalAttacks } from '@/pages/pricing/PurchaseAdditionalAttacks';
import { ManageSubscription } from '@/pages/pricing/ManageSubscription';
import { ReportScoreBoard } from '@/pages/credit-report/ReportScoreBoard';
import { ImportedClients } from '@/pages/users/ImportedClients';
import { ImportClient } from '@/pages/users/ImportClient';
import { CompletedLetters } from '@/pages/attacks/CompletedLetters';
import { AIGenerator } from '@/pages/attacks/AIGenerator';
import { PowerUserGenerator } from '@/pages/attacks/PowerUserGenerator';
import { TextMessages } from '@/pages/communication/TextMessages';
import { EmailCommunication } from '@/pages/communication/EmailCommunication';
import { SupportTicket } from '@/pages/communication/SupportTicket';
import { PPAMSInvoice } from '@/pages/communication/PPAMSInvoice';
import { ManageSMSTemplates } from '@/pages/communication/ManageSMSTemplates';
import { ManageEmailTemplates } from '@/pages/communication/ManageEmailTemplates';
import { JoinCommunity } from '@/pages/training/JoinCommunity';

// Root wrapper to provide Router context to global overlays
function RootWrapper() {
  return (
    <>
      <Outlet />
      {/* Global UI Layers */}
      <CommandPalette />
      <GlobalModal />
      <GlobalDrawer />
      <ConfirmationDialog />
      <ToastContainer />
    </>
  );
}

// A dynamic placeholder component that displays the current route title
function PlaceholderPage() {
  const location = useLocation();
  const title = ROUTE_NAMES[location.pathname] || 'Under Construction';

  return (
    <PageTransition>
      <ContentWrapper>
        <PageHeader 
          title={title} 
          description={`This is the placeholder page for ${location.pathname}.`}
        />
        <div className="card-base p-6 h-96 flex items-center justify-center border-dashed border-2">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary-500/10 text-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">{title} Component</h3>
            <p className="text-surface-500 max-w-sm mx-auto">
              This route is wired up correctly in the navigation system. The actual page component will be built here later.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </PageTransition>
  );
}

// Generate route objects dynamically from the ROUTE_NAMES dictionary
const generatedRoutes = Object.keys(ROUTE_NAMES).map((path) => {
  const cleanPath = path === '/' ? undefined : path.replace(/^\//, '');

  if (path === ROUTES.USERS.MANAGE_PROFILES) {
    return {
      path: cleanPath,
      element: <ClientManager />,
    };
  }

  if (path === ROUTES.USERS.EDIT_PROFILE) {
    return {
      path: cleanPath,
      element: <EditClient />,
    };
  }

  if (path === ROUTES.USERS.ONBOARDING_LINK) {
    return {
      path: cleanPath,
      element: <ClientOnboardingLink />,
    };
  }

  if (path === ROUTES.USERS.IMPORT_FILES.IMPORTED_CLIENTS) {
    return {
      path: cleanPath,
      element: <ImportedClients />,
    };
  }

  if (path === ROUTES.USERS.IMPORT_FILES.IMPORT_CLIENT) {
    return {
      path: cleanPath,
      element: <ImportClient />,
    };
  }

  if (path === ROUTES.GET_STARTED.SELECT_SUBSCRIPTION) {
    return {
      path: cleanPath,
      element: <SelectSubscription />,
    };
  }

  if (path === ROUTES.GET_STARTED.CREATE_PROFILE) {
    return {
      path: cleanPath,
      element: <CreateProfile />,
    };
  }

  if (path === ROUTES.GET_STARTED.GET_CREDIT_REPORT) {
    return {
      path: cleanPath,
      element: <GetCreditReport />,
    };
  }

  if (path === ROUTES.GET_STARTED.UPLOAD_CREDIT_REPORT) {
    return {
      path: cleanPath,
      element: <UploadCreditReport />,
    };
  }

  if (path === ROUTES.GET_STARTED.SEND_FIRST_ATTACK) {
    return {
      path: cleanPath,
      element: <SendFirstAttack />,
    };
  }

  if (path === ROUTES.GET_STARTED.COMMUNICATION_PORTAL) {
    return {
      path: cleanPath,
      element: <CommunicationPortal />,
    };
  }

  if (path === ROUTES.GET_STARTED.FAQ) {
    return {
      path: cleanPath,
      element: <FAQGuide />,
    };
  }

  if (path === ROUTES.PRICING.SELECT_SUBSCRIPTION) {
    return {
      path: cleanPath,
      element: <PricingPage />,
    };
  }

  if (path === ROUTES.PRICING.PURCHASE_ATTACKS) {
    return {
      path: cleanPath,
      element: <PurchaseAdditionalAttacks />,
    };
  }

  if (path === ROUTES.PRICING.MANAGE) {
    return {
      path: cleanPath,
      element: <ManageSubscription />,
    };
  }

  if (path === ROUTES.CREDIT_REPORT.SCORE_BOARD) {
    return {
      path: cleanPath,
      element: <ReportScoreBoard />,
    };
  }

  if (path === ROUTES.SEND_ATTACKS.COMPLETED_LETTERS) {
    return {
      path: cleanPath,
      element: <CompletedLetters />,
    };
  }

  if (path === ROUTES.SEND_ATTACKS.AI_GENERATOR) {
    return {
      path: cleanPath,
      element: <AIGenerator />,
    };
  }

  if (path === ROUTES.SEND_ATTACKS.POWER_USER_GENERATOR) {
    return {
      path: cleanPath,
      element: <PowerUserGenerator />,
    };
  }

  if (path === ROUTES.COMMUNICATION.TEXT_MESSAGES) {
    return {
      path: cleanPath,
      element: <TextMessages />,
    };
  }

  if (path === ROUTES.COMMUNICATION.EMAIL) {
    return {
      path: cleanPath,
      element: <EmailCommunication />,
    };
  }

  if (path === ROUTES.COMMUNICATION.SUPPORT_TICKET) {
    return {
      path: cleanPath,
      element: <SupportTicket />,
    };
  }

  if (path === ROUTES.COMMUNICATION.INVOICE) {
    return {
      path: cleanPath,
      element: <PPAMSInvoice />,
    };
  }

  if (path === ROUTES.COMMUNICATION.TEMPLATES.SMS) {
    return {
      path: cleanPath,
      element: <ManageSMSTemplates />,
    };
  }

  if (path === ROUTES.COMMUNICATION.TEMPLATES.EMAIL) {
    return {
      path: cleanPath,
      element: <ManageEmailTemplates />,
    };
  }

  if (path === ROUTES.TRAINING.COMMUNITY) {
    return {
      path: cleanPath,
      element: <JoinCommunity />,
    };
  }

  if (path === ROUTES.HOME || path === '/') {
    return {
      path: cleanPath,
      index: path === '/',
      element: <Home />,
    };
  }

  return {
    path: cleanPath,
    index: path === '/',
    element: <PlaceholderPage />,
  };
});

const router = createBrowserRouter([
  {
    element: <RootWrapper />,
    children: [
      // Public Authentication Routes
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: (
              <PageTransition>
                <Login />
              </PageTransition>
            )
          },
          {
            path: 'register',
            element: (
              <PageTransition>
                <Register />
              </PageTransition>
            )
          },
          {
            path: 'reset-password',
            element: (
              <PageTransition>
                <ResetPassword />
              </PageTransition>
            )
          }
        ]
      },
      // Protected Application Routes
      {
        path: '/',
        element: <ProtectedRoute />, // Protects all children
        children: [
          {
            element: <AppLayout />,
            children: [
              ...generatedRoutes,
              // Fallback 404
              {
                path: '*',
                element: (
                  <PageTransition>
                    <ContentWrapper>
                      <PageHeader title="404 - Not Found" description="The page you are looking for does not exist." />
                    </ContentWrapper>
                  </PageTransition>
                )
              }
            ]
          }
        ]
      }
    ]
  }
]);

export function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}
