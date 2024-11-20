import {
  TvIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const iconMap = {
  jobs: TvIcon,
  customers: UserGroupIcon,
};

export function Card({
  title,
  value,
  type,
  filter,
}: {
  title: string;
  value: number | string;
  type: 'jobs' | 'customers';
  filter?: string
}) {
  const Icon = iconMap[type];

  return (
    <Link href={`/${type}${filter?"?filter="+filter:""}`}>
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
    </Link>
  );
}
