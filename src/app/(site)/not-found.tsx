"use client"

import React from 'react'
import FuzzyText from '@/components/reactBites/errorPage'


const notFound = () => {
  return (
    <div className='flex justify-center w-[20vw] md:w-[70vw] mx-auto items-center font-mono gap-10 flex-col h-screen'>
        <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.58}
        enableHover={true}
        fuzzRange={30}
        fps={30}
        transitionDuration={9}
        glitchMode={true}
        clickEffect={true}
        glitchInterval={1500}
        glitchDuration={350}
        direction='horizontal'
        >
        404
        </FuzzyText>
        <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.58}
        enableHover={true}
        fuzzRange={30}
        fps={30}
        transitionDuration={9}
        glitchMode={true}
        clickEffect={true}
        glitchInterval={1500}
        glitchDuration={350}
        direction='horizontal'
        className='hidden md:block'
        >
        Page Not Found
        </FuzzyText>
    </div>
  )
}

export default notFound;