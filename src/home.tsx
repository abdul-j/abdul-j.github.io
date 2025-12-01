import NavBar from "./navbar";
import GlobeComponent from "./globe";

function Home() {
  return (
      <div className="mx-auto">
        <NavBar />
        <div className="mx-auto justify-center text-center">
          <h2 className="h-pad">Welcome.</h2>
          <GlobeComponent />
          <p className="h-pad">I am working on adding someat the moment.</p>
          <p className="h-pad">Please make yourself at home.</p>
        </div>
      </div>
  );
}

export default Home