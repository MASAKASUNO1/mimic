import DefaultLayout from '@/layouts/DefaultLayout';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type ConversionType = 
  | 'uppercase' 
  | 'lowercase' 
  | 'capitalize' 
  | 'reverse'
  | 'removeSpaces'
  | 'removeLineBreaks'
  | 'addLineNumbers';

export default function Converter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const convertText = (type: ConversionType) => {
    let result = '';
    
    switch (type) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'capitalize':
        result = inputText
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'reverse':
        result = inputText.split('').reverse().join('');
        break;
      case 'removeSpaces':
        result = inputText.replace(/\s+/g, '');
        break;
      case 'removeLineBreaks':
        result = inputText.replace(/\n/g, ' ');
        break;
      case 'addLineNumbers':
        result = inputText
          .split('\n')
          .map((line, index) => `${index + 1}: ${line}`)
          .join('\n');
        break;
      default:
        result = inputText;
    }
    
    setOutputText(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({ title: '変換されたテキストをコピーしました', variant: 'success' });
    } catch (error) {
      toast({ title: 'コピーに失敗しました', variant: 'destructive' });
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-4">
        <h2 className="text-3xl font-bold border-l-8 border-l-teal-500 pl-2.5">
          一括文字変換
        </h2>
        <p className="text-gray-600">
          テキストを入力し、変換タイプを選択して一括で文字を変換します。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">入力テキスト</h3>
            <Textarea
              placeholder="ここにテキストを入力してください"
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">出力テキスト</h3>
            <Textarea
              placeholder="変換されたテキストがここに表示されます"
              rows={10}
              value={outputText}
              readOnly
              className="font-mono bg-gray-50"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button onClick={() => convertText('uppercase')} variant="outline">大文字に変換</Button>
          <Button onClick={() => convertText('lowercase')} variant="outline">小文字に変換</Button>
          <Button onClick={() => convertText('capitalize')} variant="outline">先頭大文字に変換</Button>
          <Button onClick={() => convertText('reverse')} variant="outline">文字を反転</Button>
          <Button onClick={() => convertText('removeSpaces')} variant="outline">空白を削除</Button>
          <Button onClick={() => convertText('removeLineBreaks')} variant="outline">改行を削除</Button>
          <Button onClick={() => convertText('addLineNumbers')} variant="outline">行番号を追加</Button>
        </div>
        
        <Button onClick={handleCopy} size="lg" className="w-full" disabled={!outputText}>
          変換されたテキストをコピー
        </Button>
      </div>
    </DefaultLayout>
  );
}