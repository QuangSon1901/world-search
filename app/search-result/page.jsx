import ClientOnly from '../components/ClientOnly';
import Footer from '../components/Footer/Footer';
import SearchResult from '../components/SearchResult/SearchResult';
import SearchMini from '../components/Search/SearchMini';

const Page = () => {
    return (
        <ClientOnly>
            <SearchMini />
            <SearchResult />
            <Footer />
        </ClientOnly>
    );
};

export default Page;
