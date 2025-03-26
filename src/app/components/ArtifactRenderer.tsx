import React, { useState, useRef, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { markdownStyles } from '../styles/markdownTheme';
import { CheckOutlined, CopyOutlined, EyeOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import HtmlPreviewArtifact from './HtmlPreviewArtifact';

interface ArtifactRendererProps {
  content: string;
  language: string;
  title?: string;
  canPreview?: boolean;
}

const ArtifactRenderer: React.FC<ArtifactRendererProps> = ({ 
  content, 
  language, 
  title = '代码片段',
  canPreview = false 
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(800); // 默认宽度
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  const togglePreview = () => {
    setIsAnimating(true);
    setShowPreview(!showPreview);
  };

  const handleAnimationEnd = () => {
    if (!showPreview) {
      setIsAnimating(false);
    }
  };

  // 开始拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = previewWidth;
    
    // 添加全局鼠标事件监听
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // 改变鼠标样式
    document.body.style.cursor = 'col-resize';
    // 防止文本选择
    document.body.style.userSelect = 'none';
  }, [previewWidth]);

  // 处理拖拽
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    
    const delta = e.clientX - startX.current;
    const newWidth = Math.max(400, Math.min(1600, startWidth.current + delta));
    setPreviewWidth(newWidth);
  }, []);

  // 结束拖拽
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    
    // 移除全局事件监听
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // 恢复鼠标样式
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // 检查是否支持预览
  const isPreviewable = canPreview && (language === 'html' || language === 'xml');

  return (
    <div className="relative">
      <div style={markdownStyles.artifact.container}>
        <div style={markdownStyles.artifact.header}>
          <span style={markdownStyles.artifact.title}>
            {title} ({language})
          </span>
          <div className="flex items-center gap-2">
            {isPreviewable && (
              <Tooltip title={showPreview ? "关闭预览" : "预览"}>
                <button
                  onClick={togglePreview}
                  style={markdownStyles.artifact.previewButton}
                  className={`hover:bg-gray-100 transition-colors duration-200
                    ${showPreview ? 'text-blue-500' : ''}`}
                >
                  <EyeOutlined />
                </button>
              </Tooltip>
            )}
            <Tooltip title={copiedText ? "已复制" : "复制"}>
              <button
                onClick={() => copyToClipboard(content)}
                style={markdownStyles.artifact.previewButton}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                {copiedText ? <CheckOutlined /> : <CopyOutlined />}
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          <SyntaxHighlighter
            style={vs}
            language={language}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: "1em",
              backgroundColor: "#f8fafc",
              fontSize: "14px",
              borderRadius: "0",
              maxHeight: "400px",
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* 全屏预览模态框 */}
      {(showPreview || isAnimating) && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4
            transition-all duration-300 ease-in-out
            ${showPreview 
              ? 'bg-black bg-opacity-50' 
              : 'bg-black bg-opacity-0 pointer-events-none'}`}
          onTransitionEnd={handleAnimationEnd}
        >
          <div 
            className={`bg-white rounded-lg flex flex-col
              transition-all duration-300 ease-in-out transform
              ${showPreview 
                ? 'scale-100 opacity-100 translate-y-0' 
                : 'scale-95 opacity-0 translate-y-4'}`}
            style={{ 
              width: `${previewWidth}px`, 
              maxWidth: '95vw', 
              maxHeight: '90vh',
              transitionProperty: 'transform, opacity, translate',
            }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">预览: {title}</h3>
              <div className="flex items-center gap-2">
                <Tooltip title="拖拽调整宽度">
                  <div 
                    className="text-gray-400 cursor-col-resize px-2 hover:text-gray-600 transition-colors duration-200"
                    onMouseDown={handleMouseDown}
                  >
                    <ColumnWidthOutlined />
                  </div>
                </Tooltip>
                <button 
                  onClick={togglePreview}
                  className="text-gray-400 hover:text-gray-600 p-2 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <HtmlPreviewArtifact htmlContent={content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtifactRenderer; 