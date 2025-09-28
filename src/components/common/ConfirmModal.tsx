// src/components/common/ConfirmModal.tsx
'use client';
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form } from "formik";
import Button from "./Button.tsx";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "Do you really want to delete this user? This action cannot be undone.",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <Formik
              initialValues={{}}
              onSubmit={async (_, { setSubmitting }) => {
                try {
                  await onConfirm();
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex justify-center gap-4">
                  <Button
                    type="button"
                    onClick={onCancel}
                    className="!bg-gray-300 hover:!bg-gray-400 text-black w-auto px-4"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={isSubmitting} className="w-auto px-4">
                    Confirm
                  </Button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
