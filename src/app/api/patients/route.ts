import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { validateRequestSession } from '@/auth';
import { findPaginatedPatients } from '@/features/patients';
import { ClientRoutes } from '@/utils/clients-routes';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const pageSearchParam = searchParams.get('page');
  const nameSearchParam = searchParams.get('name');
  const { session, user } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);
  const page = !isNaN(Number(pageSearchParam)) ? Number(pageSearchParam) : null;

  if (!page)
    return NextResponse.json({ error: 'Page is required' }, { status: 400 });

  if (page < 1) {
    return NextResponse.json(
      { error: 'Page must be greater than 0' },
      { status: 400 },
    );
  }

  const response = await findPaginatedPatients({
    currentPage: Number(pageSearchParam),
    userId: user.id,
    search: nameSearchParam ?? undefined,
  });

  return NextResponse.json(response);
};
