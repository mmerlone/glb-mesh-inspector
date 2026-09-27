# GLB Mesh Inspector

A powerful web-based 3D model inspector and component extractor built with React, Three.js, and TypeScript. This application allows you to upload GLB files, inspect individual mesh components, designate parts using flexible presets, and export selected components as separate GLB files.

## 🎯 Purpose

The GLB Mesh Inspector is designed for 3D modelers, game developers, architects, and anyone who needs to:

- **Inspect 3D models**: Upload GLB files and examine individual mesh components
- **Extract components**: Automatically split and group mesh components into logical parts
- **Designate parts**: Assign proper designations using built-in presets or custom labels
- **Export components**: Download selected parts as separate GLB files for use in other applications



## ✨ Features

### 🎮 Interactive 3D Viewer
- **Real-time 3D rendering** using Three.js and React Three Fiber
- **Orbit controls** for camera manipulation
- **Mesh highlighting** on hover and selection
- **Visibility toggles** for individual mesh components
- **Responsive design** with modern UI

### 🔍 Advanced Mesh Processing
- **Automatic mesh splitting** - Separates disconnected geometric components
- **Proximity-based grouping** - Intelligently groups nearby meshes into logical parts
- **Flexible designation system** - Built-in presets for common use cases (chess, vehicles, buildings, characters, etc.)
- **Custom designations** - Create your own designation sets for unique requirements
- **Smart auto-completion** - Automatically assigns remaining designations when enabled

### 📦 Export Capabilities
- **Selective export** - Choose which components to export
- **GLB format** - Industry-standard binary format
- **Proper naming** - Uses component designations as filenames
- **Batch processing** - Export multiple components at once
- **Configurable naming** - Custom export names per preset

### 🎨 Modern UI/UX
- **Dark theme** with cyan accents
- **Responsive sidebar** with mesh list and controls
- **Preset selector** with category organization
- **Custom designation editor** for creating unique workflows
- **Visual feedback** for selections and hover states
- **Error handling** with user-friendly messages
- **Loading states** and progress indicators

## 🛠️ Technologies

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### 3D Graphics
- **Three.js 0.178.0** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **GLTFExporter** - Export functionality for GLB files

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting (implied by TypeScript setup)

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd glb-mesh-inspector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create .env.local file
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```
   *Note: The Gemini API key is currently configured but not actively used in the application.*

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📖 Usage Guide

### 1. Choose a Preset (Optional)
- Click the settings icon (⚙️) in the header to open the preset selector
- Choose from built-in presets like Chess Pieces, Vehicle Parts, Building Components, etc.
- Or create custom designations for your specific use case

### 2. Upload a GLB File
- Click the file upload area in the left sidebar
- Select a `.glb` file containing your 3D model
- The model will automatically load and display in the 3D viewer

### 3. Inspect Mesh Components
- The left sidebar shows all detected mesh components
- Hover over items to highlight them in the 3D view
- Click items to select/deselect them
- Use the eye icon to toggle visibility of individual components

### 4. Designate Components
- Use the dropdown menu next to each mesh to assign designations
- Choose from preset designations or custom ones you've created
- The system can prevent duplicate designations or allow them based on preset settings
- Auto-completion can automatically assign remaining designations when enabled

### 5. Export Selected Components
- Select the components you want to export by clicking on them
- Click the "Export Selected" button
- The selected components will be downloaded as a single GLB file

## 🏗️ Project Structure

```
glb-mesh-inspector/
├── components/           # React components
│   ├── FileUpload.tsx   # File upload interface
│   ├── MeshList.tsx     # Mesh list and controls
│   ├── Viewer.tsx       # 3D viewer component
│   ├── PresetSelector.tsx # Preset selection interface
│   ├── CustomDesignationEditor.tsx # Custom designation editor
│   ├── MeshProcessor.ts # Mesh processing logic
│   ├── MaterialFactory.ts # Material management
│   └── icons.tsx        # SVG icons
├── config/              # Configuration files
│   ├── viewerConfig.ts  # Viewer and processing settings
│   └── appConfig.ts     # Application configuration and presets
├── constants/           # Application constants
│   └── presets.ts       # Designation presets and categories
├── utils/               # Utility functions
│   └── exportUtils.ts   # Export functionality
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## 🔧 Configuration

The application can be customized through several configuration files:

### Viewer Configuration (`config/viewerConfig.ts`)
- **Camera settings** - Position, field of view
- **Lighting** - Ambient and directional light intensities
- **Materials** - Colors for hover and selection states
- **Processing options** - Mesh splitting and merging thresholds
- **Performance settings** - Culling and LOD options

### Application Configuration (`config/appConfig.ts`)
- **Preset behavior** - Auto-completion, duplicate allowances per preset
- **Export settings** - Default file names and formats
- **UI themes** - Color schemes and styling options

### Custom Presets (`constants/presets.ts`)
- **Built-in presets** - Pre-configured designation sets for common use cases
- **Custom categories** - Organize presets by domain (games, vehicles, buildings, etc.)
- **Extensible system** - Easy addition of new presets and categories

## 🚀 Build and Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Three.js** community for the excellent 3D graphics library
- **React Three Fiber** team for the React integration
- **Chess community** for inspiration and use cases

## 🐛 Known Issues

- Large GLB files may take time to process
- Some complex mesh geometries might not split correctly
- Export functionality works best with properly structured models
- Custom designations are not persisted between sessions (planned feature)

## 🔮 Future Enhancements

- Support for additional 3D formats (GLTF, OBJ, FBX)
- Advanced mesh editing capabilities
- Texture and material editing
- Animation support
- Cloud storage integration
- Collaborative features
- **Preset persistence** - Save and load custom designation sets
- **Batch processing** - Process multiple files at once
- **Advanced filtering** - Filter meshes by properties and designations
- **Export templates** - Pre-configured export settings for different workflows

## 📚 Additional Resources

- **[Flexibility Guide](FLEXIBILITY_GUIDE.md)** - Comprehensive guide for using the tool with different types of 3D models
- **[Preset Examples](constants/presets.ts)** - View all available presets and their designations
- **[Configuration Guide](config/)** - Detailed configuration options and customization

---

**Built with ❤️ for the 3D modeling and game development communities**
