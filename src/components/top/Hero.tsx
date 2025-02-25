import { ImageIcon, TextIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const toolsList = [
  {
    name: '文字数カウンター',
    description: 'テキストの文字数、単語数、行数をカウントします',
    href: '/text/counter',
    icon: TextIcon,
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  {
    name: '一括文字変換',
    description: 'テキストを様々な形式に一括変換します',
    href: '/text/converter',
    icon: TextIcon,
    color: 'bg-green-100',
    textColor: 'text-green-800',
  },
  {
    name: '改行コード込み文字列ヘ変換',
    description: 'テキストを改行コード(/n)込みのテキストへ変換する',
    href: '/text/kaigyo',
    icon: TextIcon,
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
  },
  {
    name: 'JPG/PNG to WebP',
    description: '画像をWebP形式に変換してサイズを削減します',
    href: '/image/webp-converter',
    icon: ImageIcon,
    color: 'bg-amber-100',
    textColor: 'text-amber-800',
  },
];

export default function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ちょっとした作業を効率化するためのツール集
            </h1>
            <div className="mt-6 max-w-xl">
              <p className="text-lg leading-8 text-gray-600">
                CMSやFigmaなど開発以外でコンテンツ位生成するときに、ちょっと欲しいツールなどをまとめていくページです
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Tools Grid Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
          利用可能なツール
        </h2>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {toolsList.map((tool) => (
            <div 
              key={tool.name} 
              className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${tool.color}`}>
                <tool.icon className={`h-6 w-6 ${tool.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
              <p className="mt-2 text-base text-gray-600 flex-grow">{tool.description}</p>
              <div className="mt-6">
                <Link href={tool.href} passHref>
                  <Button className="w-full">
                    使ってみる
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}