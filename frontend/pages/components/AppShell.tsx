import {useRouter} from 'next/router';
import {NavLink} from '@mantine/core';
import Link from "next/link";

export function Demo() {
    const router = useRouter();
    return (
        <>
            <Link href="/" passHref>
                <NavLink component="a" label="Home" active={router.pathname == '/home'}/>
            </Link>
            <Link href="/about" passHref>
                <NavLink component="a" label="About" active={router.pathname == '/about'}/>
            </Link>
        </>
    );
}

export default Demo;
