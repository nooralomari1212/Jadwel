import React from 'react'
import { Button, FormItem, FormContainer, Select, Input } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiArrowSmLeft } from 'react-icons/hi'
import * as Yup from 'yup'
import '../../../.'
const validationSchema = Yup.object().shape({
    organizationName: Yup.string().required('Organization name is required'),
    organizationSize: Yup.string().required(
        'Please select your organization size'
    ),
})

const sizes = [
    { label: 'Solo', value: 'solo' },
    { label: '2 ~ 10 members', value: '2~10' },
    { label: '11 ~ 50 members', value: '11~50' },
    { label: '51 ~ 200 members', value: '51~200' },
    { label: '201 ~ 500 members', value: '201~500' },
]

const Step2 = ({ onNext, onBack }) => {
    return (
        <div className="text-center">
         <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
                <Formik
                    initialValues={{
                        organizationName: '',
                        organizationSize: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onNext?.()
                    }}
                >
                    {({ values, touched, errors }) => {
                        return (
                            <Form>
                                <FormContainer>
                                   
                                <div class="bg-white shadow-lg rounded-lg max-w-xl mx-auto my-8 px-6 py-8 text-gray-800  text-center">
                                <h3 class="">
    Jadwel Makes It Easy For You!
</h3>   

                                <p class="text-lg md:text-xl leading-relaxed my-8">
                                We are a team of four senior software engineering students who have built a revolutionary software that solves the most common problems faced by university students. Having gone through the struggles of university life ourselves, we were inspired to create an all-in-one solution that simplifies the complex process of semester course registration. With our innovative software, we provide a hassle-free experience that will save you time and effort.  </p>

</div>  

                                    <FormItem>
                                        <Button
                                            block
                                            variant="solid"
                                            type="submit"

                                            onClick={onNext}

                                        >
                                            Continue
                                          </Button>
                                        <Button
                                            className="mt-4"
                                            variant="plain"
                                            onClick={onBack}
                                            type="button"
                                            icon={<HiArrowSmLeft />}
                                            block
                                        >
                                            Back
                                        </Button>
                                    </FormItem>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Step2
