import { grainConfig } from '../../config/grain.config';

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
        <p className="eyebrow">{grainConfig.header.eyebrow}</p>
        <h1>{grainConfig.header.title}</h1>
        <p className="subtitle">{grainConfig.header.subtitle}</p>
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
