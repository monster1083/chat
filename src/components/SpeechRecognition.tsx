// src/components/SpeechRecognition.tsx
'use client';


import './index.css';
import React, { useEffect } from 'react';

const SpeechRecognition: React.FC = () => {
  const language = 'ko-KR';

  const [isRecognizing, setIsRecognizing] = React.useState(false);
  const [ignoreEndProcess, setIgnoreEndProcess] = React.useState(false);

  const [finalScript, setFinalScript] = React.useState('');
const [interimScript, setInterimScript] = React.useState('');

const [recognition, setRecognition] = React.useState(null);


  


    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('fired');
            if (typeof (window as any).webkitSpeechRecognition !== 'function') {
                alert('크롬에서만 동작 합니다.');
                return;
            }

            const recognition = new (window as any).webkitSpeechRecognition();
            setRecognition(recognition);
            
            const recording_state = document.querySelector('#recording-state') as HTMLElement;



            let finalTranscript = '';

            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onstart = (event: Event) => {
                console.log('onstart', event);
                setIsRecognizing(true);
                recording_state.className = 'on';
            };

            recognition.onend = () => {
                console.log('onend', arguments);
                setIsRecognizing(false);

                if (ignoreEndProcess) {
                    return;
                }

                recording_state.className = 'off';
                console.log('off');
                if (!finalTranscript) {
                    console.log('empty finalTranscript');
                    return;
                }
            };

            recognition.onresult = (event: any) => {
                console.log('onresult', event);

                let finalTranscript = '';
                let interimTranscript = '';
                if (typeof event.results === 'undefined') {
                    recognition.onend = null;
                    recognition.stop();
                    return;
                }

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                // if (final_span) final_span.innerHTML = finalTranscript;
                setFinalScript(finalTranscript);

                // if (interim_span) interim_span.innerHTML = interimTranscript;
                if(interimScript.length > 0 ) setInterimScript(interimTranscript);
                final_span_Handler();
            };

            recognition.onerror = (event: any) => {
                console.log('onerror', event);

                if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
                    setIgnoreEndProcess(true);
                }
            };

            const final_span_Handler = () => {
                if (finalScript.length > 0) {
                    const final_span_text = finalScript;
                    const final_arr = final_span_text.split(' ');

                    let htmlEl = '';
                    final_arr.forEach((value, index) => {
                        if (index === 0) {
                            htmlEl = `<span class="resultWord" id=0>` + value + '<span/>';
                        } else {
                            htmlEl = htmlEl + `<span class="resultWord" id=${index}>${value}<span/> `;
                        }
                    });

                    if (finalScript.length > 0) setFinalScript(htmlEl);
                } else {
                    return null;
                }
            };
        }
    }, []);

    
    const onClickMicBtn = () => {
      if(recognition === null ) return;
      if (isRecognizing) {
        recognition.stop();
        console.log('stopped');
        return;
      }
      recognition.lang = language;
      recognition.start();
      setIgnoreEndProcess(false);

      const finalTranscript = '';
      if (finalScript.length > 0) setFinalScript('');
      if(interimScript.length > 0 ) setInterimScript('');
    }

    const onClickRemoveBtn = () => {  
      if (finalScript.length > 0) setFinalScript('');
    };


    return (
        <div className="contents">
            <p>일단 Speech Recognition해서 텍스트만 번역한 상태입니다. 추후에 이 텍스트를 어떠한 기준으로 랜더링할지 결정해야합니다. </p>
            <section className="wrapper">
                {/* <div className="result">
                    <p className="description">회의를 하시다보면 중요 키워드가 여기에 표시됩니다!</p>
                </div> */}
                <div className="recognized-textarea">
                    <span className="final" id="final_span">{finalScript}</span>
                    <span className="interim" id="interim_span"></span>
                </div>
                <div className="Button-area">
                    <button className="mic" onClick={onClickMicBtn}> 인식 시작
                        <span id="recording-state"></span>
                    </button>
                    <button className="remove" onClick={onClickRemoveBtn}> 위의 대본 삭제하기
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SpeechRecognition;
