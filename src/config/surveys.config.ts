export const surveyRecommendations = [
  {
    name: 'Activation check-in',
    event: 'app_loaded',
    condition: 'Show after a user returns for a second session',
    question: 'What are you hoping to use Grain for?',
    type: 'multiple_choice',
  },
  {
    name: 'Session satisfaction',
    event: 'markdown_exported',
    condition: 'Show after export, sampled to avoid over-asking',
    question: 'How did this writing session feel?',
    type: 'rating',
  },
  {
    name: 'Roadmap priority',
    event: 'focus_mode_toggled',
    condition: 'Show to engaged users after multiple preference changes',
    question: 'What should Grain improve next?',
    type: 'single_choice',
  },
] as const;
