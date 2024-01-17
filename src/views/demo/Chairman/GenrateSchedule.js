import { Chart } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import { COLORS } from 'constants/chart.constant'
import React, { useState , useEffect } from 'react'
import { Dialog } from 'components/ui'
import { DatePicker } from 'components/ui'
import { Button } from 'components/ui'
import jwt from 'jwt-decode'
import { HiOutlineInboxIn } from 'react-icons/hi'
import axios from 'axios'
const { DatePickerRange } = DatePicker

const GenrateSchedule = () => {
    const { DateTimepicker } = DatePicker
    const [chartData, setChartData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [startRegister, setStartRegister] = useState(null);
    const [endRegister, setEndRegister] = useState(null);
    const onClick = () => {
        navigate('/FullSchedule')
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]) // null for start and end date

    const handleDateChange = (dates) => {
        setSelectedDateRange(dates)
    }

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // JS months are 0-based
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}/${month}/${day}`
    }
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        const decodedToken = jwt(token)
        const departmentId = decodedToken.departmentId
        fetch(`/api/suggestedStudentSchedule/${departmentId}/statistics`)
            .then((response) => response.json())
            .then((data) => {
                // Create a new array to hold your chart data
                let chartData = [
                    { name: 'All days', data: [] },
                    { name: 'Sun  , teu , thr', data: [] },
                    { name: 'mon , wed', data: [] }
                ];

                // Create a new array to hold your categories (course names)
                let categories = [];

                // Populate the chartData and categories arrays with data from the API
          data.forEach((item) => {
    categories.push(item.course.name); // Adds the course name to the categories array
    for (let key in item.scheduleStatistics) {
        if (key === "Monday - Wednesday") {
            chartData[2].data.push(item.scheduleStatistics[key].student_count);
        } else if (key === "Sunday - Tuesday - Thursday") {
            chartData[1].data.push(item.scheduleStatistics[key].student_count);
        } else {
            chartData[0].data.push(item.scheduleStatistics[key].student_count);
        }
    }
});

                // Update the state with the new chart data and categories
                setChartData(chartData);
                setCategories(categories);
            })
            .catch((error) => console.error(error));
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token')
                const decodedToken = jwt(token)
                const departmentId = decodedToken.departmentId
                const response = await axios.get(`/api/date/${departmentId}`);
                if (response.data) {
                    setStartRegister(response.data.startRegister);
                    setEndRegister(response.data.endRegister);
                }
            } catch (error) {
                console.error("An error occurred while fetching the data:", error);
            }
        };

        fetchData();
    }, []);
    const onClick1 = () => {
        navigate('/DateTimePicker')
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const navigate = useNavigate()

    const data = [
        {
            name: 'All days',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Sun  , teu , thr',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: 'mon , wed',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ]
    const data1 = [
        {
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ]
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }

    const onDialogOk = async (selectedDateTime) => {
        try {
            if (selectedDateRange[0] && selectedDateRange[1]) {
                const formattedStartDate = formatDate(selectedDateRange[0])
                const formattedEndDate = formatDate(selectedDateRange[1])

                setLoading(true)

                const { startRegister, endRegister } = selectedDateTime
                const token = sessionStorage.getItem('token')
                const decodedToken = jwt(token)
                const departmentId = decodedToken.departmentId
                const requestData = {
                    startRegister: formattedStartDate,
                    endRegister: formattedEndDate,
                    department_id: departmentId,
                }
                console.log(requestData)
                console.log(selectedDateTime)
                const response = await fetch('/api/date', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })

                // Rest of the code...
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <div>
            <div className="flex-wrap inline-flex xl:flex items-center gap-2">
                <Dialog isOpen={dialogIsOpen} closable={false}>
                    <h5 className="mb-4">Start Registration</h5>

                    <DatePickerRange
                        placeholder="Select dates range"
                        value={selectedDateRange}
                        onChange={handleDateChange}
                    />

                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog>
                <Button
                    className="mr-2"
                    variant="solid"
                    onClick={onClick}
                    loading={loading}
                    icon={<HiOutlineInboxIn />}
                >
                    <span>Analysis schedule</span>
                </Button>
                <Button
                    className="mr-2"
                    variant="solid"
                    onClick={openDialog}
                    loading={loading}
                    icon={<HiOutlineInboxIn />}
                >
                    <span>Open registration</span>

                </Button>
           
                {startRegister && <span>Start Date: {startRegister} </span>}
                {endRegister && <span>End Date: {endRegister}</span>}
            </div>
           <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%',
                        endingShape: 'rounded',
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: categories,
                    labels: {
                        style: {
                            colors: [], // Array of colors for the labels
                            fontSize: '10px',
                            fontFamily: 'Arial, sans-serif',
                            width: '50px',
                            writingMode: 'inherit',
                            textOrientation: 'mixed',
                        },
                    },
                },
                fill: {
                    opacity: 1,
                },
                 tooltip: {
                        y: {
                            formatter: (val) => `${val} `,
                        },
                    },
            }}
            series={chartData}
            height={300}
            type="bar"
        />

            <Chart
                options={{
                    colors: COLORS,
                    labels: [
                        'Software Design  ',
                        'Software Testing',
                        'Client Server',
                        'OOP',
                        'Documention',
                    ],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={[44, 55, 13, 43, 22]}
                height={300}
                type="pie"
            />
        </div>
    )
}

export default GenrateSchedule
