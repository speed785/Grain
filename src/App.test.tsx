import { render, screen } from '@testing-library/react';
import type { HTMLAttributes } from 'react';
import App from './App';

vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value }: { value: string }) => <div data-testid="codemirror-mock">{value}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: HTMLAttributes<HTMLElement>) => <section {...props}>{children}</section>,
  },
}));

describe('App', () => {
  it('renders the editor shell and starter content', async () => {
    render(<App />);

    expect(screen.getByText('Write with flow. Shape the workspace.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(await screen.findByText(/grain, but with taste/i)).toBeInTheDocument();
  });
});
