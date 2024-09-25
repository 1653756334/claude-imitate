import { CheckOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  return (
    <div className="markdown-content box-border w-full">
      <ReactMarkdown
        className="p-[0.1rem]"
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <div style={{ position: "relative", marginBottom: "1em" }}>
                <div
                  style={{
                    backgroundColor: "#2d2d2d",
                    padding: "8px",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#e6e6e6", fontSize: "12px" }}>
                    {match[1]}
                  </span>
                  <button
                    onClick={() => copyToClipboard(codeString)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#e6e6e6",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {copiedText === codeString ? <CheckOutlined /> : "复制"}
                  </button>
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    padding: "1em",
                    fontSize: "14px",
                    backgroundColor: "#1E1E1E",
                  }}
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
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 my-4">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-4">{children}</ol>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
