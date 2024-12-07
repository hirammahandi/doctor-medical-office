import { ClientRoutes } from '@/lib/clients-routes';
import { contentData } from '@/lib/content-data';
import { NotFoundContent } from '@components/not-found-content';

const NotFound = () => {
  return (
    <NotFoundContent
      linkHref={ClientRoutes.DASHBOARD}
      linkText={contentData.globalContentData.goToDashboard}
      message={contentData.globalContentData.notFound.description}
      title={contentData.globalContentData.notFound.pageNotFound}
    />
  );
};

export default NotFound;
