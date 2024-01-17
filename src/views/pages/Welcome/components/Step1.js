import React from 'react'
import { DoubleSidedImage } from 'components/shared'
import { Button } from 'components/ui'

const Step1 = ({ onNext, onSkip }) => {
    return (
        <div className="text-center">
            <DoubleSidedImage
                className="mx-auto mb-8"
                src="/img/others/welcome.png"
                darkModeSrc="/img/others/welcome-dark.png"
                alt="Welcome"
            />
            <h3 className="mb-2 bg-lig">
                Welcome on Board, lets get started with Jadwel!
            </h3>
            <p className="text-base">
            We will tell you what Jadwel is and what features it provides.
            </p>
            <div className="mt-8 max-w-[350px] mx-auto">
                <Button className="mb-2" variant="solid" onClick={onNext} block>
                    Get started
                </Button>
             
            </div>
        </div>
    )
}

export default Step1
