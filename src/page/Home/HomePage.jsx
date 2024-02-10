import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Statistic } from "../../components/statistic";

function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <Navbar selected_Item={0}/>
      <Statistic />
    </div>
  );
}

export default HomePage;
