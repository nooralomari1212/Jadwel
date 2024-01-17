import React, { useState, useEffect } from 'react';
import { Button, Dialog } from 'components/ui';
import { AdaptableCard, DataTable } from 'components/shared';
import axios from 'axios';
import { HiTrash } from 'react-icons/hi';
import CreatableSelect from './Form/Schedule';
import jwt from 'jwt-decode';
import ReactTooltip from 'react-tooltip';

const ViewSchedule = () => {
  const [data, setData] = useState([]);
  const [studentScheduleId, setStudentScheduleId] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [isAddCourseDisabled, setIsAddCourseDisabled] = useState(false); // Added state variable

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
      order: 'desc',
      key: 'id',
    },
  });
  const [dialogItemId, setDialogItemId] = useState(false);
  const [dialogIsOpen, setIsOpen] = useState(false);

  const openDialog = (props) => {
    setDialogItemId(props.row.original.id);
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
  };

  const onDialogOk = () => {
    handleDelete();
    window.location.reload();
    setDialogItemId(false);
    setIsOpen(false);
  };
  const handleDelete = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    if (
      currentDate >= registrationDate.startRegister &&
      currentDate <= registrationDate.endRegister
    ) {
      const response = await fetch(
        `/api/suggestedStudentSchedule/${studentScheduleId}`,
        {
          method: 'DELETE',
        }
      );
      // Handle the response
    } else {
      // Show a message or perform any other action when outside the registration period
    }
  };

  const columns = [
    {
      header: 'name',
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
    {
        header: '',
        id: 'action',
        cell: (props) => (
          <div className="flex items-center gap-4">
            <span
              data-tip={
                new Date().toISOString().split('T')[0] <
                  registrationDate.startRegister ||
                new Date().toISOString().split('T')[0] >
                  registrationDate.endRegister
                  ? "Can't make changes out of registration period"
                  : ''
              }
              data-for={`tooltip-${props.row.index}`}
            >
              <Button
                shape="circle"
                size="sm"
                variant="twoTone"
                onClick={() => openDialog(props)}
                icon={<HiTrash />}
                disabled={
                  new Date().toISOString().split('T')[0] <
                    registrationDate.startRegister ||
                  new Date().toISOString().split('T')[0] >
                    registrationDate.endRegister
                }
              />
            </span>
            <ReactTooltip
              id={`tooltip-${props.row.index}`}
              place="top"
              effect="solid"
              delayShow={500}
            />
          </div>
        ),
      },
      
  ];
  useEffect(() => {
    const fetchRegistrationDate = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const decodedToken = jwt(token)
        const departmentId = decodedToken.departmentId
        const response = await fetch(`/api/date/${departmentId}`);
        setRegistrationDate(response.data);

        const currentDate = new Date().toISOString().split('T')[0];
        if (
          currentDate < response.data.startRegister ||
          currentDate > response.data.endRegister
        ) {
          setIsAddCourseDisabled(true); // Disable the "Add Course" button
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchRegistrationDate();
  }, []);

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwt(token);
    const userId = decodedToken.userId;

    setLoading(true);
    const response = await axios.get(`/api/suggestedStudentSchedule/${userId}`, {
      params: tableData,
    });

    if (response.data) {
      setData(response.data);
      setLoading(false);
      setTableData((prevData) => ({
        ...prevData,
        ...{ total: response.data.total },
      }));
    }
    const student_schedule_id = response.data[0].student_schedule_id;
    setStudentScheduleId(student_schedule_id);
  };

  useEffect(() => {
    fetchData();
  }, [tableData.pageIndex, tableData.sort, tableData.pageSize, tableData.query]);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      {!isAddCourseDisabled && ( // Hide the "Add Course" section if disabled
        <div className="lg:flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="mb-4 lg:mb-0">Add Course</h3>
            <CreatableSelect fetchData={fetchData} />
          </div>
        </div>
      )}
      <DataTable columns={columns} data={data} loading={loading} pagingData={tableData} />
      <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
        <h5 className="mb-4">Confirm Delete Schedule</h5>
        <p>Are you sure you want to delete this schedule?</p>
        <div className="text-right mt-6">
          <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={onDialogClose}>
            Cancel
          </Button>
          <Button variant="solid" onClick={onDialogOk}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </AdaptableCard>
  );
};

export default ViewSchedule;
