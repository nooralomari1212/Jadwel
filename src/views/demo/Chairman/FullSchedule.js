import React, { useState, useEffect } from 'react'
import { DataTable } from 'components/shared'
import StudentsInfo from './StudentsInfo'
import { Dialog } from 'components/ui'
import { CgEnter } from 'react-icons/cg'
import jwt from 'jwt-decode'
const FullSchedule = () => {
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const openDialog = (stats) => {
        setSelectedStudent(stats)
    }

    const closeDialog = () => {
        setSelectedStudent(null)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const token = sessionStorage.getItem('token')
                const decodedToken = jwt(token)
                const departmentId = decodedToken.departmentId
                const response = await fetch(
                    `/api/suggestedStudentSchedule/${departmentId}/statistics`
                )
                const apiData = await response.json()
                setData(apiData)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    const columns = [
        {
            id: 'course',
            header: 'Course Name',
            cell: ({ row }) => (
                <div className="grid grid-cols-1 gap-2">
                    <div>Course Name: {row.original.course.name}</div>
                    <div>Credit Hours: {row.original.course.credit_hours}</div>
                </div>
            ),
        },
        {
            id: 'schedule',
            header: 'Schedule',
            cell: ({ row }) => (
                <table className="table-auto border">
                    <thead>
                        <tr>
                            <th>Days</th>
                            <th>Student Count</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(row.original.scheduleStatistics).map(
                            ([day, stats]) => (
                                <tr key={day}>
                                    <td style={{ width: 300 }}>{day}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {' '}
                                        {stats.student_count}
                                    </td>
                                    <td
                                        style={{
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                        }}
                                        onClick={() => openDialog(stats)}
                                    >
                                        View
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            ),
        },
    ]

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                onCheckBoxChange={() => {}}
                onIndeterminateCheckBoxChange={() => {}}
                onPaginationChange={() => {}}
                onSelectChange={() => {}}
                onSort={() => {}}
                pageSizes={[10, 25, 50, 100]}
                selectable={false}
                pagingData={{
                    total: data.length,
                    pageIndex: 1,
                    pageSize: 10,
                }}
            />

            {selectedStudent && (
                <Dialog isOpen={!!selectedStudent} onClose={closeDialog}>
                    <StudentsInfo stats={selectedStudent} />
                </Dialog>
            )}
        </>
    )
}

export default FullSchedule
