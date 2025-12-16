import { useParams, data } from 'react-router';
import { Link } from 'react-router';
import { Poem } from './poems';
import NavBar from './navbar';
import Handwrite from './handwrite';
import returnSvg from '/assets/return.svg';

export default function PoemPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    throw data("Poem Not Found", { status: 404 });
  }
  return (
    <>
        <div className="">
            <NavBar />
        </div>
        <Poem slug={slug} />
        <div className="fixed bottom-0 right-0 scale-50 lg:top-0 md:scale-75 sm:scale-50">
            <Link to="/works/poems/archive" 
                aria-label="Back to Poem Archive" 
                prefetch="intent"   
            >
                <Handwrite svgFile={returnSvg} animate={false} />
            </Link>
        </div>
    </>
  )
};