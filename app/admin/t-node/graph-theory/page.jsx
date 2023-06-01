import GraphTheory from '@/app/components/TreeNode/GraphTheory/GraphTheory';

const Page = () => {
    return (
        <section className="px-10 mt-4">
            <header>
                <div className="flex space-x-4 items-center">
                    <h1 className="text-2xl font-bold">Cây chương mục "Lý thuyết đồ thị"</h1>
                </div>
                <span></span>
            </header>
            <GraphTheory />
        </section>
    );
};

export default Page;
