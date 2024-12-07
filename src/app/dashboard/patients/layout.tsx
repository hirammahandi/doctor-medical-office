import { type FC, type PropsWithChildren, type ReactNode } from 'react';

const PatientsLayout: FC<
  PropsWithChildren<{
    patientId: ReactNode;
  }>
> = ({ patientId: patientDetailsModal, children }) => {
  return (
    <>
      {children}
      {patientDetailsModal}
    </>
  );
};

export default PatientsLayout;
