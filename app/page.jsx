import ClientOnly from './components/ClientOnly';
import Footer from './components/Footer/Footer';
import HotSearch from './components/HotSearch/HotSearch';
import Search from './components/Search/Search';

export default function Home() {
    return (
        <ClientOnly>
            <Search />
            <HotSearch />
            <Footer />
        </ClientOnly>
    );
}
