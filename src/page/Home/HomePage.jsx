import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Statistic } from "../../components/statistic";
import { Map } from "../../components/Map"

function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <Navbar selected_Item={0} />
      <Statistic />
      <Map whtl={["30vw", "40vh", "0", "10vw"]} />
    </div>
  );
}

export default HomePage;
