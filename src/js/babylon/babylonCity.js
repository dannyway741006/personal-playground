import { Engine, Scene, Vector3, Color4, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, PointerEventTypes, KhronosTextureContainer2, Color3, } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
const ktxConfig = {
    jsDecoderModule: "/js/babylon.ktx2Decoder.js",
    jsMSCTranscoder: "/js/msc_basis_transcoder.js",
    wasmMSCTranscoder: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToASTC: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToBC7: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToRGBA_UNORM: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToRGBA_SRGB: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToRGB_A_UNORM: "/js/msc_basis_transcoder.wasm",
};
KhronosTextureContainer2.URLConfig = ktxConfig;
const myScene = {
    engine: null,
    scene: null,
    camera: null,
    canvas: null,
    model: null,
    createScene: async (canvas, store) => {
        myScene.engine = new Engine(canvas, true, {}, true);
        myScene.scene = new Scene(myScene.engine);
        myScene.scene.clearColor = new Color4(0, 0, 0, 0);
        myScene.camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 4, new Vector3(0, 0, 0), myScene.scene);
        myScene.camera.attachControl(canvas, true);
        myScene.camera.setTarget(new Vector3(0, 0, 0));
        myScene.camera.minZ = 0.1;
        myScene.camera.lowerRadiusLimit = 0;
        myScene.camera.upperRadiusLimit = 10;
        myScene.camera.wheelDeltaPercentage = 0.1;
        myScene.camera.fov = 0.95;
        myScene.camera.wheelPrecision = 100;
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), myScene.scene);
        const gridSize = 10;
        const cellSize = 1;
        const grid = [];
        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                const cell = MeshBuilder.CreatePlane(`cell_${i}_${j}`, { size: cellSize }, myScene.scene);
                cell.rotation.x = Math.PI / 2;
                cell.position.x = (i - gridSize / 2) * cellSize + cellSize / 2;
                cell.position.z = (j - gridSize / 2) * cellSize + cellSize / 2;
                const material = new StandardMaterial(`mat_${i}_${j}`, myScene.scene);
                material.diffuseColor = new Color3(0.7, 0.7, 0.7);
                cell.material = material;
                cell.metadata = { occupied: false, defaultMaterial: material };
                grid[i][j] = cell;
            }
        }
        console.log("grid::", grid);
        const building = MeshBuilder.CreateBox("building", { width: 1, height: 1, depth: 1 }, myScene.scene);
        building.position.y = 1;
        // building.scaling.set(2, 2, 2)
        building.metadata = { width: 1, depth: 1 };
        building.showBoundingBox = true;
        let dragging = false;
        // building.actionManager = new ActionManager(myScene.scene)
        // building.actionManager.registerAction(
        //   new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
        //     dragging = true
        //   })
        // )
        // function confirmPlacement() {
        //   const actualWidth = building.metadata.width
        //   const actualDepth = building.metadata.depth
        //   const startX = Math.floor(
        //     (building.position.x + gridSize / 2) / cellSize - actualWidth / 2
        //   )
        //   const startZ = Math.floor(
        //     (building.position.z + gridSize / 2) / cellSize - actualDepth / 2
        //   )
        //   for (let i = 0; i < actualWidth; i++) {
        //     for (let j = 0; j < actualDepth; j++) {
        //       const gx = startX + i
        //       const gz = startZ + j
        //       if (grid[gx] && grid[gx][gz]) {
        //         grid[gx][gz].metadata.occupied = true
        //         grid[gx][gz].material.diffuseColor = new Color3(0, 1, 0)
        //       }
        //     }
        //   }
        // }
        function highlightGrid(x, z) {
            // 重置所有未占用的格子顏色
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const cell = grid[i][j];
                    if (!cell.metadata.occupied) {
                        cell.material.diffuseColor = new Color3(0.7, 0.7, 0.7);
                    }
                }
            }
            const actualWidth = building.metadata.width;
            const actualDepth = building.metadata.depth;
            // 計算 building 的左下角在網格中的索引
            const startX = Math.floor((x + (gridSize / 2) * cellSize) / cellSize - actualWidth / 2);
            const startZ = Math.floor((z + (gridSize / 2) * cellSize) / cellSize - actualDepth / 2);
            // 高亮建築物佔據的格子
            for (let i = 0; i < actualWidth; i++) {
                for (let j = 0; j < actualDepth; j++) {
                    const gx = startX + i;
                    const gz = startZ + j;
                    if (grid[gx] && grid[gx][gz] && !grid[gx][gz].metadata.occupied) {
                        grid[gx][gz].material.diffuseColor = new Color3(1, 0, 0); // 高亮為紅色
                    }
                }
            }
        }
        myScene.scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    if (pointerInfo.pickInfo?.hit &&
                        pointerInfo.pickInfo.pickedMesh === building) {
                        dragging = true;
                        myScene.camera?.detachControl();
                    }
                    break;
                case PointerEventTypes.POINTERMOVE:
                    if (dragging) {
                        const pickResult = myScene.scene?.pick(myScene.scene.pointerX, myScene.scene.pointerY);
                        if (pickResult?.pickedMesh) {
                            console.log("Picked Mesh:", pickResult.pickedMesh.name);
                            console.log("Picked Point:", pickResult.pickedPoint);
                            console.log("Picked Normal:", pickResult.getNormal(true));
                        }
                        if (pickResult?.pickedMesh && pickResult.pickedMesh.metadata) {
                            const target = pickResult.pickedMesh;
                            // 計算 building 的位置，確保其中心對齊網格
                            const actualWidth = building.metadata.width;
                            const actualDepth = building.metadata.depth;
                            // 將 target 的位置轉換為網格索引
                            const gridX = Math.floor((target.position.x + (gridSize / 2) * cellSize) / cellSize);
                            const gridZ = Math.floor((target.position.z + (gridSize / 2) * cellSize) / cellSize);
                            // 將網格索引轉換回世界座標，確保 building 的中心對齊網格中心
                            building.position.x =
                                (gridX - gridSize / 2) * cellSize +
                                    (actualWidth % 2 === 0 ? 0 : cellSize / 2);
                            building.position.z =
                                (gridZ - gridSize / 2) * cellSize +
                                    (actualDepth % 2 === 0 ? 0 : cellSize / 2);
                            // 更新高亮區域
                            highlightGrid(building.position.x, building.position.z);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERUP:
                    if (dragging) {
                        dragging = false;
                        myScene.camera?.attachControl(canvas, true);
                        // confirmPlacement()
                    }
                    break;
            }
        });
        if (canvas) {
            canvas.addEventListener("wheel", (evt) => evt.preventDefault());
            myScene.engine.runRenderLoop(() => {
                if (myScene.scene)
                    myScene.scene.render();
            });
            window.addEventListener("resize", () => {
                myScene.engine?.resize();
            });
        }
    },
    disposeModel: () => {
        window.removeEventListener("resize", () => myScene.engine?.resize());
        myScene.model?.dispose(true, true);
        myScene.camera?.dispose();
        myScene.scene?.dispose();
        myScene.engine?.dispose();
        myScene.model = null;
        myScene.camera = null;
        myScene.scene = null;
        myScene.engine = null;
        myScene.canvas = null;
    },
};
export { myScene };
//# sourceMappingURL=babylonCity.js.map