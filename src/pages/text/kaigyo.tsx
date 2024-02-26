import DefaultLayout from '@/layouts/DefaultLayout';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface Props {}

export default function Kaigyo({}: Props) {
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  const clickHandler = async () => {
    try {
      await navigator.clipboard.writeText(formatInput(inputText));
      toast({ title: `保存しました`, variant: 'success' });
    } catch (error) {
      toast({ title: '保存に失敗しました', variant: 'destructive' });
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold border-l-8 border-l-teal-500 pl-2.5">
          改行コード生成
        </h2>
        <Textarea
          placeholder="ここに元データを入れる"
          rows={4}
          onChange={e => {
            setInputText(e.target.value);
          }}
        />
        <h3 className="font-bold text-2xl">出力された改行コード済みテキスト</h3>
        <Textarea
          placeholder="ここに元データを入れる"
          rows={2}
          value={formatInput(inputText)}
        />
        <Button onClick={clickHandler} size="lg" className="w-full">
          コピーする
        </Button>
      </div>
    </DefaultLayout>
  );
}

function formatInput(input: string): string {
  // Split the input string by newlines, then join them with '\n'
  return input.split('\n').join('\\n');
}
