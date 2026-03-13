type WorkspaceHeaderProps = {
  title: string;
  wordCount: number;
  readMinutes: number;
  saveLabel: string;
};

export function WorkspaceHeader({ title, wordCount, readMinutes, saveLabel }: WorkspaceHeaderProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Foundation build</p>
        <h1>Write with flow. Shape the workspace.</h1>
        <p className="subtitle">
          A focused markdown workspace with live preview, saved preferences, and a visual system that already
          feels like a product instead of a scaffold.
        </p>
      </div>

      <div className="meta-row">
        <div className="pill pill-title">{title}</div>
        <div className="pill">{wordCount} words</div>
        <div className="pill">{readMinutes} min read</div>
        <div className="pill">{saveLabel}</div>
      </div>
    </header>
  );
}
