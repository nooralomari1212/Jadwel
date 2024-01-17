import React, { useState } from 'react';
import { Button, FormItem, FormContainer, Alert } from 'components/ui';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import jwt from 'jwt-decode';

const NotifyStudent = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    setSubmitError(null);

    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwt(token);
      const user_id = decodedToken.userId;
      const response = await fetch('/api/notifyMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          message: values.message,
          publish_date: currentDate,
          user_id: user_id,
        }),
      });

      const data = await response.json();
      console.log('Message sent:', data);
      setShowSuccessMessage(true);
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div dir="ltr">
        <Alert showIcon style={{ margin: '0 auto 20px', textAlign: 'center' }}>
          تذكير الطلاب بالاحداث المستجدة
        </Alert>
      </div>
      {showSuccessMessage && (
        <div>
          <Alert className="mb-4" type="success" showIcon>
            تم ارسال الرسالة بنجاح
          </Alert>
        </div>
      )}
      <Formik
        enableReinitialize
        initialValues={{
          title: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, resetForm, setFieldValue }) => (
          <Form>
            <FormContainer>
              <FormItem label="Title:">
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={(e) => setFieldValue('title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    boxSizing: 'border-box',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}
                />
                {errors.title && (
                  <div style={{ color: 'red' }}>{errors.title}</div>
                )}
              </FormItem>

              <FormItem label="Message:">
                <textarea
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}
                  placeholder="Enter your message here"
                  name="message"
                  value={values.message}
                  onChange={(e) => setFieldValue('message', e.target.value)}
                />
                {errors.message && (
                  <div style={{ color: 'red' }}>{errors.message}</div>
                )}
              </FormItem>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  {submitError}
                </div>
              )}

              <FormItem>
                <Button
                  type="reset"
                  className="ltr:mr-2 rtl:ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    resetForm();
                  }}
                >
                  Reset
                </Button>
                <Button variant="solid" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotifyStudent;
