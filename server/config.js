/*
 * Create and export configurtion variables
 */

 // Container for all the environments
 let environments = {}

 // Staging (default) environment
 environments.staging = {
   httpPort:5000,
   httpsPort:5001,
   envName:'staging',
   mongo:{
    uri:"mongodb+srv://dev1:dev123456@todocluster.up4hg.mongodb.net/TODO?retryWrites=true&w=majority"
   }
 }

 //Production environment
 environments.production = {
   httpPort:3000,
   httpsPort:3001,
   envName:'production',
   mongo:{
    uri:"mongodb+srv://dev1:dev123456@todocluster.up4hg.mongodb.net/TODO?retryWrites=true&w=majority"
   }
 }

 // Determine which environment was passed as a command-line argument
 let currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase():''

// Check that the current environment is one of the environments above, if not default to staging
let environmentToExport = typeof environments[currentEnvironment] == 'object' ? environments[currentEnvironment] : environments.staging

//  Export the module
module.exports  = environmentToExport
