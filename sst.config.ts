import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";

const configStage = {
  dev: {
    domainName: "dev.jpacheco.dev",
    domainAlias: "www.dev.jpacheco.dev",
  },
  prod: {
    domainName: "jpacheco.dev",
    domainAlias: "www.jpacheco.dev",
  },
};

export default {
  config(_input) {
    return {
      name: "portfolio",
      region: "us-east-1",
      stage: process.env.STAGE || "dev",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      type ConfigStage = typeof configStage;
      const config = configStage[stack.stage as keyof ConfigStage];

      const site = new AstroSite(stack, "site", {
        customDomain: {
          domainName: config.domainName,
          domainAlias: config.domainAlias,
          hostedZone: "jpacheco.dev",
        },
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
