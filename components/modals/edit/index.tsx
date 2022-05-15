import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { Job, Priority } from '../../../store/types/job';
import styles from './edit.module.scss';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addJob } from '../../../store/actions/addJob';
interface Props {
  job: Job;
  saveEvent: () => void;
  cancelEvent: () => void;
}

export const EditModal = (props: Props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<{ jobName: string; priority: Priority }>({
    jobName: props.job?.text,
    priority: props.job?.priority,
  });
  const priority: { type: Priority; text: string }[] = [
    { type: 'Urgent', text: 'Acil' },
    { type: 'Regularly', text: 'Normal' },
    { type: 'Important', text: 'Önemli' },
  ];
  return (
    <div className={styles.container}>
      <div>
        <div>
          <h1>Job Edit</h1>
        </div>
      </div>

      <Formik
        initialValues={form}
        onSubmit={(values) => {
          //  dispatch(addJob({ item: { type: 'ADD_JOB', payload: { text: values.jobName, priority: values.priority } } }));
        }}
      >
        {(formikProps) => (
          <Form>
            <div className={styles.container}>
              <div className={styles.jobNameContainer}>
                <div>
                  <label>{'İş Adı'}</label>
                </div>
                <TextField
                  name="jobName"
                  disabled
                  value={formikProps.values.jobName}
                  onChange={formikProps.handleChange}
                  className={styles.jobName}
                  size="small"
                  placeholder="Ne İşin Var?"
                  variant="outlined"
                />
              </div>
              <div className={styles.priorityContainer}>
                <div>
                  <label>{'Öncelik'}</label>
                </div>
                <FormControl className={styles.selectPriority} size="small">
                  <Select
                    name="priority"
                    value={formikProps.values.priority}
                    onChange={(e) => formikProps.handleChange(e)}
                  >
                    {priority.map((item, index) => (
                      <MenuItem key={index} value={item.type}>
                        {item.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={styles.ButtonContainer}>
                <Button onClick={() => props.cancelEvent()} className={styles.createButton} variant="contained">
                  Cancel
                </Button>
                <Button type="submit" className={styles.createButton} variant="contained">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
