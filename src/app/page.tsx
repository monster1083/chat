// src/app/page.tsx
import Head from 'next/head';
// import SpeechRecognition from '../components/SpeechRecognition';
import EventInfoForm from "@/components/EventInfoForm";
import VoiceRecord from "@/components/VoiceRecord";
import ExampleScript from "@/components/ExampleScript";


const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>GM Interview</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/index.css" />
            </Head>
            <header>
                <h1 className="py-5 text-center">GM Interview</h1>
            </header>

            <section className="mt-10">
                <EventInfoForm/>
                <VoiceRecord/>
                {/* <SpeechRecognition /> */}
                <ExampleScript/>
            </section>
            
            <footer className="fixed bottom-0">
                <div className="base-line"></div>
                <p className="inc"> ⓒIIC</p>
            </footer>
        </>
    );
};

export default Home;
