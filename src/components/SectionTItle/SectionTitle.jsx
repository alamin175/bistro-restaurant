const SectionTitle = ({ title, subTitle }) => {
  return (
    <div className="md:w-3/12 mx-auto text-center mt-20 mb-10">
      <p className="text-yellow-600 mb-3">--- {subTitle} ---</p>
      <h3 className="text-3xl border-y-4 py-3 uppercase">{title} </h3>
    </div>
  );
};

export default SectionTitle;
