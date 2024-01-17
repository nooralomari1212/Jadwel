import React, { useEffect, useState } from 'react';
import { Table } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table;

const StudentMessagesTable = ({ courseid }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch student's messages from the API
    fetch(`/api/suggestedCourse/${sessionStorage.getItem('course_id')}/StudentMessages`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <Table style={{ width: '100%', height: '300%' }}>
      <THead>
        <Tr>
          <Th>Student Name</Th>
          <Th>Message</Th>
        </Tr>
      </THead>
      <TBody>
        {messages.map((msg) => (
          <Tr key={msg.suggeste_course_id}>
            <Td>{msg.user_name}</Td>
            <Td>{msg.description}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default StudentMessagesTable;
