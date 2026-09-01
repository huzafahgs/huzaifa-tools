const toolRegistry = {};

export const registerTool = (slug, component) => {
  toolRegistry[slug] = component;
};

export const getToolComponent = (slug) => {
  return toolRegistry[slug];
};

export default toolRegistry;