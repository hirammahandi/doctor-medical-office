import { usePathname } from 'next/navigation';
import { removeSearchParams } from '@/utils/tools';

export const useRemoveSearchParams = () => {
  const pathname = usePathname();

  const handleRemoveSearchParams = () => {
    removeSearchParams(pathname);
  };

  return { handleRemoveSearchParams };
};
