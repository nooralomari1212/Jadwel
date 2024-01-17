import React, { useState, useEffect } from 'react';
import { Button, Select, FormItem, FormContainer, Dialog, Alert } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { HiPlusCircle } from 'react-icons/hi';
import jwt from 'jwt-decode';
import { windowScroll } from '@tanstack/react-virtual';

const daysOptions = [
  { value: 'Sunday - Tuesday - Thursday', label: 'Sunday - Tuesday - Thursday' },
  { value: 'Monday - Wednesday', label: 'Monday - Wednesday' },
  { value: 'all', label: 'All Days' }
];

const validationSchema = Yup.object().shape({
  days: Yup.array().required('Please select at least one day!').min(1, 'Please select at least one day!'),
  college: Yup.object().required('Please select a college!'),
  departments: Yup.object().required('Please select at least one department!'),
  courses: Yup.object().required('Please select at least one course!')
});

const CreatableSelect = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('/api/collages');
        const data = await response.json();
        const options = data.map((college) => ({
          value: college.collageId,
          label: college.name
        }));
        setCollegeOptions(options);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };
    fetchColleges();
  }, []);

  const fetchDepartments = async (college_id) => {
    try {
      const response = await fetch(`/api/departments/${college_id}`);
      const data = await response.json();
      const options = data.map((department) => ({
        value: department.departmentId,
        label: department.name
      }));
      setDepartmentOptions(options);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchCourses = async (department_id) => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwt(token);
      const userId = decodedToken.userId;
      const response = await fetch(`/api/courses/${userId}/${department_id}`);
      const data = await response.json();
        const options = data
    .filter((course) => course.is_active!== 0)
    .map((course) => ({
      value: course.course_id,
      label: course.name
    }));
      setCourseOptions(options);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (values) => {
  const token = sessionStorage.getItem('token');
  const decodedToken = jwt(token);
  const userId = decodedToken.userId;

  const { days, college, departments, courses } = values;
  const user_id = userId; // Assuming a static user ID for now
  const course_id = courses.value;
  const department_id =departments.value;
  const daysValue = days.some((day) => day.value === 'all') ? 'All days' : days.map((day) => day.value).join(', ');

  const postData = {
    user_id,
    department_id,
    course_id,
    days: daysValue
  };
 console.log(department_id)
  try {
    const response = await fetch('/api/suggestedStudentSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    onDialogClose();
    window.location.reload(); // Reload the page after closing the dialog

  } catch (error) {
    console.error('Error making the POST request:', error);
  }
};

  return (
    <>
      <Button shape="circle" size="sm" variant="twoTone" onClick={openDialog} icon={<HiPlusCircle size={'25px'} />} />
      <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
        <h5 className="mb-4">Add New Course</h5>

        <Alert showIcon>
          {' عليك الرجوع دائماً إلى التعليمات في دليل الطالب والالتزام بها.'}
        </Alert>

        <Formik
          enableReinitialize
          initialValues={{
            days: [],
            college: '',
            departments: '',
            courses: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, resetForm }) => (
            <Form>
              <FormContainer>
                <FormItem
                  asterisk
                  label="Days"
                  invalid={Boolean(errors.days && touched.days)}
                  errorMessage={errors.days}
                >
                  <Field name="days">
                    {({ field, form }) => (
                      <Select
                        isMulti
                        field={field}
                        form={form}
                        options={daysOptions}
                        value={values.days}
                        onChange={(option) => {
                          if (option.some((option) => option.value === 'all')) {
                            form.setFieldValue(
                              field.name,
                              daysOptions.filter((days) => days.value !== 'all')
                            );
                          } else {
                            form.setFieldValue(field.name, option);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  label="College"
                  asterisk
                  invalid={Boolean(errors.college && touched.college)}
                  errorMessage={errors.college}
                >
                  <Field name="college">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={collegeOptions}
                        value={values.college}
                        onChange={(option) => {
                          form.setFieldValue(field.name, option);
                          fetchDepartments(option.value);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  asterisk
                  label="Departments"
                  invalid={Boolean(errors.departments && touched.departments)}
                  errorMessage={errors.departments}
                >
                  <Field name="departments">
                    {({ field, form }) => (
                      <Select
                        isDisabled={departmentOptions.length < 1}
                        field={field}
                        form={form}
                        options={departmentOptions}
                        value={values.departments}
                        onChange={(option) => {
                          form.setFieldValue(field.name, option);
                          fetchCourses(option.value);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  asterisk
                  label="Courses"
                  invalid={Boolean(errors.courses && touched.courses)}
                  errorMessage={errors.courses}
                >
                  <Field name="courses">
                    {({ field, form }) => (
                      <Select
                        isDisabled={courseOptions.length < 1}
                        field={field}
                        form={form}
                        options={courseOptions}
                        value={values.courses}
                        onChange={(option) => {
                          form.setFieldValue(field.name, option);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem className="mt-4">
                  <Button type="reset" className="ltr:mr-2 rtl:ml-2" onClick={resetForm}>
                    Reset
                  </Button>
                  <Button variant="solid" type="submit" >
               
                    Submit
                  </Button>
                </FormItem>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CreatableSelect;
