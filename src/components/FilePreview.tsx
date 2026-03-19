import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import type { GeneratedFile } from '../templates';

interface FilePreviewProps {
  files: GeneratedFile[];
  projectName: string;
}

export function FilePreview({ files, projectName }: FilePreviewProps) {
  const [selectedFile, setSelectedFile] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(files[selectedFile].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [files, selectedFile]);

  const handleDownloadZip = useCallback(async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.path, file.content);
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName || 'devscaffold'}-config.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, [files, projectName]);

  const currentFile = files[selectedFile];

  return (
    <div className="file-preview">
      <div className="file-tree">
        <div className="file-tree-header">Files</div>
        {files.map((file, i) => (
          <button
            key={file.path}
            className={`file-tree-item ${i === selectedFile ? 'active' : ''}`}
            onClick={() => { setSelectedFile(i); setCopied(false); }}
            type="button"
          >
            <span className="file-icon">{file.path.endsWith('.sh') ? '\u{1F4DC}' : '\u{1F4C4}'}</span>
            {file.path}
          </button>
        ))}
      </div>
      <div className="file-content-area">
        <div className="file-content-header">
          <span className="file-path">{currentFile.path}</span>
          <button className="copy-btn" onClick={handleCopy} type="button">
            {copied ? '\u2713 Copied' : '\u{1F4CB} Copy'}
          </button>
        </div>
        <pre className="file-content"><code>{currentFile.content}</code></pre>
      </div>
      <div className="download-section">
        <button
          className="download-btn"
          onClick={handleDownloadZip}
          disabled={downloading}
          type="button"
        >
          {downloading ? 'Generating...' : '\u2B07 Download ZIP'}
        </button>
        <span className="file-count">{files.length} file{files.length !== 1 ? 's' : ''} ready</span>
      </div>
    </div>
  );
}
