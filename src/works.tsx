import NavBar from "./navbar";
import SEO from "./seo";

export default function () {
  return (
    <>      
      <SEO 
        title="Some Stuff"
        description="These are my works and projects."
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Projects"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com/works"
      />
      <div className="mx-auto">
        <NavBar />
        <div className="mx-auto justify-center text-center">
          <h2 className="h-pad">Coming soon.</h2>
        </div>
      </div>
    </>
  );
}