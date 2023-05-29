import ClientOnly from '../components/ClientOnly';
import Footer from '../components/Footer/Footer';
import SearchMini from '../components/Search/SearchMini';
import TreeNode from '../components/TreeNode/TreeNode';

const Page = () => {
    return (
        <ClientOnly>
            <SearchMini />
            <TreeNode />
            <Footer />
        </ClientOnly>
    );
};

export default Page;
