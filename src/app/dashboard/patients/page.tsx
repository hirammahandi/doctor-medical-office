import { Suspense } from "react";
import { PatientsContainer } from "./_components/patients-container";
import { PatientsHeader } from "./_components/patients-header";

export const dynamic = "force-dynamic";

const PatientsPage = () => {
  return (
    // TODO: Make a loader
    <>
      <PatientsHeader />
      <div className="mx-auto w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <PatientsContainer />
        </Suspense>
      </div>
    </>
  );
};

export default PatientsPage;
