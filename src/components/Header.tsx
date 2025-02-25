import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ImageIcon, TextIcon } from '@radix-ui/react-icons';

const tools = [
  {
    name: '文字数カウンター',
    description: 'テキストの文字数、単語数、行数をカウントします',
    href: '/text/counter',
    icon: TextIcon,
  },
  {
    name: '一括文字変換',
    description: 'テキストを様々な形式に一括変換します',
    href: '/text/converter',
    icon: TextIcon,
  },
  {
    name: '改行コード込み文字列ヘ変換',
    description: 'テキストを改行コード(/n)込みのテキストへ変換する',
    href: '/text/kaigyo',
    icon: TextIcon,
  },
  {
    name: 'JPG/PNG to WebP',
    description: '画像をWebP形式に変換してサイズを削減します',
    href: '/image/webp-converter',
    icon: ImageIcon,
  },
  // {
  //   name: 'Engagement',
  //   description: 'Speak directly to your customers',
  //   href: '#',
  //   icon: CursorArrowRaysIcon,
  // },
  // {
  //   name: 'Security',
  //   description: 'Your customers’ data will be safe and secure',
  //   href: '#',
  //   icon: FingerPrintIcon,
  // },
  // {
  //   name: 'Integrations',
  //   description: 'Connect with third-party tools',
  //   href: '#',
  //   icon: SquaresPlusIcon,
  // },
  // {
  //   name: 'Automations',
  //   description: 'Build strategic funnels that will convert',
  //   href: '#',
  //   icon: ArrowPathIcon,
  // },
];

export default function Header() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-start py-6 px-8 gap-12"
        aria-label="Global">
        <div>
          <a href="/" className="-m-1.5 p-1.5 inline-flex items-center gap-3">
            <img className="h-8 w-auto" src="/icon.png" alt="" />
            <p className="font-bold text-2xl italic">mimic</p>
          </a>
        </div>
        <Popover.Group className="flex gap-x-12 ">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              ツール
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {tools.map(item => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </nav>
    </header>
  );
}