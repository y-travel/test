module.exports = {
  plugins: [
    require('postcss-rtlcss', {}), // <<<< in "plugins"
	require("tailwindcss"),
	require("autoprefixer"),
  ],
};
