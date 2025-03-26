import React, { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import HintText from "./HintText";
import { IconProvider } from "./IconProvider";
import { Tag } from "antd";
import { CheckOutlined, CopyOutlined, FullscreenOutlined } from "@ant-design/icons";
import ArtifactRenderer from "./ArtifactRenderer";

export default function AssistantMsg({ content }: { content: string }) {
  const [showMarkdown, setShowMarkdown] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [copyIcon, setCopyIcon] = useState(<CopyOutlined className="h-5" />);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeModalContent, setCodeModalContent] = useState({ code: '', language: '', title: '' });

  // 提取长代码块用于全屏展示
  const hasLongCode = React.useMemo(() => {
    // 检查是否包含超过30行的代码块
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const code = match[2];
      if (code.split('\n').length > 30) {
        return true;
      }
    }
    return false;
  }, [content]);

  const toolsList = [
    {
      name: showMarkdown ? "显示原文" : "显示转义",
      icon: (
        <Tag className="!mr-0 !justify-center !items-center">
          <IconProvider.Code width={16} height={20} fill="#666" />
        </Tag>
      ),
      onClick: () => setShowMarkdown(!showMarkdown),
    },
    {
      name: "复制",
      icon: (
        <Tag className="!mr-0 !justify-center !items-center">
          {copyIcon}
        </Tag>
      ),
      onClick: async () => {
        navigator.clipboard
          .writeText(content)
          .then(() => {
            setCopyIcon(<CheckOutlined className="h-5" />);
            setTimeout(() => {
              setCopyIcon(<CopyOutlined className="h-5" />);
            }, 1000);
          })
          .catch(() => {});
      },
    },
    // 当存在长代码块时，显示"查看完整代码"按钮
    ...hasLongCode ? [{
      name: "查看完整代码",
      icon: (
        <Tag className="!mr-0 !justify-center !items-center">
          <FullscreenOutlined />
        </Tag>
      ),
      onClick: () => {
        // 提取第一个长代码块
        const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
        let match;
        while ((match = codeBlockRegex.exec(content)) !== null) {
          const language = match[1] || 'text';
          const code = match[2];
          if (code.split('\n').length > 30) {
            setCodeModalContent({
              code,
              language,
              title: `完整代码 (${language})`
            });
            setShowCodeModal(true);
            break;
          }
        }
      },
    }] : [],
  ];

  return (
    <div className="w-full">
      <div
        className="flex items-start relative"
        onMouseEnter={() => setShowTools(true)}
        onMouseLeave={() => setShowTools(false)}
      >
        <div className="flex flex-col items-start bg-gradient-to-b from-[#f8f7f5] to-[#f6f6f2] rounded-lg p-2 gap-3 px-3 relative max-w-full border border-white/50">
          <div className="markdown-content border-slate-400 rounded-lg overflow-hidden break-words text-slate-800 w-full">
            {showMarkdown ? (
              <MarkdownRenderer content={content} />
            ) : (
              <pre className="whitespace-pre-wrap">{content}</pre>
            )}
          </div>
          <div
            className={`flex absolute -bottom-7 -right-5 h-30 w-20 transition-opacity duration-100
            ${showTools ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            {toolsList.map((tool) => (
              <HintText hintText={tool.name} more={-60} key={tool.name}>
                <div
                  className="text-sm text-slate-500 hover:text-slate-600 flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={tool.onClick}
                >
                  {tool.icon}
                </div>
              </HintText>
            ))}
          </div>
        </div>
      </div>

      {/* 代码全屏模态框 */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">{codeModalContent.title}</h3>
              <button 
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <ArtifactRenderer
                content={codeModalContent.code}
                language={codeModalContent.language}
                title={codeModalContent.title}
                canPreview={codeModalContent.language === 'html' || codeModalContent.language === 'xml'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
