const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-4/12 mx-auto text-center my-10">
      <p className="text-yellow-600 mb-3">--- {subHeading} ---</p>
      <h3 className="text-3xl border-y-4 py-3 uppercase">{heading} </h3>
    </div>
  );
};

export default SectionTitle;
