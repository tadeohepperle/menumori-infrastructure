module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        srv: env.bool("DATABASE_SRV", false),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "2020-10-02-menumori-strapi"),
        username: env("DATABASE_USERNAME", "tadeo"),
        password: env("DATABASE_PASSWORD", "sajjsdcn8192uzsag"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", "admin"),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});

/*

//
// Before 2020-10-14 we used remote atlas cluster at mongodb+srv://admin:VtBVkxIvs3J0zske@prangerle-solutions-dat.84pzl.mongodb.net/2020-10-02-menumori-strapi?retryWrites=true&w=majority
//

before:

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env(
          "DATABASE_HOST",
          "prangerle-solutions-data-84pzl.mongodb.net"
        ),
        srv: env.bool("DATABASE_SRV", true),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "2020-10-02-menumori-strapi"),
        username: env("DATABASE_USERNAME", "admin"),
        password: env("DATABASE_PASSWORD", "VtBVkxIvs3J0zske"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", true),
      },
    },
  },
});


after:


module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        srv: env.bool("DATABASE_SRV", false),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "2020-10-02-menumori-strapi"),
        username: env("DATABASE_USERNAME", "tadeo"),
        password: env("DATABASE_PASSWORD", "sajjsdcn8192uzsag"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", "admin"),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});




*/
