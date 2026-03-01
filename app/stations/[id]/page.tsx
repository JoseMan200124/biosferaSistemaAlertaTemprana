import { StationDetailPage } from '@/pages-ui/stations/StationDetailPage';

export function generateStaticParams() {
  return [{ id: 'station-1' }, { id: 'station-2' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <StationDetailPage id={params.id} />;
}
