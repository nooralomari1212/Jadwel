import React, { useState, useEffect } from 'react';
import { Button, Dialog, Input, Notification, toast, Select } from 'components/ui';
import { AdaptableCard, DataTable } from 'components/shared';
import axios from 'axios';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

const ManageDepartment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogItemId, setDialogItemId] = useState(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false);
  const [editedDepartmentName, setEditedDepartmentName] = useState('');
  const [editedDepartmentId, setEditedDepartmentId] = useState('');
  const [editedCollegeName, setEditedCollegeName] = useState('');
  const [editedCollegeId, setEditedCollegeId] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentId, setNewDepartmentId] = useState('');
  const [newCollegeName, setNewCollegeName] = useState('');
  const [newCollegeId, setNewCollegeId] = useState('');
  const [collegeOptions, setCollegeOptions] = useState([]);

  const openDialog = (props) => {
    setDialogItemId(props.row.original.id);
    setDialogIsOpen(true);
  };

  const openEditDialog = (props) => {
    setDialogItemId(props.row.original.id);
    setEditedDepartmentName(props.row.original.name);
    setEditedDepartmentId(props.row.original.departmentId);
    setEditedCollegeName(props.row.original.collegeName);
    setEditedCollegeId(props.row.original.collegeId);
    setEditDialogIsOpen(true);
  };

  const closeDialogs = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setAddDialogIsOpen(false);
  };

  const deleteDepartment = async () => {
    setLoading(true);
    const success = await fetch({ id: dialogItemId });
    if (success) {
      const filteredData = data.filter((item) => item.id !== dialogItemId);
      setData(filteredData);
      popNotification('Deleted');
    }
    setLoading(false);
    closeDialogs();
  };

  const updateDepartment = async () => {
    setLoading(true);

    try {
      const response = await axios.put(`/api/departments/${dialogItemId}`, {
        name: editedDepartmentName,
        departmentId: editedDepartmentId,
        collegeName: editedCollegeName,
        collegeId: editedCollegeId,
      });

      if (response.status === 200) {
        const updatedData = data.map((item) => {
          if (item.id === dialogItemId) {
            return {
              ...item,
              name: editedDepartmentName,
              departmentId: editedDepartmentId,
              collegeName: editedCollegeName,
              collegeId: editedCollegeId,
            };
          }
          return item;
        });

        setData(updatedData);
        popNotification('Updated');
        closeDialogs();
      } else {
        console.error('Error updating department:', response.data);
        popNotification('Failed to update');
      }
    } catch (error) {
      console.error('Error updating department:', error);
      popNotification('Failed to update');
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async () => {
    setLoading(true);

    try {
      const response = await axios.post('/api/departments', {
        name: newDepartmentName,
        departmentId: newDepartmentId,
        collegeName: newCollegeName,
        collegeId: newCollegeId,
      });

      if (response.status === 201) {
        const newDepartment = response.data;
        const updatedData = [...data, newDepartment];

        setData(updatedData);
        popNotification('Added');
        closeDialogs();
      } else {
        console.error('Error adding department:', response.data);
        popNotification('Failed to add');
      }
    } catch (error) {
      console.error('Error adding department:', error);
      popNotification('Failed to add');
    } finally {
      setLoading(false);
    }
  };

  const popNotification = (keyword) => {
    toast.push(
      <Notification title={`Successfully ${keyword}`} type="success" duration={2500}>
        Department successfully {keyword}
      </Notification>,
      {
        placement: 'top-center',
      }
    );
  };

  const columns = [
    {
      header: 'College Name',
      accessorKey: 'collageName',
    },
    {
      header: 'Department Name',
      accessorKey: 'name',
    },
    {
      header: 'Department ID',
      accessorKey: 'departmentId',
    },
    
    
    {
      header: 'Edit',
      id: 'edit',
      cell: (props) => (
        <div className="flex items-center gap-4">
          <Button
            shape="circle"
            size="sm"
            variant="twoTone"
            onClick={() => openEditDialog(props)}
            icon={<HiPencilAlt />}
          />
        </div>
      ),
    },
    {
      header: 'Delete',
      id: 'delete',
      cell: (props) => (
        <div className="flex items-center gap-4">
          <Button
            shape="circle"
            size="sm"
            variant="twoTone"
            onClick={() => openDialog(props)}
            icon={<HiTrash />}
          />
        </div>
      ),
    },
  ];

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/departments');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await axios.get('/api/collages');
      const colleges = response.data.map((college) => ({
        label: college.name,
        value: college.collegeId,
      }));
      setCollegeOptions(colleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };
  
  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    fetchDepartments();
    fetchColleges();
  }, []);

  return (
    <>
      <div className=" mb-10">
        <Button variant="solid" onClick={() => setAddDialogIsOpen(true)}>
          Add Department
        </Button>
      </div>

      <AdaptableCard className="h-full" bodyClass="h-full">
        <DataTable columns={columns} data={data} loading={loading} />

        <Dialog isOpen={dialogIsOpen} onClose={closeDialogs}>
          <h5 className="mb-4">Confirm Delete Department</h5>
          <p>Are you sure you want to delete this department?</p>
          <div className="text-right mt-6">
            <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={closeDialogs}>
              Cancel
            </Button>
            <Button variant="solid" onClick={deleteDepartment} loading={loading}>
              Delete
            </Button>
          </div>
        </Dialog>

        <Dialog isOpen={editDialogIsOpen} onClose={closeDialogs}>
          <h5 className="mb-4">Edit Department</h5>
          <Input
            label="Department Name"
            value={editedDepartmentName}
            onChange={(e) => setEditedDepartmentName(e.target.value)}
          />
           <Select
              label="College Name"
              options={collegeOptions}
              value={newCollegeName}
              onChange={(selectedOption) => setNewCollegeName(selectedOption.value)}
            />
           <div className="text-right mt-6">
            <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={closeDialogs}>
              Cancel
            </Button>
            <Button variant="solid" onClick={updateDepartment} loading={loading}>
              Save
            </Button>
          </div>
        </Dialog>

        <Dialog isOpen={addDialogIsOpen} onClose={closeDialogs}>
          <h5 className="mb-4">Add New Department</h5>
          <Input
            label="Department Name"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            placeHolder ="department name"
          />
              <Select
              label="College Name"
              options={collegeOptions}
              value={newCollegeName}
              onChange={(selectedOption) => setNewCollegeName(selectedOption.value)}
      />

          <div className="text-right mt-6">
            <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={closeDialogs}>
              Cancel
            </Button>
            <Button variant="solid" onClick={addDepartment} loading={loading}>
              Save
            </Button>
          </div>
        </Dialog>
      </AdaptableCard>
    </>
  );
};

export default ManageDepartment;
