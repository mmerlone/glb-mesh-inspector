import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

// DSU (Disjoint Set Union) data structure for finding connected components
class DSU {
  parent: number[];
  
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  
  find(i: number): number {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }
  
  union(i: number, j: number) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
    }
  }
}

// STAGE 1: Split a mesh into its disconnected geometric components (islands)
export const splitMesh = (mesh: THREE.Mesh): THREE.Mesh[] => {
  const geometry = mesh.geometry;
  if (!geometry.index) {
    return [mesh];
  }

  const positionAttribute = geometry.getAttribute('position');
  const vertexCount = positionAttribute.count;
  const dsu = new DSU(vertexCount);
  const index = geometry.index.array;

  for (let i = 0; i < index.length; i += 3) {
    dsu.union(index[i], index[i + 1]);
    dsu.union(index[i + 1], index[i + 2]);
  }

  const components = new Map<number, number[]>();
  for (let i = 0; i < vertexCount; i++) {
    const root = dsu.find(i);
    if (!components.has(root)) {
      components.set(root, []);
    }
    components.get(root)!.push(i);
  }

  if (components.size <= 1) {
    return [mesh];
  }
  
  const newMeshes: THREE.Mesh[] = [];
  components.forEach((vertexIndices, root) => {
    const newGeometry = new THREE.BufferGeometry();
    const oldIndexToNewIndex = new Map<number, number>();
    vertexIndices.forEach((oldIndex, newIndex) => {
      oldIndexToNewIndex.set(oldIndex, newIndex);
    });

    for (const attrName in geometry.attributes) {
      const oldAttribute = geometry.getAttribute(attrName) as THREE.BufferAttribute;
      const newArray = new (oldAttribute.array.constructor as any)(vertexIndices.length * oldAttribute.itemSize);
      vertexIndices.forEach((oldIndex, newIndex) => {
        const srcOffset = oldIndex * oldAttribute.itemSize;
        const dstOffset = newIndex * oldAttribute.itemSize;
        for (let i = 0; i < oldAttribute.itemSize; i++) {
          newArray[dstOffset + i] = oldAttribute.array[srcOffset + i];
        }
      });
      newGeometry.setAttribute(attrName, new THREE.BufferAttribute(newArray, oldAttribute.itemSize));
    }

    const newIndices: number[] = [];
    for (let i = 0; i < index.length; i += 3) {
      const a = index[i];
      const b = index[i + 1];
      const c = index[i + 2];
      if (dsu.find(a) === root) {
        newIndices.push(oldIndexToNewIndex.get(a)!);
        newIndices.push(oldIndexToNewIndex.get(b)!);
        newIndices.push(oldIndexToNewIndex.get(c)!);
      }
    }
    newGeometry.setIndex(newIndices);
    
    const newMesh = new THREE.Mesh(newGeometry, mesh.material);
    newMesh.name = `${mesh.name}_island`;
    newMeshes.push(newMesh);
  });

  return newMeshes;
};

// STAGE 2: Group and merge meshes based on proximity
export const groupAndMergeMeshes = (meshes: THREE.Mesh[], baseName: string = 'Piece'): THREE.Mesh[] => {
  if (meshes.length <= 1) {
    return meshes;
  }

  const dsu = new DSU(meshes.length);
  const boundingBoxes: THREE.Box3[] = meshes.map(mesh => {
    if (!mesh.geometry.boundingBox) {
      mesh.geometry.computeBoundingBox();
    }
    return mesh.geometry.boundingBox!;
  });

  // Heuristic: two sub-meshes are part of the same piece if their
  // bounding boxes are very close or intersecting. We expand one
  // box by a tiny amount to catch surfaces that are perfectly touching.
  const proximityThreshold = 1e-4;

  for (let i = 0; i < meshes.length; i++) {
    for (let j = i + 1; j < meshes.length; j++) {
      const boxA = boundingBoxes[i].clone();
      const boxB = boundingBoxes[j];
      
      if (boxA.expandByScalar(proximityThreshold).intersectsBox(boxB)) {
        dsu.union(i, j);
      }
    }
  }
  
  const groups = new Map<number, number[]>();
  for (let i = 0; i < meshes.length; i++) {
    const root = dsu.find(i);
    if (!groups.has(root)) {
      groups.set(root, []);
    }
    groups.get(root)!.push(i);
  }

  const finalMeshes: THREE.Mesh[] = [];
  let pieceIndex = 0;
  groups.forEach((meshIndices) => {
    const representativeMesh = meshes[meshIndices[0]];

    if (meshIndices.length === 1) {
      // If a group has only one mesh, just use it as is but rename it.
      representativeMesh.name = `${baseName}_${pieceIndex++}`;
      finalMeshes.push(representativeMesh);
      return;
    }

    const geometriesToMerge = meshIndices.map(index => meshes[index].geometry);
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometriesToMerge, false);
    
    if (mergedGeometry) {
      const newMesh = new THREE.Mesh(mergedGeometry, representativeMesh.material);
      newMesh.name = `${baseName}_${pieceIndex++}`;
      finalMeshes.push(newMesh);
    }
  });

  return finalMeshes;
}; 