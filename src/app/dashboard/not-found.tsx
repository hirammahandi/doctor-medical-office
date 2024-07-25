import { ContentLayout } from "@/components/content-layout";
import { NotFoundContent } from "@/components/not-found-content";

const NotFound = () => {
  return (
    <ContentLayout title="Dashboard">
      <NotFoundContent />
    </ContentLayout>
  );
};

export default NotFound;
