import DefaultLayout from '@/layouts/DefaultLayout';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function WebpConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<{ original: string; webp: string; size: { original: number; webp: number } }[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type === 'image/jpeg' || 
        file.type === 'image/png' || 
        file.type === 'image/jpg'
      );
      
      if (droppedFiles.length !== e.dataTransfer.files.length) {
        toast({ 
          title: '一部のファイルがスキップされました', 
          description: 'JPG/PNG形式のファイルのみ変換できます',
          variant: 'destructive' 
        });
      }
      
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => 
        file.type === 'image/jpeg' || 
        file.type === 'image/png' || 
        file.type === 'image/jpg'
      );
      
      if (selectedFiles.length !== Array.from(e.target.files).length) {
        toast({ 
          title: '一部のファイルがスキップされました', 
          description: 'JPG/PNG形式のファイルのみ変換できます',
          variant: 'destructive' 
        });
      }
      
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const convertToWebP = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    const results = [];
    
    try {
      for (const file of files) {
        // Create an image element to load the file
        const img = new Image();
        const originalUrl = URL.createObjectURL(file);
        
        // Wait for the image to load
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = originalUrl;
        });
        
        // Create a canvas and draw the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        
        // Convert to WebP
        const webpUrl = canvas.toDataURL('image/webp', 0.8);
        
        // Get file sizes
        const originalSize = file.size;
        
        // Convert base64 to blob to get WebP size
        const fetchWebp = await fetch(webpUrl);
        const webpBlob = await fetchWebp.blob();
        const webpSize = webpBlob.size;
        
        results.push({
          original: originalUrl,
          webp: webpUrl,
          size: {
            original: originalSize,
            webp: webpSize
          }
        });
      }
      
      setConvertedFiles(results);
      toast({ title: '変換が完了しました', variant: 'success' });
    } catch (error) {
      toast({ 
        title: '変換中にエラーが発生しました', 
        description: error instanceof Error ? error.message : '不明なエラー',
        variant: 'destructive' 
      });
    } finally {
      setIsConverting(false);
    }
  };

  const downloadWebP = (webpUrl: string, originalFileName: string) => {
    const link = document.createElement('a');
    link.href = webpUrl;
    link.download = originalFileName.replace(/\.(jpe?g|png)$/i, '.webp');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setFiles([]);
    setConvertedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const calculateSavings = (original: number, webp: number) => {
    const savings = original - webp;
    const percentage = ((savings / original) * 100).toFixed(1);
    return `${percentage}% 削減 (${formatFileSize(savings)})`;
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-4">
        <h2 className="text-3xl font-bold border-l-8 border-l-teal-500 pl-2.5">
          JPG/PNG to WebP 変換
        </h2>
        <p className="text-gray-600">
          JPGまたはPNG画像をWebP形式に変換して、ファイルサイズを削減します。
        </p>
        
        <div 
          className={`border-2 border-dashed ${isDragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300'} rounded-lg p-8 text-center transition-colors`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="space-y-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <h3 className="text-lg font-medium">画像をドラッグ＆ドロップするか、クリックして選択</h3>
            <p className="text-sm text-gray-500">JPG, JPEG, PNG形式のみサポートしています</p>
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="outline"
              className="mt-2"
            >
              ファイルを選択
            </Button>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">選択されたファイル ({files.length})</h3>
              <div className="space-x-2">
                <Button 
                  onClick={convertToWebP} 
                  disabled={isConverting || files.length === 0}
                >
                  {isConverting ? '変換中...' : 'WebPに変換'}
                </Button>
                <Button 
                  onClick={clearAll} 
                  variant="outline"
                >
                  クリア
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {convertedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">変換結果</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {convertedFiles.map((file, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="p-2 border-r">
                      <p className="text-xs font-medium text-center mb-1">元画像</p>
                      <div className="aspect-square flex items-center justify-center bg-gray-100">
                        <img 
                          src={file.original} 
                          alt="Original" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-xs text-center mt-1">{formatFileSize(file.size.original)}</p>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-center mb-1">WebP</p>
                      <div className="aspect-square flex items-center justify-center bg-gray-100">
                        <img 
                          src={file.webp} 
                          alt="WebP" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-xs text-center mt-1">{formatFileSize(file.size.webp)}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600">
                        {calculateSavings(file.size.original, file.size.webp)}
                      </p>
                      <Button 
                        onClick={() => downloadWebP(file.webp, files[index].name)}
                        size="sm"
                      >
                        ダウンロード
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}