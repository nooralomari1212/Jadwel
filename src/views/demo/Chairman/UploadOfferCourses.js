import React, { useState, useEffect } from 'react'
import { Table } from 'components/ui'
import { Alert, Switcher } from 'components/ui'
import jwt from 'jwt-decode' // import dependency
const { Tr, Th, Td, THead, TBody } = Table

const UploadOfferCourses = () => {
    const [courses, setCourses] = useState([])
    const [buttonState, setButtonState] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userdata = jwt(sessionStorage.getItem('token')) // decode your token here
                const response = await fetch(
                    `/api/courses/${userdata.departmentId}`
                )

                const data = await response.json()
                setCourses(data)
            } catch (error) {
                console.error('Error fetching courses:', error)
            }
        }

        const fetchButtonState = async () => {
            try {
                const response = await fetch('/api/courses')
                const data = await response.json()
                setButtonState(data.state)
            } catch (error) {
                console.error('Error fetching button state:', error)
            }
        }

        fetchCourses()
        fetchButtonState()
    }, [])

    const handleButtonToggle = async (param) => {
        try {
            console.log('test')
            const response = await fetch(`/api/courses/${param}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            setButtonState(data.state)
        } catch (error) {
            console.error('Error updating button state:', error)
        }
    }

    return (
        <div>
            <Alert className="mb-4" type="info" showIcon>
                المساقات التي سوف تطرح على الفصل الدراسي
            </Alert>
            <Table>
                <THead>
                    <Tr>
                        <Th>Course name:</Th>
                        <Th>Status</Th>
                    </Tr>
                </THead>
                <TBody>
                    {courses.map((course) => (
                        <Tr key={course.course_id}>
                            {/* <Td>{course.course_id}</Td> */}
                            <Td>{course.name}</Td>
                            <Td>
                                <div className="mb-4">
                                    <Switcher
                                        defaultChecked={course.is_active === 1}
                                        color="green-500"
                                        onChange={() =>
                                            handleButtonToggle(course.course_id)
                                        }
                                    />
                                </div>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default UploadOfferCourses
