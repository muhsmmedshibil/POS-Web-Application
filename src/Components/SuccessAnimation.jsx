import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './SuccessAnimation.css';

export const SuccessAnimation = ({setStatus,setCartItems}) => {
    

    return (
        <div className="successContainer">
            <div className='sectionSuccess'>
                <div className="icon-container">
                    <div className="circle">
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%' }}>
                            <DotLottieReact
                                src="https://lottie.host/39326868-b137-4b82-9c94-2291b0191776/ByKnAJuzXp.lottie"
                                loop={false} // Updated: Animation plays only once
                                autoplay
                            />
                        </div>
                    </div>
                </div>

                <h1>Sale Successfully!</h1>

                <p className="sub-text">
                    This sale has been successfully created. It has been saved to your permanent sale history for future reference.
                    <a href="#" className="highlight-link"> View history</a>
                </p>

                <p className="delivery-info">
                    Today Date: <span>{Date.now()}</span>
                </p>

                <a href="#" className="track-link">Show This Bill</a>

                <button className="btn-continue" onClick={()=>(setStatus('bill'),setCartItems([]) )}>
                     Back to Sale
                </button>
            </div>

           
        </div>
    );
};