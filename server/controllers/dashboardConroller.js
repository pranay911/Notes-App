/*
Get Dashboard Page

*/
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Notes taking app in Node js",
  };
  res.render("dashboard/index", {
    locals,
    layout: "../views/layouts/dashboard",
  });
};
