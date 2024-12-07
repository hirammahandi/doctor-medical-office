import { NotFoundContent } from '@/components/not-found-content';
import { ClientRoutes } from '@/lib/clients-routes';
import { contentData } from '@/lib/content-data';

const NotFound = () => {
  return (
    <NotFoundContent
      title={contentData.patientDetailsContentData.notFound.title}
      message={contentData.patientDetailsContentData.notFound.description}
      linkHref={ClientRoutes.PATIENTS}
      linkText={contentData.globalContentData.goToPatients}
    />
  );
};
export default NotFound;
