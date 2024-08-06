import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Carousel from '../components/Carousel';

function Home() {
    return (
        <>
            <Navbar />
<div> <Carousel/> </div>

            <div className='m-3'>
                <Cards/>
            </div>
            <Footer />
        </>
    );
}

export default Home;
