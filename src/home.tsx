import NavBar from "./navbar";
import GlobeComponent from "./globe";
import SEO from "./seo";

function Home() {
  return (
    <>
      <SEO 
        title="Abdul's Site"
        description="Welcome to my personal website."
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Personal Site"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com"
      />
      <div className="mx-auto">
        <NavBar />
        <div className="mx-auto justify-center text-center">
          <h2 className="h-pad">Welcome.</h2>
          <GlobeComponent />
          <p className="h-pad">I am working on adding some new features at the moment.</p>
          <p className="h-pad">Please make yourself at home.</p>
        </div>
      </div>
    </>
  );
}

export default Home