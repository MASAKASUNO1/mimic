import DefaultLayout from '@/layouts/DefaultLayout';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Counter() {
  const [inputText, setInputText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Count characters (including spaces)
    setCharCount(inputText.length);
    
    // Count words (split by whitespace)
    const words = inputText.trim().split(/\s+/);
    setWordCount(inputText.trim() === '' ? 0 : words.length);
    
    // Count lines
    const lines = inputText.split('\n');
    setLineCount(inputText === '' ? 0 : lines.length);
  }, [inputText]);

  const handleCopy = async () => {
    try {
      const countInfo = `文字数: ${charCount}\n単語数: ${wordCount}\n行数: ${lineCount}`;
      await navigator.clipboard.writeText(countInfo);
      toast({ title: 'カウント情報をコピーしました', variant: 'success' });
    } catch (error) {
      toast({ title: 'コピーに失敗しました', variant: 'destructive' });
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-4">
        <h2 className="text-3xl font-bold border-l-8 border-l-teal-500 pl-2.5">
          文字数カウンター
        </h2>
        <p className="text-gray-600">
          テキストを入力すると、文字数、単語数、行数を自動的にカウントします。
        </p>
        
        <Textarea
          placeholder="ここにテキストを入力してください"
          rows={8}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">文字数</h3>
            <p className="text-3xl font-bold text-teal-600">{charCount}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">単語数</h3>
            <p className="text-3xl font-bold text-teal-600">{wordCount}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">行数</h3>
            <p className="text-3xl font-bold text-teal-600">{lineCount}</p>
          </div>
        </div>
        
        <Button onClick={handleCopy} size="lg" className="w-full">
          カウント情報をコピー
        </Button>
      </div>
    </DefaultLayout>
  );
}