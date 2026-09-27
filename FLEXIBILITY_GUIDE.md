# Flexibility Guide: Making GLB Mesh Inspector Work for Any Use Case

The GLB Mesh Inspector has been redesigned to be highly flexible and adaptable to various 3D model inspection and component extraction needs. This guide explains how to use the tool for different scenarios beyond chess pieces.

## 🎯 Overview of Flexibility Features

### 1. **Preset-Based Designation System**
- **Pre-built presets** for common use cases
- **Custom designation creation** for unique requirements
- **Category organization** for easy discovery

### 2. **Configurable Behavior**
- **Auto-completion** can be enabled/disabled per preset
- **Duplicate allowances** for scenarios with multiple similar components
- **Custom export naming** for different workflows

### 3. **Extensible Architecture**
- **Easy preset addition** through configuration files
- **Custom designation editor** for on-the-fly creation
- **Modular component system** for easy customization

## 🏗️ Built-in Presets

### Games & Entertainment
- **Chess Pieces**: King, Queen, Rook, Bishop, Knight, Pawn
- **Board Game Components**: Board, Tokens, Cards, Dice, Timer, Scoreboard, Instructions, Box, Accessories

### Vehicles & Transportation
- **Vehicle Parts**: Body, Wheels, Engine, Interior, Lights, Mirrors, Bumpers, Doors, Windows, Exhaust, Suspension

### Architecture & Construction
- **Building Components**: Foundation, Walls, Roof, Windows, Doors, Stairs, Floors, Ceiling, Columns, Beams, Furniture

### Characters & Animation
- **Character Parts**: Head, Torso, Arms, Legs, Hands, Feet, Hair, Clothing, Accessories, Weapons, Props

### Furniture & Interior Design
- **Furniture Items**: Chair, Table, Bed, Sofa, Cabinet, Shelf, Lamp, Mirror, Rug, Curtains, Decorations
- **Kitchen Items**: Stove, Refrigerator, Sink, Counter, Cabinets, Utensils, Appliances, Dishes, Storage

### Electronics & Technology
- **Electronic Components**: Screen, Battery, Circuit, Buttons, Speaker, Camera, Antenna, Ports, Casing, Display

### Landscaping & Environment
- **Garden Elements**: Plants, Trees, Flowers, Path, Fence, Fountain, Bench, Lighting, Soil, Pots

## 🛠️ How to Use for Different Scenarios

### Scenario 1: Vehicle Model Inspection

**Use Case**: Inspecting a car model to extract individual components

1. **Select Vehicle Preset**:
   - Click the settings icon (⚙️) in the header
   - Choose "Vehicle Parts" from the preset selector
   - The tool will show designations like Body, Wheels, Engine, etc.

2. **Upload Your Model**:
   - Upload a GLB file containing a vehicle model
   - The mesh processor will automatically split disconnected components

3. **Designate Components**:
   - Use the dropdown menus to assign appropriate designations
   - Since vehicles can have multiple similar parts (e.g., 4 wheels), duplicates are allowed

4. **Export Components**:
   - Select the components you want to export
   - Download as separate GLB files with proper naming

### Scenario 2: Character Model Rigging Preparation

**Use Case**: Preparing a character model for animation rigging

1. **Select Character Preset**:
   - Choose "Character Parts" preset
   - Designations include Head, Torso, Arms, Legs, etc.

2. **Upload Character Model**:
   - Upload your character GLB file
   - The tool will identify separate mesh components

3. **Designate Body Parts**:
   - Assign each mesh to appropriate body part designations
   - Auto-completion will help ensure all parts are designated

4. **Export for Rigging**:
   - Export individual body parts for use in animation software

### Scenario 3: Building Architecture Analysis

**Use Case**: Analyzing architectural models for construction planning

1. **Select Building Preset**:
   - Choose "Building Components" preset
   - Designations include Foundation, Walls, Roof, etc.

2. **Upload Building Model**:
   - Upload your architectural GLB file
   - The tool will separate different building elements

3. **Designate Structural Elements**:
   - Assign designations to walls, floors, structural elements
   - Use custom designations for specific architectural features

4. **Export for Analysis**:
   - Export components for structural analysis or documentation

