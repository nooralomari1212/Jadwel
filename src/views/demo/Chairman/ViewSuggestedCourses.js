import React, { useState, useEffect } from 'react';
import { Button, Dialog, Table, Alert } from 'components/ui';
import StudentMessagesTable from './StudentMessagesTable';
import jwt from 'jwt-decode' // import dependency

const { Tr, Th, Td, THead, TBody } = Table;

const ViewSuggestedCourses = () => {
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchSuggestedCourses = async () => {
      try {
        const userdata = jwt(sessionStorage.getItem('token')) // decode your token here

        const response = await fetch(`/api/suggestedCourse/${userdata.departmentId}/ReviewSuggestedCourse`);
        const data = await response.json();
        setSuggestedCourses(data);
      } catch (error) {
        console.error('Error fetching suggested courses:', error);
      }
    };

    fetchSuggestedCourses();
  }, []);

  const openDialog = (student) => {
    setSelectedStudent(student);
  };

  const closeDialog = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      {/* Table */}
      <Alert className="mb-4" type="info" showIcon>
        المساقات المقترحة من قبل الطلبة
      </Alert>
      <Table>
        <THead>
          <Tr>
            <Th>Course</Th>
            <Th>Num of requests</Th>
            <Th>students messages</Th>
          </Tr>
        </THead>
        <TBody>
          {suggestedCourses.map((course) => (
            <Tr key={course.course_id}>
              <Td>{course.name}</Td>
              <Td>{course.user_count}</Td>
              <Td
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() =>
                   {sessionStorage.setItem('course_id', course.course_id)
                    openDialog(course)}
                  }
              >
                View
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>

      {/* Dialog */}
      {selectedStudent && (
        <Dialog isOpen={!!selectedStudent} onClose={closeDialog}>
          <StudentMessagesTable />
        </Dialog>
      )}
    </div>
  );
};

export default ViewSuggestedCourses;
