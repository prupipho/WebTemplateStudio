import { platform, projectType } from "../../AppContext";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants/commands";

import * as mockData from "./mockData/mockWebPlatformData";

const getProjectTypes = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PROJECT_TYPES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        projectTypes: mockData.projectTypes(platform),
      },
    },
    "*"
  );
};

const getFrameworks = (platform: string, message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        frameworks: mockData.frameworks(platform),
        isPreview: true,
        projectType: projectType,
      },
    },
    "*"
  );
};

const getAllLicenses = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_ALL_LICENSES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        licenses: mockData.licenses,
      },
    },
    "*"
  );
};

const getTemplateConfig = (platform: string, message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_TEMPLATE_INFO,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        ...mockData.templatesInfo(platform),
      },
    },
    "*"
  );
};

const getPages = (platform: string, message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PAGES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        pages: mockData.pages(platform, message.payload.frontendFramework),
      },
    },
    "*"
  );
};

const getFeatures = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FEATURES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        features: mockData.features,
      },
    },
    "*"
  );
};

export { getProjectTypes, getFrameworks, getAllLicenses, getTemplateConfig, getPages, getFeatures };
