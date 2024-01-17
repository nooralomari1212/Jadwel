import React from 'react'
import { FormItem, FormContainer, Segment, Button } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { SegmentItemOption } from 'components/shared'
import {
    HiOutlineBookOpen,
    HiOutlineClock,
    HiOutlineAdjustments,
    HiOutlineSparkles,
    HiArrowSmLeft,
} from 'react-icons/hi'

const roles = [
    {
        value: '0',
        label: 'Build your own sceduale',
        icon: <HiOutlineBookOpen />,
    },
    {
        value: '1',
        label: 'notified when need!',
        icon: <HiOutlineClock />,
    },
    {
        value: '2',
        label: 'Enhance communcation with chairman',
        icon: <HiOutlineAdjustments />,
    },
    { value: '3', label: 'Others', icon: <HiOutlineSparkles /> },
]

const Step3 = ({ onNext, onBack }) => {
    const onSetFieldValue = (form, field, val) => {
        form.setFieldValue(field.name, val[0])
        onNext?.()
    }

    return (
        <div className="text-center">
            <h3 className="mb-2">What is your main objective with Jadwel?</h3>
            <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
                <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roles.map((item) => (
                            <div
                                key={item.value}
                                className="p-4 bg-white dark:bg-gray-800 rounded-lg flex items-center gap-3"
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <h6 className="text-lg font-medium">
                                    {item.label}
                                </h6>
                            </div>
                        ))}
                    </div>
                    <div className='mt-3'>
                        <Button
                            block
                            variant="solid"
                            type="submit"
                            onClick={onNext}
                        >
                            Continue
                        </Button>

                        <Button
                        variant="plain"
                        onClick={onBack}
                        type="button"
                        icon={<HiArrowSmLeft />}
                        block
                        className="mt-4"
                    >
                        Back
                    </Button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Step3
