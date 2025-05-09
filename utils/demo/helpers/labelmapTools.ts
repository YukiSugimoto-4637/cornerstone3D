import * as cornerstoneTools from '@cornerstonejs/tools';

const {
  RectangleScissorsTool,
  SphereScissorsTool,
  CircleScissorsTool,
  BrushTool,
  PaintFillTool,
} = cornerstoneTools;

const previewColors = {
  0: [255, 255, 255, 128],
  1: [0, 255, 255, 255],
};
const preview = {
  enabled: true,
  previewColors,
};

const configuration = {
  preview,
  useCenterSegmentIndex: false,
};

const configurationNoPreview = {
  preview: { enabled: false, previewColors },
  useCenterSegmentIndex: false,
};

const thresholdOptions = new Map();
thresholdOptions.set('Dynamic Radius 0', { isDynamic: true, dynamicRadius: 0 });
thresholdOptions.set('Dynamic Radius 1', { isDynamic: true, dynamicRadius: 1 });
thresholdOptions.set('Dynamic Radius 2', { isDynamic: true, dynamicRadius: 2 });
thresholdOptions.set('Dynamic Radius 3', { isDynamic: true, dynamicRadius: 3 });
thresholdOptions.set('Use Existing Threshold', {
  isDynamic: false,
  dynamicRadius: 5,
});
thresholdOptions.set('CT Fat: (-150, -70)', {
  range: [-150, -70],
  isDynamic: false,
});
thresholdOptions.set('CT Bone: (200, 1000)', {
  range: [200, 1000],
  isDynamic: false,
});

const defaultThresholdOption = [...thresholdOptions.keys()][2];
const thresholdArgs = thresholdOptions.get(defaultThresholdOption);
const toolMap = new Map();

toolMap.set('ThresholdCircle', {
  tool: BrushTool,
  baseTool: BrushTool.toolName,
  configuration: {
    ...configuration,
    activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
    threshold: thresholdArgs,
    useCenterSegmentIndex: true,
  },
});

toolMap.set('ThresholdSphere', {
  baseTool: BrushTool.toolName,
  configuration: {
    ...configuration,
    activeStrategy: 'THRESHOLD_INSIDE_SPHERE_WITH_ISLAND_REMOVAL',
    threshold: thresholdArgs,
    useCenterSegmentIndex: true,
  },
});

toolMap.set('CircularBrush', {
  baseTool: BrushTool.toolName,
  configuration: {
    ...configurationNoPreview,
    activeStrategy: 'FILL_INSIDE_CIRCLE',
    useCenterSegmentIndex: true,
  },
});

toolMap.set('CircularEraser', {
  baseTool: BrushTool.toolName,
  configuration: {
    ...configurationNoPreview,
    activeStrategy: 'ERASE_INSIDE_CIRCLE',
  },
});

toolMap.set('SphereBrush', {
  baseTool: BrushTool.toolName,
  configuration: {
    ...configurationNoPreview,
    activeStrategy: 'FILL_INSIDE_SPHERE',
  },
});
toolMap.set('SphereEraser', {
  baseTool: BrushTool.toolName,
  configuration: {
    ...configurationNoPreview,
    activeStrategy: 'ERASE_INSIDE_SPHERE',
  },
});
toolMap.set(RectangleScissorsTool.toolName, { tool: RectangleScissorsTool });
toolMap.set(CircleScissorsTool.toolName, { tool: CircleScissorsTool });
toolMap.set(SphereScissorsTool.toolName, { tool: SphereScissorsTool });
toolMap.set('SphereScissorsEraser', {
  baseTool: SphereScissorsTool.toolName,
  configuration: {
    ...configurationNoPreview,
    activeStrategy: 'ERASE_INSIDE',
  },
});
toolMap.set(PaintFillTool.toolName, { tool: PaintFillTool });

const labelmapTools = {
  toolMap,
  thresholdOptions,
  configuration,
  previewColors,
  preview,
};

export default labelmapTools;
