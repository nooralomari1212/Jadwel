import React, { useEffect, useState } from 'react';
import { Table } from 'components/ui';
import { useNavigate } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody } = Table;

const StudentsInfo = ({ stats }) => {
  const [students, setStudents] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (stats.student_full_names) {
      setStudents(stats.student_full_names.split(','));
    }
    if (stats.student_ids) {
      setIds(stats.student_ids.split(','));
    }
  }, [stats]);

  const navigate = useNavigate();

  const navigateToAnotherPage = (a) => {
    sessionStorage.setItem('StudentIdContext', a);
    navigate('/compare-schedule');
  };

  return (
    <Table style={{ width: '100%', height: '300%' }}>
      <THead>
        <Tr>
          <Th>Student Name</Th>
          {/* <Th>Id</Th> */}
          <Th>schedules</Th>
        </Tr>
      </THead>
      <TBody>
        {students.map((name, index) => (
          <Tr key={index}>
            <Td>{name.trim()}</Td>
            <Td>

              <button onClick={() => navigateToAnotherPage(ids[index].trim())}>View</button>
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default StudentsInfo;