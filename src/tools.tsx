import SEO from "./seo";
import NavBar from "./navbar";
import { Link } from "react-router";

export default function () {
  return (
    <>
      <SEO 
        title="I have tools"
        description="tools tools tools"
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Tools"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com/works/tools"
      />
      <div className="mx-auto text-center">
        <NavBar />
        <div className="flex flex-col items-center justify-center space-y-6 my-12">
          <Link to="/works/tools/saw" className="text-7xl hover:underline" prefetch="viewport">S.A.W.</Link>
        </div>
      </div>
    </>
  );
}
