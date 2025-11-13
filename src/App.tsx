import { useState } from 'react';
import { SlideEditor } from './components/SlideEditor';
import { CodePreview } from './components/CodePreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';

export interface SlideData {
  title: string;
  subtitle: string;
  content: string[];
  backgroundColor: string;
  titleColor: string;
  contentColor: string;
}

export default function App() {
  const [slideData, setSlideData] = useState<SlideData>({
    title: 'Your Presentation Title',
    subtitle: 'Subtitle goes here',
    content: [
      'First bullet point',
      'Second bullet point',
      'Third bullet point'
    ],
    backgroundColor: '#ffffff',
    titleColor: '#1a1a1a',
    contentColor: '#4a4a4a'
  });

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-gray-900">PowerPoint Slide Generator</h1>
          <p className="text-gray-600 text-sm">Design your slide visually and get the code instantly</p>
        </header>
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50} minSize={30}>
            <SlideEditor slideData={slideData} setSlideData={setSlideData} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <CodePreview slideData={slideData} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
