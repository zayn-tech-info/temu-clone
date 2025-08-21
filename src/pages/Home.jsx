import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Categories from '../components/Categories';
import Product from '../components/Product';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
        {/* <Features /> */}
        <Categories />
        <Product />
      </div>
    </div>
  );
}

export default Home