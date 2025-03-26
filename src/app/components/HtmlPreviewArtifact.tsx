import React, { useRef, useEffect } from 'react';

interface HtmlPreviewArtifactProps {
  htmlContent: string;
}

const HtmlPreviewArtifact: React.FC<HtmlPreviewArtifactProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      // 设置iframe内容
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDocument) {
        // 写入HTML内容
        iframeDocument.open();
        iframeDocument.write(htmlContent);
        iframeDocument.close();
        
        // 动态调整iframe高度
        const resizeObserver = new ResizeObserver(() => {
          if (iframeDocument.body) {
            const height = iframeDocument.body.scrollHeight;
            iframe.style.height = `${Math.min(height, 500)}px`;
          }
        });
        
        if (iframeDocument.body) {
          resizeObserver.observe(iframeDocument.body);
        }
        
        return () => {
          if (iframeDocument.body) {
            resizeObserver.unobserve(iframeDocument.body);
          }
        };
      }
    }
  }, [htmlContent]);

  return (
    <div className="html-preview-container border rounded p-2 bg-white">
      <iframe 
        ref={iframeRef}
        className="w-full border-0"
        style={{ minHeight: '200px', backgroundColor: 'white' }}
        title="HTML Preview"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default HtmlPreviewArtifact; 