### Scenario 4: Custom Use Case

**Use Case**: Working with a unique model that doesn't fit existing presets

1. **Create Custom Designations**:
   - Click "Show Custom Designations" in the preset selector
   - Add your own designation names
   - Use quick templates or add them manually

2. **Use Quick Templates**:
   - **Directional**: Front, Back, Left, Right
   - **Positional**: Top, Bottom, Inside, Outside
   - **Hierarchical**: Main, Secondary, Detail, Base

3. **Build Your Workflow**:
   - Combine preset designations with custom ones
   - Create a workflow that fits your specific needs

## 🔧 Advanced Configuration

### Creating Custom Presets

To add new presets, edit `constants/presets.ts`:

```typescript
{
  id: 'your-custom-preset',
  name: 'Your Custom Preset',
  description: 'Description of your use case',
  category: 'custom',
  icon: '🎯',
  designations: ['', 'Component1', 'Component2', 'Component3']
}
```

### Configuring Preset Behavior

Edit `config/appConfig.ts` to customize preset behavior:

```typescript
presets: {
  'your-custom-preset': {
    autoComplete: true,        // Enable auto-completion
    allowDuplicates: false,    // Prevent duplicate designations
    defaultExportName: 'your_components'
  }
}
```

### Customizing UI Themes

Modify the theme configuration in `config/appConfig.ts`:

```typescript
themes: {
  dark: {
    background: 'bg-gray-800',
    sidebar: 'bg-gray-900/70',
    text: 'text-gray-200',
    accent: 'text-cyan-400',
    border: 'border-gray-700'
  },
  light: {
    background: 'bg-gray-100',
    sidebar: 'bg-white/90',
    text: 'text-gray-800',
    accent: 'text-blue-600',
    border: 'border-gray-300'
  }
}
```

## 🎨 Best Practices

### 1. **Choose the Right Preset**
- Start with the closest matching preset
- Use custom designations to fill gaps
- Consider the nature of your components (unique vs. duplicate)

### 2. **Optimize for Your Workflow**
- Enable auto-completion for sequential workflows
- Allow duplicates for models with repeated components
- Use descriptive custom designations

### 3. **Export Strategy**
- Export related components together
- Use meaningful file names
- Consider the target application's requirements

### 4. **Model Preparation**
- Ensure your GLB file has properly separated meshes
- Use consistent naming conventions in your 3D software
- Consider the level of detail needed for your use case

## 🔄 Workflow Examples

### Game Asset Pipeline
1. **Import**: Upload character model GLB
2. **Preset**: Select "Character Parts"
3. **Designate**: Assign body part designations
4. **Export**: Download individual body parts
5. **Use**: Import into game engine for rigging

### Product Visualization
1. **Import**: Upload product assembly GLB
2. **Preset**: Select "Vehicle Parts" or create custom
3. **Designate**: Assign component names
4. **Export**: Download individual parts
5. **Use**: Create exploded view animations

### Architectural Documentation
1. **Import**: Upload building model GLB
2. **Preset**: Select "Building Components"
3. **Designate**: Assign structural element names
4. **Export**: Download components
5. **Use**: Create construction documentation

## 🚀 Extending the Tool

### Adding New Categories
1. Add category to the `category` type in `types.ts`
2. Update the categories array in `PresetSelector.tsx`
3. Add new presets to the `DESIGNATION_PRESETS` array

### Creating Plugin System
The modular architecture allows for easy extension:
- Add new mesh processing algorithms
- Create custom export formats
- Implement specialized designation logic

### Integration with External Tools
The tool can be integrated with:
- **3D Modeling Software**: Export components for specific applications
- **Game Engines**: Prepare assets for Unity, Unreal Engine
- **CAD Software**: Export for engineering analysis
- **Animation Software**: Prepare models for rigging

## 📚 Conclusion

The GLB Mesh Inspector is now a versatile tool that can adapt to virtually any 3D model inspection and component extraction need. By leveraging the preset system, custom designations, and configurable behavior, users can create workflows that perfectly match their specific requirements.

The key to success is understanding your use case and choosing the appropriate combination of presets, custom designations, and configuration options. With practice, you'll be able to quickly set up efficient workflows for any type of 3D model analysis. 