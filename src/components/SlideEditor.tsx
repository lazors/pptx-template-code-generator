import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { SlideData } from '../App';
import { ScrollArea } from './ui/scroll-area';

interface SlideEditorProps {
  slideData: SlideData;
  setSlideData: (data: SlideData) => void;
}

export function SlideEditor({ slideData, setSlideData }: SlideEditorProps) {
  const updateTitle = (title: string) => {
    setSlideData({ ...slideData, title });
  };

  const updateSubtitle = (subtitle: string) => {
    setSlideData({ ...slideData, subtitle });
  };

  const updateContent = (index: number, value: string) => {
    const newContent = [...slideData.content];
    newContent[index] = value;
    setSlideData({ ...slideData, content: newContent });
  };

  const addContentItem = () => {
    setSlideData({ 
      ...slideData, 
      content: [...slideData.content, 'New bullet point'] 
    });
  };

  const removeContentItem = (index: number) => {
    const newContent = slideData.content.filter((_, i) => i !== index);
    setSlideData({ ...slideData, content: newContent });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Slide Preview */}
          <div className="space-y-2">
            <Label>Slide Preview</Label>
            <div 
              className="w-full aspect-[16/9] rounded-lg shadow-lg p-8 flex flex-col justify-center"
              style={{ backgroundColor: slideData.backgroundColor }}
            >
              <h1 
                className="mb-2 text-center"
                style={{ color: slideData.titleColor }}
              >
                {slideData.title}
              </h1>
              <p 
                className="text-center mb-8 opacity-80"
                style={{ color: slideData.titleColor }}
              >
                {slideData.subtitle}
              </p>
              <ul className="space-y-3 max-w-2xl mx-auto">
                {slideData.content.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-2"
                    style={{ color: slideData.contentColor }}
                  >
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Editor Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={slideData.title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Enter slide title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={slideData.subtitle}
                onChange={(e) => updateSubtitle(e.target.value)}
                placeholder="Enter slide subtitle"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Content Bullets</Label>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addContentItem}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Bullet
                </Button>
              </div>
              <div className="space-y-2">
                {slideData.content.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={item}
                      onChange={(e) => updateContent(index, e.target.value)}
                      placeholder={`Bullet point ${index + 1}`}
                      rows={2}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeContentItem(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bgColor">Background</Label>
                <div className="flex gap-2">
                  <input
                    id="bgColor"
                    type="color"
                    value={slideData.backgroundColor}
                    onChange={(e) => setSlideData({ ...slideData, backgroundColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={slideData.backgroundColor}
                    onChange={(e) => setSlideData({ ...slideData, backgroundColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleColor">Title Color</Label>
                <div className="flex gap-2">
                  <input
                    id="titleColor"
                    type="color"
                    value={slideData.titleColor}
                    onChange={(e) => setSlideData({ ...slideData, titleColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={slideData.titleColor}
                    onChange={(e) => setSlideData({ ...slideData, titleColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentColor">Content Color</Label>
                <div className="flex gap-2">
                  <input
                    id="contentColor"
                    type="color"
                    value={slideData.contentColor}
                    onChange={(e) => setSlideData({ ...slideData, contentColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={slideData.contentColor}
                    onChange={(e) => setSlideData({ ...slideData, contentColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
