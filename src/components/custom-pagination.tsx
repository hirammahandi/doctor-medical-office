import { type FC } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type CustomPaginationProps = {
  actualPage: number;
  totalPages: number;
  hasNextPage: boolean;
  pathname: string;
};

export const CustomPagination: FC<CustomPaginationProps> = ({
  actualPage,
  hasNextPage,
  totalPages,
  pathname,
}) => {
  return (
    <Pagination className="justify-end items-center gap-2">
      <div className="page-info">
        <p className="text-muted-foreground text-sm">
          Page {actualPage} of {totalPages}
        </p>
      </div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={actualPage === 1}
            href={{
              query: {
                page: actualPage - 1,
              },
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={actualPage === 1} href={pathname}>
            1
          </PaginationLink>
        </PaginationItem>
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={actualPage === 2}
              href={{
                query: {
                  page: 2,
                },
              }}
            >
              2
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            disabled={!hasNextPage}
            href={{
              query: {
                page: actualPage + 1,
              },
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
