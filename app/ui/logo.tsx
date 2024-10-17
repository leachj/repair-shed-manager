import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
    return (

        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <Image
                src="/logo.jpg"
                width={500}
                height={500}
                alt="Logo"
            />
        </div>
    );
}
