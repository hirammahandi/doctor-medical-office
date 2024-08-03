import { Metadata } from "next";
import { Suspense } from "react";
import { DoctorFormContainer } from "./_components/doctor-form-container";
import { DoctorFormSkeleton } from "./_components/doctor-form-skeleton";

export const metadata: Metadata = {
  title: "Doctor",
  description: "Update your personal information",
};

const DoctorPage = () => {
  return (
    <Suspense fallback={<DoctorFormSkeleton />}>
      <DoctorFormContainer />
    </Suspense>
  );
};

export default DoctorPage;
