import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Input, Notification, toast } from 'components/ui'
import { AdaptableCard, DataTable } from 'components/shared'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { apiDeleteSchedule } from 'services/scheduleService'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

/** Example purpose only */
const CompareSchedule = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const[name , Setname] = useState('')
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: 'desc',
            key: 'id',
        },
    })

   

   

 
    
    const columns = [
        {
            header: 'Student Name',
            accessorKey: 'user_name',
        },
        {
            header: 'Course name',
            accessorKey: 'course_name',
        },
        {
            header: 'departments',  
            accessorKey: 'department_name',
        },
        {
            header: 'Days',
            accessorKey: 'days',
        },
        
       
    
    ]

    const fetchData = async () => {
        setLoading(true)
           const stdId = sessionStorage.getItem('StudentIdContext')

        const response = await axios.get(`/api/suggestedStudentSchedule/${stdId}` , tableData)
        // const data= response.json();
        // Setname(data.user_name);
        // console.log(data.user_name)
        // console.log(response)
        if (response.data) {
            setData(response.data)
            setLoading(false)
            setTableData((prevData) => ({
                ...prevData,
                ...{ total: response.data.total },
            }))
        }
    }

    useEffect(() => {
        fetchData()
    }, [
        tableData.pageIndex,
        tableData.sort,
        tableData.pageSize,
        tableData.query,
    ])

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h1>Student Schedule</h1>
                


              
            </div>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
               
            />
         
        </AdaptableCard>
    )
}

export default CompareSchedule
