import DefaultLayout from '@/layouts/DefaultLayout';

interface Props {}

export default function Kaigyo({}: Props) {
  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold border-l-8 border-l-teal-500 pl-2.5 my-3">
          改行コード生成
        </h2>
      </div>
    </DefaultLayout>
  );
}
