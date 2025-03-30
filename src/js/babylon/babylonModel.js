import { Engine, Scene, Vector3, Color4, CubeTexture, ArcRotateCamera, MeshBuilder, PointerEventTypes, KhronosTextureContainer2, PBRMaterial, Color3, Animation, TransformNode, BezierCurveEase, } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
// import { SocketPlugin, socketLink, sendMessage } from "../../js/socket/socket"
// import { setContent } from "../../js/socket/socketClient"
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import useVertexShader from "../../js/shaders/vertex.glsl?raw";
// 然後設置配置
const ktxConfig = {
    // 指向本地的 JS 解碼器文件
    jsDecoderModule: "/js/babylon.ktx2Decoder.js",
    jsMSCTranscoder: "/js/msc_basis_transcoder.js",
    wasmMSCTranscoder: "/js/msc_basis_transcoder.wasm",
    // 指向本地的 WASM 解碼器文件
    wasmUASTCToASTC: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToBC7: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToRGBA_UNORM: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToRGBA_SRGB: "/js/msc_basis_transcoder.wasm",
    wasmUASTCToRGB_A_UNORM: "/js/msc_basis_transcoder.wasm",
};
// 應用配置
KhronosTextureContainer2.URLConfig = ktxConfig;
// const useSocketPlugin = new SocketPlugin()
// useSocketPlugin.use(socketLink)
// useSocketPlugin.use(sendMessage)
const animatePyramid = (scene, target, property, from, to, duration) => {
    const animation = new Animation(`animate-${property}`, property, 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keys = [
        { frame: 0, value: from },
        { frame: duration, value: to },
    ];
    animation.setKeys(keys);
    target.animations = [animation];
    scene.beginAnimation(target, 0, duration, false);
};
const togglePyramids = (isSeparated, coneTop, coneBottom, height, scene) => {
    const targetOffset = isSeparated ? height / 2 : height * 0.65;
    const animate = (pyramid, targetY) => {
        animatePyramid(scene, pyramid, "position", pyramid.position, new Vector3(0, targetY, 0), 30);
    };
    animate(coneTop, targetOffset);
    animate(coneBottom, -targetOffset);
};
const myScene = {
    engine: null,
    scene: null,
    camera: null,
    canvas: null,
    model: null,
    vuePbrMaterial: null,
    vueConeTop: null,
    vueConeBottom: null,
    vueHeight: 1,
    vueSize: 1,
    createScene: async (canvas, store) => {
        console.log("useVertexShader::", useVertexShader);
        myScene.engine = new Engine(canvas, true, {}, true);
        myScene.scene = new Scene(myScene.engine);
        myScene.scene.clearColor = new Color4(0, 0, 0, 0);
        myScene.camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 4, new Vector3(0, 0, 0), myScene.scene);
        myScene.engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
        myScene.camera.attachControl(canvas, true);
        myScene.camera.setTarget(new Vector3(0, 0, 0));
        myScene.camera.minZ = 0.1;
        myScene.camera.lowerRadiusLimit = 1.15;
        myScene.camera.upperRadiusLimit = 4;
        myScene.camera.wheelDeltaPercentage = 0.1;
        myScene.camera.fov = 0.95;
        // myScene.camera.upperBetaLimit = Math.PI / 2
        myScene.camera.wheelPrecision = 100;
        // 创建一个 PBR 材质
        const pbrMaterial = new PBRMaterial("pbrMaterial", myScene.scene);
        const reflectionTexture = CubeTexture.CreateFromPrefilteredData("/images/env/hdr.env", myScene.scene);
        pbrMaterial.reflectionTexture = reflectionTexture; // 设置反射贴图
        // 设置 PBR 材质的其他属性
        pbrMaterial.metallic = 0.4; // 设置金属感
        pbrMaterial.roughness = 0.2; // 设置粗糙度
        pbrMaterial.albedoColor = new Color3(205 / 255, 0, 0); // 设置基础颜色
        myScene.vuePbrMaterial = pbrMaterial;
        // Create a parent node
        const parent = new TransformNode("parent", myScene.scene);
        parent.setPivotPoint(new Vector3(0, 0, 0));
        // Create the top cone
        const coneTop = MeshBuilder.CreateCylinder("coneTop", {
            diameterTop: 0,
            diameterBottom: myScene.vueSize,
            height: myScene.vueHeight,
            tessellation: 4,
        }, myScene.scene);
        coneTop.material = pbrMaterial; // 应用材质
        coneTop.position = new Vector3(0, myScene.vueHeight / 2, 0); // Move up by half height
        coneTop.parent = parent;
        myScene.vueConeTop = coneTop;
        // Create the bottom cone
        const coneBottom = MeshBuilder.CreateCylinder("coneBottom", {
            diameterTop: 0,
            diameterBottom: myScene.vueSize,
            height: myScene.vueHeight,
            tessellation: 4,
        }, myScene.scene);
        coneBottom.material = pbrMaterial; // 应用材质
        coneBottom.position = new Vector3(0, -myScene.vueHeight / 2, 0); // Move down by half height
        coneBottom.rotation.x = Math.PI; // Flip the cone
        coneBottom.parent = parent;
        myScene.vueConeBottom = coneBottom;
        // 变量用于存储最后的摄像机参数
        let lastCameraParams = {
            target: myScene.camera.getTarget(),
            alpha: myScene.camera.alpha,
            beta: myScene.camera.beta,
            radius: myScene.camera.radius,
        };
        // myScene.scene.debugLayer.show()
        myScene.scene.onPointerObservable.add((pointerInfo) => {
            const camera = myScene.camera;
            if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
                console.log("heart down~~~~~");
                if (myScene.camera) {
                    return (myScene.camera.inertia = 0.9);
                }
            }
            if (pointerInfo.type === PointerEventTypes.POINTERUP) {
                console.log("heart down~~~~~");
                if (myScene.camera) {
                    return (myScene.camera.inertia = 0.2);
                }
            }
            if (pointerInfo.type === PointerEventTypes.POINTERMOVE ||
                pointerInfo.type === PointerEventTypes.POINTERPICK) {
                // 更新摄像机的 target、alpha 和 beta
                if (camera) {
                    lastCameraParams.radius = camera.radius;
                    lastCameraParams.alpha = camera.alpha;
                    lastCameraParams.beta = camera.beta;
                    lastCameraParams.target = camera.target;
                }
                // const message = setContent(store.inRouterResData.socketKey, {
                //   mode: "rotate",
                //   alpha: lastCameraParams.alpha,
                //   beta: lastCameraParams.beta,
                //   radius: lastCameraParams.radius,
                //   model_reset: false,
                //   target: {
                //     x: lastCameraParams.target.x,
                //     y: lastCameraParams.target.y,
                //     z: lastCameraParams.target.z,
                //   },
                // })
                // useSocketPlugin.SendMessage(message)
            }
            // 监听鼠标滚动事件，更新并输出 radius
            if (pointerInfo.type === PointerEventTypes.POINTERWHEEL && camera) {
                lastCameraParams.radius = camera.radius;
                // const message = setContent(store.inRouterResData.socketKey, {
                //   mode: "rotate",
                //   alpha: lastCameraParams.alpha,
                //   beta: lastCameraParams.beta,
                //   radius: lastCameraParams.radius,
                //   model_reset: false,
                //   target: {
                //     x: lastCameraParams.target.x,
                //     y: lastCameraParams.target.y,
                //     z: lastCameraParams.target.z,
                //   },
                // })
                // useSocketPlugin.SendMessage(message)
            }
        });
        if (canvas) {
            canvas.addEventListener("wheel", (evt) => evt.preventDefault());
            myScene.engine.runRenderLoop(() => {
                if (myScene.scene)
                    myScene.scene.render();
            });
            window.addEventListener("orientationchange", () => {
                let sceneResize = setTimeout(() => {
                    myScene.engine?.resize();
                    clearTimeout(sceneResize);
                }, 500);
            });
            window.addEventListener("resize", () => {
                let sceneResize = setTimeout(() => {
                    myScene.engine?.resize();
                    clearTimeout(sceneResize);
                }, 500);
            });
        }
    },
    createAnimations: () => {
        console.log("animation::");
        const animations = [];
        // Camera Target Animation
        animations.push(myScene.createAnimation("targetAnim", "target", 80, Animation.ANIMATIONTYPE_VECTOR3, myScene.camera?.target, new Vector3(0, 0, 0)));
        // myScene. Camera Radius Animation
        animations.push(myScene.createAnimation("radiusAnim", "radius", 80, Animation.ANIMATIONTYPE_FLOAT, myScene.camera?.radius, 4));
        // myScene. Camera Alpha Animation
        animations.push(myScene.createAnimation("alphaAnim", "alpha", 80, Animation.ANIMATIONTYPE_FLOAT, myScene.camera?.alpha, Math.PI / 2));
        // myScene. Camera Beta Animation
        animations.push(myScene.createAnimation("betaAnim", "beta", 80, Animation.ANIMATIONTYPE_FLOAT, myScene.camera?.beta, Math.PI / 2));
        return animations;
    },
    createAnimation: (nameAnimation, propertyName, fps, animationType, from, to) => {
        const animation = new Animation(nameAnimation, propertyName, fps, animationType, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const keys = [
            {
                frame: 0,
                value: from,
            },
            {
                frame: 100,
                value: to,
            },
        ];
        animation.setKeys(keys);
        // Creating an easing function
        var easingFunction = new BezierCurveEase(0.5, 0, 0.5, 1);
        // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
        // easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        // Adding the easing function to the animation
        animation.setEasingFunction(easingFunction);
        return animation;
    },
    appModelReset: () => {
        myScene.scene?.beginDirectAnimation(myScene.camera, myScene.createAnimations(), 0, 100, false);
    },
    disposeModel: () => {
        console.log("dispose");
        window.removeEventListener("resize", () => myScene.engine?.resize());
        myScene.model?.dispose(true, true);
        myScene.camera?.dispose();
        myScene.scene?.dispose();
        myScene.engine?.dispose();
        myScene.vuePbrMaterial?.dispose(true, true);
        myScene.vueConeTop?.dispose(true, true);
        myScene.vueConeBottom?.dispose(true, true);
        myScene.model = null;
        myScene.camera = null;
        myScene.scene = null;
        myScene.engine = null;
        myScene.canvas = null;
        myScene.vuePbrMaterial = null;
        myScene.vueConeTop = null;
        myScene.vueConeBottom = null;
        myScene.vueHeight = 1;
        myScene.vueSize = 1;
    },
};
export { myScene, togglePyramids };
// const shaderMaterial = new ShaderMaterial(
//   "shader",
//   scene,
//   {
//     vertexSource: useVertexShader,
//     fragmentSource: useFragmentShader,
//   },
//   {
//     attributes: ["position", "uv"],
//     uniforms: ["worldViewProjection", "neonColor", "time", "intensity"],
//   }
// )
// // 设置初始颜色和强度
// shaderMaterial.setColor3("neonColor", new Color3(205 / 255, 0, 0))
// shaderMaterial.setFloat("intensity", 2) // 初始发光强度
//# sourceMappingURL=babylonModel.js.map