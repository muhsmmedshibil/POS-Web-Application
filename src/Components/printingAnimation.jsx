import React, { useState, useEffect } from 'react';
import './PrintingAnimation.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SuccessAnimation } from './SuccessAnimation';

export const PrintingAnimation = ({setStatus,setCartItems}) => {
    const [isPrinting, setIsPrinting] = useState(true);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPrinting(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='billingAnimation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {isPrinting ? (
                /* 1. INITIAL PRINTING STATE */
                <div style={{ backgroundColor: ' var(--primary-red)', width: '340px', height: '400px', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <DotLottieReact
                        src="https://lottie.host/c34bf20a-1de7-40d4-b81e-79a072a921f4/yFq2FRjdAO.lottie"
                        loop
                        autoplay
                    />
                    <p style={{ color: 'white', marginTop: '10px', fontWeight: 'bold' }}>Printing Receipt...</p>
                </div>
            ) : (
                /* 2. SUCCESS STATE (After 10 Seconds) */
                <div style={{ 
                    backgroundColor: '#ffffffff', 
                    width: '100%', 
                    height: '100vh', 
                    padding: '20px', 
                     
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign: 'center' 
                }}>
                    <SuccessAnimation  setCartItems={setCartItems}
                    setStatus={setStatus}/>
                    
                    {/* <h2 style={{ color: '#333', margin: '0 0 20px 0' }}>Sale Successfully</h2>
                    
                    <button 
                        onClick={()=>(setStatus('bill'),setCartItems([]) )}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                        
                    >
                        Back to Sale
                    </button> */}
                </div>
            )}
        </div>
    );
};