import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, Check } from 'lucide-react';
import { SlideData } from '../App';
import { ScrollArea } from './ui/scroll-area';

interface CodePreviewProps {
  slideData: SlideData;
}

export function CodePreview({ slideData }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const generatePptxGenJSCode = () => {
    const contentItems = slideData.content
      .map(item => `      { text: "${item.replace(/"/g, '\\"')}", options: { bullet: true, color: "${slideData.contentColor}" } }`)
      .join(',\n');

    return `import pptxgen from "pptxgenjs";

// Create a new presentation
const pptx = new pptxgen();

// Add a slide
const slide = pptx.addSlide();

// Set slide background
slide.background = { color: "${slideData.backgroundColor}" };

// Add title
slide.addText("${slideData.title.replace(/"/g, '\\"')}", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 1,
  fontSize: 44,
  color: "${slideData.titleColor}",
  bold: true,
  align: "center"
});

// Add subtitle
slide.addText("${slideData.subtitle.replace(/"/g, '\\"')}", {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 0.5,
  fontSize: 20,
  color: "${slideData.titleColor}",
  align: "center"
});

// Add bullet points
slide.addText([
${contentItems}
], {
  x: 1,
  y: 2.5,
  w: 8,
  h: 3,
  fontSize: 18,
  color: "${slideData.contentColor}"
});

// Save the presentation
pptx.writeFile({ fileName: "presentation.pptx" });`;
  };

  const generateReactCode = () => {
    const contentItems = slideData.content
      .map(item => `        <li className="flex items-start gap-2">
          <span>•</span>
          <span>${item.replace(/</g, '<').replace(/>/g, '>')}</span>
        </li>`)
      .join('\n');

    return `import React from 'react';

interface SlideProps {
  title: string;
  subtitle: string;
  content: string[];
  backgroundColor: string;
  titleColor: string;
  contentColor: string;
}

export function Slide({ 
  title, 
  subtitle, 
  content, 
  backgroundColor, 
  titleColor, 
  contentColor 
}: SlideProps) {
  return (
    <div 
      className="w-full aspect-[16/9] rounded-lg shadow-lg p-8 flex flex-col justify-center"
      style={{ backgroundColor }}
    >
      <h1 className="mb-2 text-center" style={{ color: titleColor }}>
        {title}
      </h1>
      <p className="text-center mb-8 opacity-80" style={{ color: titleColor }}>
        {subtitle}
      </p>
      <ul className="space-y-3 max-w-2xl mx-auto" style={{ color: contentColor }}>
        {content.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Usage:
export default function App() {
  return (
    <Slide
      title="${slideData.title.replace(/"/g, '\\"')}"
      subtitle="${slideData.subtitle.replace(/"/g, '\\"')}"
      content={${JSON.stringify(slideData.content, null, 8)}}
      backgroundColor="${slideData.backgroundColor}"
      titleColor="${slideData.titleColor}"
      contentColor="${slideData.contentColor}"
    />
  );
}`;
  };

  const generateTypeScriptInterface = () => {
    return `// TypeScript Interface
export interface SlideData {
  title: string;
  subtitle: string;
  content: string[];
  backgroundColor: string;
  titleColor: string;
  contentColor: string;
}

// Current Slide Data
export const slideData: SlideData = ${JSON.stringify(slideData, null, 2)};`;
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const pptxCode = generatePptxGenJSCode();
  const reactCode = generateReactCode();
  const tsInterface = generateTypeScriptInterface();

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="border-b border-gray-700 px-6 py-4">
        <h2 className="text-white">Generated Code</h2>
      </div>

      <Tabs defaultValue="pptxgen" className="flex-1 flex flex-col">
        <TabsList className="mx-6 mt-4 w-fit bg-gray-800">
          <TabsTrigger value="pptxgen">PptxGenJS</TabsTrigger>
          <TabsTrigger value="react">React Component</TabsTrigger>
          <TabsTrigger value="typescript">TypeScript Data</TabsTrigger>
        </TabsList>

        <div className="flex-1 relative">
          <TabsContent value="pptxgen" className="h-full m-0 p-0">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex justify-between items-center px-6 py-2 bg-gray-800">
                <span className="text-gray-400 text-sm">JavaScript (PptxGenJS)</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(pptxCode)}
                  className="text-gray-300 hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <pre className="p-6 text-sm text-gray-100 font-mono">
                  <code>{pptxCode}</code>
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="react" className="h-full m-0 p-0">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex justify-between items-center px-6 py-2 bg-gray-800">
                <span className="text-gray-400 text-sm">TypeScript React</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(reactCode)}
                  className="text-gray-300 hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <pre className="p-6 text-sm text-gray-100 font-mono">
                  <code>{reactCode}</code>
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="typescript" className="h-full m-0 p-0">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex justify-between items-center px-6 py-2 bg-gray-800">
                <span className="text-gray-400 text-sm">TypeScript Interface & Data</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(tsInterface)}
                  className="text-gray-300 hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <pre className="p-6 text-sm text-gray-100 font-mono">
                  <code>{tsInterface}</code>
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
