import SEO from "./seo";
import NavBar from "./navbar";
import { ASCIIArt } from "./ascii";

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
        
        <div
          className="
            bg-red-100   
            text-black
            opacity-50
            z-0
            fixed
            inset-0
            w-screen
            h-screen
            flex
            items-center
            justify-center
            select-none
            pointer-events-none
            overflow-hidden
          "
        >
            <ASCIIArt slug="aj.png" />
        </div>
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
            <NavBar />
        </div>
        <div className="flex flex-col items-center w-screen h-screen justify-center z-10">
          <h1 className="text-5xl text-my-blue text-center p-5">Work In Progress...</h1>
        </div>
      </div>
    </>
  );
}
