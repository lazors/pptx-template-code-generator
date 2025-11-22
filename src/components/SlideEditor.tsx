import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { SlideData, Shape } from '../App';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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

  const addShape = () => {
    const newShape: Shape = {
      id: crypto.randomUUID(),
      type: 'rect',
      x: 1,
      y: 1,
      w: 2,
      h: 2,
      color: '#3b82f6'
    };
    setSlideData({
      ...slideData,
      shapes: [...slideData.shapes, newShape]
    });
  };

  const updateShape = (id: string, field: keyof Shape, value: string | number) => {
    const newShapes = slideData.shapes.map(shape => {
      if (shape.id === id) {
        return { ...shape, [field]: value };
      }
      return shape;
    });
    setSlideData({ ...slideData, shapes: newShapes });
  };

  const removeShape = (id: string) => {
    const newShapes = slideData.shapes.filter(shape => shape.id !== id);
    setSlideData({ ...slideData, shapes: newShapes });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Slide Preview */}
          <div className="space-y-2">
            <Label>Slide Preview</Label>
            <div 
              className="w-full aspect-[16/9] rounded-lg shadow-lg p-8 flex flex-col justify-center relative overflow-hidden"
              style={{ backgroundColor: slideData.backgroundColor }}
            >
              {/* Shapes Layer */}
              {slideData.shapes.map(shape => (
                <div
                  key={shape.id}
                  className="absolute"
                  style={{
                    left: `${(shape.x / 10) * 100}%`,
                    top: `${(shape.y / 5.625) * 100}%`,
                    width: `${(shape.w / 10) * 100}%`,
                    height: `${(shape.h / 5.625) * 100}%`,
                    backgroundColor: shape.color,
                    borderRadius: shape.type === 'ellipse' ? '50%' : '0'
                  }}
                />
              ))}

              {/* Content Layer */}
              <div className="relative z-10">
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
          </div>

          {/* Editor Controls */}
          <div className="space-y-4">
            {/* ... existing controls ... */}
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

            {/* Shapes Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Shapes</Label>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addShape}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Shape
                </Button>
              </div>
              <div className="space-y-4">
                {slideData.shapes.map((shape, index) => (
                  <div key={shape.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shape {index + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeShape(shape.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={shape.type}
                          onValueChange={(value) => updateShape(shape.id, 'type', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rect">Rectangle</SelectItem>
                            <SelectItem value="ellipse">Ellipse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Color</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={shape.color}
                            onChange={(e) => updateShape(shape.id, 'color', e.target.value)}
                            className="w-8 h-8 rounded border cursor-pointer"
                          />
                          <Input
                            value={shape.color}
                            onChange={(e) => updateShape(shape.id, 'color', e.target.value)}
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">X (in)</Label>
                        <Input
                          type="number"
                          value={shape.x}
                          onChange={(e) => updateShape(shape.id, 'x', Number(e.target.value))}
                          className="h-8"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Y (in)</Label>
                        <Input
                          type="number"
                          value={shape.y}
                          onChange={(e) => updateShape(shape.id, 'y', Number(e.target.value))}
                          className="h-8"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">W (in)</Label>
                        <Input
                          type="number"
                          value={shape.w}
                          onChange={(e) => updateShape(shape.id, 'w', Number(e.target.value))}
                          className="h-8"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">H (in)</Label>
                        <Input
                          type="number"
                          value={shape.h}
                          onChange={(e) => updateShape(shape.id, 'h', Number(e.target.value))}
                          className="h-8"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* ... existing color controls ... */}
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
