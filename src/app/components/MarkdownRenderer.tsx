import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Image, Tooltip } from "antd";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import "katex/dist/katex.css";
import { warmCodeTheme, markdownStyles } from "../styles/markdownTheme";
import ArtifactRenderer from "./ArtifactRenderer";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(
  ({ content }) => {
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
      });
    };

    // 处理代码块和artifacts
    const processedContent = React.useMemo(() => {
      let currentContent = content;
      
      // 首先处理显式的artifact标记
      const artifactRegex = /```artifact:([a-zA-Z0-9_-]+):?([^\n]*)\n([\s\S]*?)```/g;
      const artifacts: { id: string; language: string; title: string; content: string; }[] = [];
      let artifactIndex = 0;
      
      // 处理显式的artifacts
      currentContent = currentContent.replace(artifactRegex, (match, language, title, code) => {
        const id = `artifact-${artifactIndex}`;
        artifacts.push({
          id,
          language,
          title: title || `代码片段 ${artifactIndex + 1}`,
          content: code
        });
        artifactIndex++;
        // 返回一个特殊的标记，这个标记会在后面被移除
        return `%%%ARTIFACT_PLACEHOLDER_${id}%%%`;
      });

      // 然后处理普通的代码块，将长代码块转换为artifacts
      const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
      currentContent = currentContent.replace(codeBlockRegex, (match, language, code) => {
        // 如果代码超过30行或超过500个字符，转换为artifact
        const lines = code.split('\n');
        if (lines.length > 30 || code.length > 500) {
          const id = `artifact-${artifactIndex}`;
          artifacts.push({
            id,
            language: language || 'text',
            title: `代码片段 ${artifactIndex + 1}`,
            content: code
          });
          artifactIndex++;
          // 返回一个特殊的标记，这个标记会在后面被移除
          return `%%%ARTIFACT_PLACEHOLDER_${id}%%%`;
        }
        return match; // 保持短代码块不变
      });

      // 移除所有的占位符标记
      currentContent = currentContent.replace(/%%%ARTIFACT_PLACEHOLDER_[^%]+%%%\n?/g, '');

      return { processedContent: currentContent, artifacts };
    }, [content]);

    return (
      <div className="markdown-content box-border w-full max-w-full text-gray-800">
        <ReactMarkdown
          className="p-[0.1rem] leading-relaxed"
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");
              
              // 如果是内联代码或没有语言标记，使用普通渲染
              if (inline || !match) {
                return (
                  <code className={markdownStyles.inlineCode} {...props}>
                    {children}
                  </code>
                );
              }

              // 对于短代码块使用普通渲染
              return (
                <div style={markdownStyles.codeBlock.container}>
                  <div style={markdownStyles.codeBlock.header}>
                    <span style={markdownStyles.codeBlock.languageLabel}>
                      {match[1]}
                    </span>
                    <Tooltip title={copiedText === codeString ? "已复制" : "复制"}>
                      <button
                        onClick={() => copyToClipboard(codeString)}
                        style={markdownStyles.codeBlock.copyButton}
                        className="hover:bg-gray-100"
                      >
                        {copiedText === codeString ? <CheckOutlined /> : <CopyOutlined />}
                      </button>
                    </Tooltip>
                  </div>
                  <SyntaxHighlighter
                    style={warmCodeTheme}
                    language={match[1]}
                    PreTag="div"
                    customStyle={markdownStyles.codeBlock.content}
                    codeTagProps={{
                      style: {
                        fontFamily:
                          'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                      },
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            },
            img: ({ src, alt, title }) => (
              <div className={markdownStyles.image.container}>
                <Image
                  src={src}
                  alt={alt}
                  title={title}
                  className="cursor-pointer"
                  style={markdownStyles.image.style}
                  preview={{
                    mask: <div className={markdownStyles.image.previewMask}>查看大图</div>,
                    maskClassName: "rounded-lg overflow-hidden"
                  }}
                />
              </div>
            ),
            ul({ children }) {
              return <ul className={markdownStyles.list.unordered}>{children}</ul>;
            },
            ol({ children }) {
              return <ol className={markdownStyles.list.ordered}>{children}</ol>;
            },
            p({ children }) {
              return <div className={markdownStyles.paragraph}>{children}</div>;
            },
            h1({ children }) {
              return <h1 className={markdownStyles.headings.h1}>{children}</h1>;
            },
            h2({ children }) {
              return <h2 className={markdownStyles.headings.h2}>{children}</h2>;
            },
            h3({ children }) {
              return <h3 className={markdownStyles.headings.h3}>{children}</h3>;
            },
            h4({ children }) {
              return <h4 className={markdownStyles.headings.h4}>{children}</h4>;
            },
            a({ children, href }) {
              return <a href={href} className={markdownStyles.link} target="_blank" rel="noopener noreferrer">{children}</a>;
            },
            blockquote({ children }) {
              return <blockquote className={markdownStyles.blockquote}>{children}</blockquote>;
            },
            hr() {
              return <hr className={markdownStyles.hr} />;
            },
            table({ children }) {
              return (
                <div className={markdownStyles.table.container}>
                  <table className={markdownStyles.table.table}>
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className={markdownStyles.table.thead}>{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className={markdownStyles.table.tbody}>{children}</tbody>;
            },
            tr({ children }) {
              return (
                <tr className={markdownStyles.table.row}>
                  {children}
                </tr>
              );
            },
            th({ children }) {
              return (
                <th className={markdownStyles.table.th}>
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className={markdownStyles.table.td}>{children}</td>
              );
            },
            li({ children }) {
              return <li className={markdownStyles.list.item}>{children}</li>;
            },
          }}
        >
          {processedContent.processedContent}
        </ReactMarkdown>
        
        {/* 渲染所有 artifacts */}
        {processedContent.artifacts.map((artifact) => (
          <div key={artifact.id} className="mt-4">
            <ArtifactRenderer
              content={artifact.content}
              language={artifact.language}
              title={artifact.title}
              canPreview={artifact.language === 'html' || artifact.language === 'xml'}
            />
          </div>
        ))}
      </div>
    );
  }
);

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;
