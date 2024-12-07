const globalContentData = {
  cancel: 'Cancel',
  create: 'Create',
  update: 'Update',
  save: 'Save',
  goToDashboard: 'Go to Dashboard',
  goToPatients: 'Go to Patients',
  notFound: {
    pageNotFound: 'Oops, page not found!',
    resourceNotFound: 'Resource not found',
    description:
      'The page you&apos;re looking for doesn&apos;t exist or has been moved.',
  },
  labels: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    address: 'Address',
    age: 'Age',
    identification: 'Identification',
    description: 'Description',
  },
  placeholders: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jhon@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown USA',
    age: '18',
    identification: '123456789',
    description: 'Enter a description',
  },
};

const upsertPatientContentData = {
  create: {
    title: 'New Patient',
    description: 'Enter the patient´s information below.',
    successMessage: 'Patient created',
    addButtonTrigger: 'Add new patient',
  },
  update: {
    title: 'Update Patient',
    description: 'Update the patient´s information below.',
    successMessage: 'Patient updated',
  },
};

const patientDetailsContentData = {
  title: 'Patient Details',
  description: 'View the patient´s information below.',
  notFound: {
    title: 'Patient not found',
    description: 'The patient you are looking for does not exist.',
  },
};

export const contentData = {
  globalContentData,
  upsertPatientContentData,
  patientDetailsContentData,
};
