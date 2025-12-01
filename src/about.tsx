import NavBar from "./navbar";
import aj from "/assets/aj.jpeg";
import Paper from "./paper";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex md:flex-row items-center justify-center">

        {/* LEFT: Image */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
          About Me
          </h1>
          <img
            className="w-1/3 overflow-hidden"
            src={aj}
            alt="abdul"
          />
          <p className="mt-6 mb-6 text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">
            Yeah.
          </p>
        </div>
        <div className="w-1/2">
          <Paper />
        </div>
      </div>
    </div>
  );
}
