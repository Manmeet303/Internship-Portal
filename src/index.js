"use strict";
const fastify = require("fastify")({ logger: false });
const session = require("@fastify/session");
var MongoDBStore = require("connect-mongodb-session")(session);
// Configuring the app.
fastify.register(require("fastify-cors"), {
    origin: ["http://localhost:3000"],
    credentials: true,
    optionSuccessStatus: 200,
});
fastify.register(require("fastify-compress"));
fastify.register(require("fastify-formbody"));
fastify.register(require("fastify-cookie"));
fastify.register(session, {
    cookieName: "sessionId",
    secret: "qwertyuiopmnbvcxzasdfglkjh1029384756",
    cookie: {
        secure: false,
        maxAge: 0,
        expries: 60 * 60,
    },
    expires: 60 * 60,
    store: new MongoDBStore({
        uri: require("./config/db.config").url,
        collection: "sessions",
    }),
});
fastify.addHook("preHandler", (req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            email: undefined,
            type: undefined,
            userId: undefined,
            companyId: undefined,
            isAuthenticated: false,
            loginAttempt: 0,
        };
    }
    next();
});
// Registering the Routes
fastify.register(require("./Route/Auth"), { prefix: "Auth/" });
fastify.register(require("./Route/User"), { prefix: "User/" });
fastify.register(require("./Route/Company"), { prefix: "Company/" });
fastify.register(require("./Route/Admin"), { prefix: "Admin/" });
fastify.register(require("./Route/Internship"), { prefix: "Internship/" });
fastify.register(require("./Route/Job"), { prefix: "Job/" });
fastify.register(require("./Route/Placement"), { prefix: "Placement/" });
fastify.register(require("./Route/Event"), { prefix: "Event/" });

// Run the server
fastify.listen(process.env.PORT || 8501, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    } else console.log("LocalHost Port:", process.env.PORT || 8501);
});
