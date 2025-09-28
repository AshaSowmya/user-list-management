'use client';
import { useEffect } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { putUserById,PostUser } from '../../redux/slices/user.slice.ts';
import Button from './Button.tsx';
import TextField from './TextField.tsx';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialValues?: FormValues & { id?: number };
}

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  avatar: Yup.string().url('Must be a valid URL').required('Profile image link is required'),
});

export default function UserFormModal({
  open,
  onClose,
  mode,
  initialValues,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const emptyValues: FormValues = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };
  
useEffect(() => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [open]);

  if (!open) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {mode === 'edit' ? 'Edit User' : 'Create New User'}
        </h2>

        <Formik
          initialValues={initialValues || emptyValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (mode === 'edit' && initialValues?.id) {
                await dispatch(putUserById({
                  id: initialValues.id,
                  data: values,
                }));
                // dispatch(fetchAllUsers({page:1,limit:5,search:''}));
              }
              else {
                await dispatch(PostUser(values));
              }
              onClose();
            } catch (err) {
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  First Name<span className="text-red-500">*</span>
                </label>
                <TextField
                  name="first_name"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <TextField
                  name="last_name"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Email<span className="text-red-500">*</span>
                </label>
                <TextField
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Profile Image Link<span className="text-red-500">*</span>
                </label>
                <TextField
                  name="avatar"
                  placeholder="Enter profile image link"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  onClick={onClose}
                  className="!bg-white border border-black !hover:bg-gray-100 !text-black w-auto px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-auto px-4"
                >
                  {mode === 'edit' ? 'Update' : 'Submit'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
