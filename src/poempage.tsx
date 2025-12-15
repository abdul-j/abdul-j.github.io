import { useParams, data } from 'react-router';
import { Poem } from './poems';
import NavBar from './navbar';

export default function PoemPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    throw data("Poem Not Found", { status: 404 });
  }
  return (
    <>
        <div className="mx-auto text-center">
            <NavBar />
        </div>
        <Poem slug={slug} />
    </>
  )
};