import Navbar from '../components/Navbar'
import Categories from '../components/Categories';
import Product from '../components/Product';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
        <Categories />
        <Product />
      </div>
      <Footer />
    </div>
  );
}

export default Home