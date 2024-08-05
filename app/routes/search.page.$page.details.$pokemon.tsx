import { useParams } from '@remix-run/react';

export default function Search() {
  const { page, pokemon } = useParams();
  return (
    <div>
      <h1>{pokemon}</h1>
    </div>
  );
}
