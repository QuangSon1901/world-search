import ComponentContent from '@/app/components/Content/ComponentContent';

const Page = () => {
    return (
        <section className="px-10 mt-4">
            <header>
                <div className="flex space-x-4 items-center">
                    <h1 className="text-2xl font-bold">Quản lý nội dung</h1>
                </div>
                <span></span>
            </header>
            <ComponentContent />
        </section>
    );
};

export default Page;
