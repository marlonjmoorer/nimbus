module.exports = {
  npm: {
   /*  globals: {
      '$': 'jquery'
    }, */
    styles: {

      'materialize-css': ['dist/css/materialize.css']
    }
  },
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^node_modules/,
        'app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: "app.css"
    },
    templates: {
      joinTo: 'app.js'
    }
  },
  plugins: {
    babel: {
      presets: ['es2015']
    },
    copycat:{
      "fonts" : ["node_modules/materialize-css/dist/fonts"],

      verbose : true, //shows each file that is copied to the destination directory 
      onlyChanged: true //only copy a file if it's modified time has changed (only effective when using brunch watch) 
    }
  },
  
}
