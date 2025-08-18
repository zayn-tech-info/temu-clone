import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Categories from '../components/Categories';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* <Features /> */}
        <Categories />
      </div>
    </div>
  );
}

export default Home