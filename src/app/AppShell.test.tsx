import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

vi.mock('../components/editor/EditorPane', () => ({
  EditorPane: ({ content, onChange }: { content: string; onChange: (value: string) => void }) => (
    <section className="panel">
      <h2>Editor</h2>
      <textarea
        aria-label="Grain editor"
        data-testid="codemirror-mock"
        value={content}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  ),
}));

vi.mock('../components/preview/PreviewPane', () => ({
  PreviewPane: ({ content }: { content: string }) => (
    <section className="panel">
      <h2>Preview</h2>
      <div>{content}</div>
    </section>
  ),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
  },
}));

describe('AppShell workflows', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('switches to preview mode and persists workspace choices', async () => {
    render(<App />);

    await screen.findByLabelText('Grain editor');

    await act(async () => {
      fireEvent.click(screen.getByRole('radio', { name: /preview only/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Spruce' }));
      fireEvent.change(screen.getByRole('combobox', { name: 'Scale' }), { target: { value: 'presentation' } });
    });

    await waitFor(() => {
      expect(screen.queryByLabelText('Grain editor')).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Preview' })).toBeInTheDocument();
    });

    expect(window.localStorage.getItem('grain.workspace.layout')).toBe('preview');
    expect(window.localStorage.getItem('grain.workspace.theme')).toBe('spruce');
    expect(window.localStorage.getItem('grain.workspace.font-scale')).toBe('presentation');
  });

  it('autosaves edited content', async () => {
    render(<App />);

    const editor = screen.getByLabelText('Grain editor');

    fireEvent.change(editor, {
      target: { value: '# New title\n\nFresh draft' },
    });

    await waitFor(() => {
      expect(window.localStorage.getItem('grain.document.content')).toBe('# New title\n\nFresh draft');
    }, { timeout: 1000 });
  });

  it('toggles focus mode and persists the preference', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Focus' }));

    await waitFor(() => {
      expect(screen.queryByText('Write with flow. Shape the workspace.')).not.toBeInTheDocument();
    });

    expect(window.localStorage.getItem('grain.workspace.focus-mode')).toBe('on');
  });
});
