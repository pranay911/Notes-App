/*
Get Homepage

*/
// Home
exports.homepage = async (req, res) => {
  const locals = {
    title: "Notes",
    description: "Notes taking app in Node js",
  };
  res.render("index", { locals, layout: "../views/layouts/front-page" });
};

// About
exports.about = async (req, res) => {
  const locals = {
    title: "Notes",
    description: "Notes taking app in Node js",
  };
  res.render("about", locals);
};
