const env = {};

let environment = "dev"; // can be dev, test or prod.

env.name = environment;
// environment specific constants
if (environment === "prod") {
    env.dataApi = "";
    env.profileUploadFolder = "prescription";
} else if (environment === "test") {
    env.dataApi = "";
    env.profileUploadFolder = "prescription";
} else {
    env.dataApi =
        "https://4d94-2401-4900-1f33-ff25-81c8-cb95-a18d-d383.in.ngrok.io";
    env.profileUploadFolder = "prescription";
}
export default env;
