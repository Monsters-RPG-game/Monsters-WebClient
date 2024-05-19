import Footer from '../components/Footer';
import ClassesList from '../constants/classesList';
import ClassCard from '../components/ClassCard';
import TopNavbar from '../components/TopNavbar';

const Classes: React.FC = () => {
  return (
    <section className="w-full ">
      <TopNavbar/>
      <div className="max-w-7xl mx-auto py-16">
        <h2 className="text-3xl font-extrabold font-navbarFont text-slate-700 border-b pb-2">Exploring Classes</h2>
        {ClassesList.map((characterClass, index) => {
          return <ClassCard key={index} characterClass={characterClass} index={index} />;
        })}
      </div>
      <Footer />
    </section>
  );
};

export default Classes;
