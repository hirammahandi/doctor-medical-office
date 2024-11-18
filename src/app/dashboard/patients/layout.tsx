import { type FC, type PropsWithChildren, type ReactNode } from 'react';

const PatientsLayout: FC<
  PropsWithChildren<{
    modal: ReactNode;
  }>
> = ({ modal: patientDetailsModal, children }) => {
  return (
    <>
      {children}
      {patientDetailsModal}
    </>
  );
};

export default PatientsLayout;
