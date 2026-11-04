import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import IntroScreen from './components/screens/IntroScreen';
import LoginScreen from './components/screens/LoginScreen';
import OTPVerificationScreen from './components/screens/OTPVerificationScreen';
import SuccessScreen from './components/screens/SuccessScreen';
import SplashScreen from './components/screens/SplashScreen';
import OnboardingWordsScreen from './components/screens/OnboardingWordsScreen';
import OnboardingMessageScreen from './components/screens/OnboardingMessageScreen';
import OnboardingValuesScreen from './components/screens/OnboardingValuesScreen';
import OnboardingFinalScreen from './components/screens/OnboardingFinalScreen';
import OnboardingProfileScreen from './components/screens/OnboardingProfileScreen';
import TodayScreen from './components/screens/TodayScreen';
import BodhiEmptyCaseHomeScreen from './components/screens/BodhiEmptyCaseHomeScreen';
import SessionsScreen from './components/screens/SessionsScreen';
import LeagueScreen from './components/screens/LeagueScreen';
import AssignIndividuallyScreen from './components/screens/AssignIndividuallyScreen';
import MemberProfileScreen from './components/screens/MemberProfileScreen';
import BroScreen from './components/screens/BroScreen';
import ExploreScreen from './components/screens/ExploreScreen';
import ThoughtBankScreen from './components/screens/ThoughtBankScreen';
import ThoughtBankRecentEntriesScreen from './components/screens/ThoughtBankRecentEntriesScreen';
import ThoughtBankWriteEntryScreen from './components/screens/ThoughtBankWriteEntryScreen';
import JourneyScreen from './components/screens/JourneyScreen';
import DopaMeterScreen from './components/screens/DopaMeterScreen';
import NewForYouScreen from './components/screens/NewForYouScreen';
import ChakraMeditationPlaylistScreen from './components/screens/ChakraMeditationPlaylistScreen';
import FocusConcentrationPlaylistScreen from './components/screens/FocusConcentrationPlaylistScreen';
import EmotionalWellbeingPlaylistScreen from './components/screens/EmotionalWellbeingPlaylistScreen';
import AwarenessObservationPlaylistScreen from './components/screens/AwarenessObservationPlaylistScreen';
import RegulationControlPlaylistScreen from './components/screens/RegulationControlPlaylistScreen';
import GroundChakraMeditationScreen from './components/screens/GroundChakraMeditationScreen';
import ChakraMeditationPlayerScreen from './components/screens/ChakraMeditationPlayerScreen';
import MeditationSessionScreen from './components/screens/MeditationSessionScreen';
import FocusSprintScreen from './components/screens/FocusSprintScreen';
import FocusStartOptionsScreen from './components/screens/FocusStartOptionsScreen';
import FocusTimerScreen from './components/screens/FocusTimerScreen';
import VoiceOrbScreen from './components/screens/VoiceOrbScreen';
import BreathworkPrepScreen from './components/screens/BreathworkPrepScreen';
import FocusCompletionScreen from './components/screens/FocusCompletionScreen';
import UserTypeSelectionScreen from './components/screens/questionnaire/UserTypeSelectionScreen';
import RoleSelectionScreen from './components/screens/questionnaire/RoleSelectionScreen';
import BasicInfoScreen from './components/screens/questionnaire/BasicInfoScreen';
import BehaviorQuestion1Screen from './components/screens/questionnaire/BehaviorQuestion1Screen';
import BehaviorQuestion2Screen from './components/screens/questionnaire/BehaviorQuestion2Screen';
import BehaviorQuestion3Screen from './components/screens/questionnaire/BehaviorQuestion3Screen';
import BehaviorQuestion4Screen from './components/screens/questionnaire/BehaviorQuestion4Screen';
import BehaviorQuestion5Screen from './components/screens/questionnaire/BehaviorQuestion5Screen';
import BehaviorQuestion6Screen from './components/screens/questionnaire/BehaviorQuestion6Screen';
import EmotionalCheckInScreen from './components/screens/questionnaire/EmotionalCheckInScreen';

import { Navigate } from 'react-router';

function DopaMeterRouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F5FF] px-6">
      <div className="w-full max-w-[340px] rounded-[24px] border border-white/70 bg-white/95 p-6 text-center shadow-[0px_16px_36px_rgba(84,75,187,0.14)]">
        <h1 className="text-[22px] font-bold leading-7 text-[#10122B]">Dopameter could not load</h1>
        <p className="mt-2 text-[14px] font-medium leading-5 text-[#5A5B62]">
          Go back to Today and open it again.
        </p>
        <a
          href="/home"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#5840D4] px-6 text-[14px] font-bold text-white shadow-[0px_10px_22px_rgba(88,64,212,0.24)]"
        >
          Back to Today
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/intro',
    Component: IntroScreen,
  },
  {
    path: '/login',
    Component: LoginScreen,
  },
  {
    path: '/journey',
    element: <Navigate to="/home/journey" replace />,
  },
  {
    path: '/thought-bank',
    element: <Navigate to="/home/explore/thought-bank" replace />,
  },
  {
    path: '/thought-bank/write',
    element: <Navigate to="/home/explore/thought-bank/write" replace />,
  },
  {
    path: '/thought-bank/recent-entries',
    element: <Navigate to="/home/explore/thought-bank/recent-entries" replace />,
  },
  {
    path: '/otp',
    Component: OTPVerificationScreen,
  },
  {
    path: '/success',
    Component: SuccessScreen,
  },
  {
    path: '/welcome',
    Component: SplashScreen,
  },
  {
    path: '/onboarding',
    Component: OnboardingWordsScreen,
  },
  {
    path: '/onboarding-message',
    Component: OnboardingMessageScreen,
  },
  {
    path: '/onboarding-values',
    Component: OnboardingValuesScreen,
  },
  {
    path: '/onboarding-final',
    Component: OnboardingFinalScreen,
  },
  {
    path: '/onboarding-profile',
    Component: OnboardingProfileScreen,
  },
  {
    path: '/questionnaire/user-type',
    Component: UserTypeSelectionScreen,
  },
  {
    path: '/questionnaire/role',
    Component: RoleSelectionScreen,
  },
  {
    path: '/questionnaire/basic-info',
    Component: BasicInfoScreen,
  },
  {
    path: '/questionnaire/behavior-1',
    Component: BehaviorQuestion1Screen,
  },
  {
    path: '/questionnaire/behavior-2',
    Component: BehaviorQuestion2Screen,
  },
  {
    path: '/questionnaire/behavior-3',
    Component: BehaviorQuestion3Screen,
  },
  {
    path: '/questionnaire/behavior-4',
    Component: BehaviorQuestion4Screen,
  },
  {
    path: '/questionnaire/behavior-5',
    Component: BehaviorQuestion5Screen,
  },
  {
    path: '/questionnaire/behavior-6',
    Component: BehaviorQuestion6Screen,
  },
  {
    path: '/questionnaire/emotional-check-in',
    Component: EmotionalCheckInScreen,
  },
  {
    path: '/home',
    Component: RootLayout,
    children: [
      { index: true, Component: TodayScreen },
      { path: 'sessions', Component: SessionsScreen },
      { path: 'sessions/class-circle', element: <Navigate to="/home/sessions/league" replace /> },
      { path: 'sessions/league', Component: LeagueScreen },
      { path: 'sessions/assign-individually', Component: AssignIndividuallyScreen },
      { path: 'sessions/member-profile', Component: MemberProfileScreen },
      { path: 'bro', Component: BroScreen },
      { path: 'ai-companion', element: <Navigate to="/home/bro" replace /> },
      { path: 'explore', Component: ExploreScreen },
      { path: 'explore/new-for-you', Component: NewForYouScreen },
      { path: 'explore/thought-bank', Component: ThoughtBankScreen },
      { path: 'explore/thought-bank/recent-entries', Component: ThoughtBankRecentEntriesScreen },
      { path: 'explore/thought-bank/write', Component: ThoughtBankWriteEntryScreen },
      { path: 'journey', Component: JourneyScreen },
      { path: 'dopa-meter', Component: DopaMeterScreen, errorElement: <DopaMeterRouteFallback /> },
      { path: 'chakra-meditation', Component: ChakraMeditationPlaylistScreen },
      { path: 'focus-concentration', Component: FocusConcentrationPlaylistScreen },
      { path: 'focus-concentration/:focus/session', Component: ChakraMeditationPlayerScreen },
      { path: 'focus-concentration/:focus', Component: GroundChakraMeditationScreen },
      { path: 'emotional-wellbeing', Component: EmotionalWellbeingPlaylistScreen },
      { path: 'emotional-wellbeing/:emotional/session', Component: ChakraMeditationPlayerScreen },
      { path: 'emotional-wellbeing/:emotional', Component: GroundChakraMeditationScreen },
      { path: 'awareness-observation', Component: AwarenessObservationPlaylistScreen },
      { path: 'awareness-observation/:awareness/session', Component: ChakraMeditationPlayerScreen },
      { path: 'awareness-observation/:awareness', Component: GroundChakraMeditationScreen },
      { path: 'regulation-control', Component: RegulationControlPlaylistScreen },
      { path: 'regulation-control/:regulation/session', Component: ChakraMeditationPlayerScreen },
      { path: 'regulation-control/:regulation', Component: GroundChakraMeditationScreen },
      { path: 'chakra-meditation/:chakra/session', Component: ChakraMeditationPlayerScreen },
      { path: 'chakra-meditation/:chakra', Component: GroundChakraMeditationScreen },
      { path: 'meditation-detail', element: <Navigate to="/home/chakra-meditation/root" replace /> },
      { path: 'meditation-session', Component: MeditationSessionScreen },
      { path: 'focus-sprint', Component: FocusSprintScreen },
      { path: 'focus-start-options', Component: FocusStartOptionsScreen },
      { path: 'focus-timer', Component: FocusTimerScreen },
      { path: 'breathwork-prep', Component: BreathworkPrepScreen },
      { path: 'meditation-prep', Component: BreathworkPrepScreen },
      { path: 'focus-complete', Component: FocusCompletionScreen },
      { path: 'voice-orb', Component: VoiceOrbScreen },
    ],
  },
  {
    path: '/bodhi-empty-case',
    Component: RootLayout,
    children: [
      { index: true, Component: BodhiEmptyCaseHomeScreen },
    ],
  },
]);
