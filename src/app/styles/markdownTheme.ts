// 自定义浅色调代码高亮主题
export const warmCodeTheme = {
  'code[class*="language-"]': {
    color: '#2d3748',
    background: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#2d3748',
    background: '#f8fafc',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
    overflow: 'auto',
    padding: '1em',
    margin: '0.5em 0',
    borderRadius: '0.3em',
  },
  'comment': {
    color: '#718096',
    fontStyle: 'italic',
  },
  'prolog': {
    color: '#718096',
    fontStyle: 'italic',
  },
  'doctype': {
    color: '#718096',
    fontStyle: 'italic',
  },
  'cdata': {
    color: '#718096',
    fontStyle: 'italic',
  },
  'punctuation': {
    color: '#4a5568',
  },
  'property': {
    color: '#805ad5',
  },
  'tag': {
    color: '#3182ce',
  },
  'boolean': {
    color: '#dd6b20',
  },
  'number': {
    color: '#dd6b20',
  },
  'constant': {
    color: '#805ad5',
  },
  'symbol': {
    color: '#805ad5',
  },
  'selector': {
    color: '#3182ce',
  },
  'attr-name': {
    color: '#3182ce',
  },
  'string': {
    color: '#38a169',
  },
  'char': {
    color: '#38a169',
  },
  'builtin': {
    color: '#dd6b20',
  },
  'operator': {
    color: '#4a5568',
  },
  'entity': {
    color: '#3182ce',
    cursor: 'help',
  },
  'url': {
    color: '#38a169',
  },
  'variable': {
    color: '#e53e3e',
  },
  'atrule': {
    color: '#805ad5',
  },
  'attr-value': {
    color: '#38a169',
  },
  'function': {
    color: '#dd6b20',
  },
  'class-name': {
    color: '#805ad5',
  },
  'keyword': {
    color: '#3182ce',
  },
  'regex': {
    color: '#38a169',
  },
  'important': {
    color: '#e53e3e',
    fontWeight: 'bold',
  },
  'bold': {
    fontWeight: 'bold',
  },
  'italic': {
    fontStyle: 'italic',
  },
};

// CSS类型定义
type CSSProperties = React.CSSProperties;

// Markdown 组件样式配置
export const markdownStyles = {
  codeBlock: {
    container: {
      position: "relative" as const,
      marginBottom: "1.5em",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.06)"
    } as CSSProperties,
    header: {
      backgroundColor: "#f0eee6",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    } as CSSProperties,
    languageLabel: {
      color: "#3d3d3a",
      fontSize: "13px",
      fontWeight: "500"
    } as CSSProperties,
    copyButton: {
      backgroundColor: "transparent",
      color: "#86847c",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      borderRadius: "4px",
      transition: "background 0.2s",
    } as CSSProperties,
    content: {
      margin: 0,
      borderRadius: 0,
      padding: "1.2em",
      fontSize: "14px",
      backgroundColor: "#f8fafc",
      overflowX: "auto",
    } as CSSProperties
  },
  inlineCode: "bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md font-mono text-sm",
  image: {
    container: "my-4",
    style: {
      maxWidth: "100%",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      maxHeight: "500px",
      objectFit: "contain" as const,
    } as CSSProperties,
    previewMask: "text-sm font-medium"
  },
  list: {
    unordered: "list-disc pl-6 my-4 space-y-2",
    ordered: "list-decimal pl-6 my-4 space-y-2",
    item: "mb-1"
  },
  paragraph: "my-3 text-base",
  headings: {
    h1: "text-2xl font-bold my-4 pb-1 border-b border-gray-200",
    h2: "text-xl font-bold my-3 pb-1 border-b border-gray-200",
    h3: "text-lg font-bold my-3 text-gray-700",
    h4: "text-base font-bold my-2 text-gray-600"
  },
  link: "text-blue-600 hover:text-blue-400",
  blockquote: "border-l-4 border-gray-300 pl-4 py-1 my-4 bg-gray-50 rounded-r-md italic",
  hr: "my-6 border-gray-200",
  table: {
    container: "my-4 overflow-x-auto",
    table: "min-w-full border-collapse rounded-lg overflow-hidden shadow-sm",
    thead: "bg-gray-50",
    tbody: "divide-y divide-gray-200",
    row: "hover:bg-gray-50 transition-colors",
    th: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200",
    td: "px-6 py-4 whitespace-nowrap text-sm text-gray-700"
  },
  artifact: {
    container: {
      marginTop: "0.5em",
      marginBottom: "1.5em",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid #eaeaea",
      backgroundColor: "#f9f9f9"
    } as CSSProperties,
    header: {
      backgroundColor: "#f0eee6",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #eaeaea"
    } as CSSProperties,
    title: {
      color: "#3d3d3a",
      fontSize: "14px",
      fontWeight: "500"
    } as CSSProperties,
    previewButton: {
      backgroundColor: "transparent",
      color: "#86847c",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      borderRadius: "4px",
      transition: "background 0.2s",
      padding: "4px 8px"
    } as CSSProperties,
    content: {
      maxHeight: "400px",
      overflowY: "auto",
      padding: "12px"
    } as CSSProperties,
    previewContainer: {
      border: "1px solid #eaeaea",
      borderRadius: "4px",
      padding: "12px",
      margin: "12px",
      backgroundColor: "#ffffff"
    } as CSSProperties
  }
}; 