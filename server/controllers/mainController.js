/*
Get Homepage

*/

exports.homepage = async (req, res) => {
  const locals = {
    title: "Notes",
    description: "Notes taking app in Node js",
  };
  res.render("index", locals);
};
