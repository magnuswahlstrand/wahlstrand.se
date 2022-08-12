import {AppProps} from 'next/app';
import Head from 'next/head';
import {BackgroundImage, Card, Container, MantineProvider, Space, Title} from '@mantine/core';
import {useMediaQuery} from "@mantine/hooks";

interface AuxProps {
    isSmall: boolean;
    children: React.ReactNode;
}

const Aux = ({children}: AuxProps) => {
    const matches = useMediaQuery('(min-width: 780px)');

    const img = <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
    >
        <Space h={50}/>
        <Title order={1}
               style={{color: "white"}}
               p={"xl"}>Wahlstrand.se</Title>
    </BackgroundImage>
    const footer = (<footer>
        <a
            href="https://wahlstrand.dev"
            target="_blank"
            rel="noopener noreferrer"
        >
            Powered by{' '} Magnus
        </a>
    </footer>)


    if (!matches) {
        return (
            <>
                {img}
                {children}
                {footer}
            </>
        )
    }

    return (
        <>
            <Container size="md" p={0} pt={30} mt={"xl"}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section>
                        {img}
                    </Card.Section>
                    {children}
                </Card>
            </Container>
            {footer}
        </>
    );
}

export default function App(props: AppProps) {
    const {Component, pageProps} = props;

    return (
        <>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{colorScheme: 'light'}}
            >
                <Head>
                    <title>Wahlstrand</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Aux>
                    <Component {...pageProps} />
                </Aux>

            </MantineProvider>
        </>
    );
}
